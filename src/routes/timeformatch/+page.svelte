<script lang="ts">
    import { P } from "flowbite-svelte";
    import { ScheduleYYYYMMArray, TeamnameArray, TeamObj } from "../data.js";

    let SelectedScheduleYYYYMM = "2016-10";

    let SelectedTeamname = "Atlanta Hawks";

    //  Schedule 컬럼
    //  game_date,game_id,home_teamid,home_teamabbreviation,home_teamcityname,home_teamname,home_gamescore,away_teamid,away_teamabbreviation,away_teamcityname,away_teamname,away_gamescore
    let ScheduleArray = [];
    let SelectedGame = {};

    let PlaybyPlayArray = [];
    let SelectedActionArray = [];
    let ImageBall;  //  img #Ball 태그

    let PlayerStatArray = [];

    let CurrentScore_Home = 0;
    let CurrentScore_Away = 0;

    //////////////////////////////////////////////////
    // canvas 에 농구공 그리기
    var canvas;
    var ctx;
    var x;
    var y;
    var dx;
    var dy;

    /*
    Q: What x/y vertices define action areas in the x/y coordinate graph?

    A: A list of areas is included below. Note that these vertices are for the left side of the court. For the right side, we use the following calculation, where length=1128 and width=600:

    right-court-point = (length - x, width - y)
    left_basket=[63, 300]
    right_basket=[1065, 300]
    */

    // 왼쪽 골대 위치 (홈팀이 넣어야 하는 골대)
    const pos_lefthoop = {x:39, y:186} //  x:63, y:300
    // 오른쪽 골대 위치 (어웨이팀이 넣어야 하는 골대)
    const pos_righthoop = {x:660, y:186} //  x:1065, y:300

    const size_court_x = 700;
    const size_court_y = 373;

    const size_ball = 8;

    const delay_draw = 20;  //  ms
    const time_ballmove = 1300;  //  ms

    let interval = null;
    let sumdelay = 0;

    function drawBall(sumdelay) {
        ctx.beginPath();
        const timehalf = time_ballmove / 2;
        const sizeup_ratio = (timehalf - Math.abs(timehalf - sumdelay))/timehalf;
        const sizeup = size_ball * 0.5 * sizeup_ratio;
        ctx.arc(x, y, size_ball+sizeup, 0, Math.PI*2);
        ctx.fillStyle = "#F58237";
        ctx.fill();

        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sumdelay += delay_draw;
        drawBall(sumdelay);

        // 그리기 시간이 초과됐거나, 코드를 벗어났으면 이동(interval) 종료.
        if(sumdelay > time_ballmove || x < 0 || y < 0 || x > size_court_x || y > size_court_y){
            clearInterval(interval);
        }

        x += dx;
        y += dy;

        const timehalf = time_ballmove / 2;
        const sizeup_ratio = (timehalf - Math.abs(timehalf - sumdelay))/timehalf;
        let BallScale = 1 + (0.5 * sizeup_ratio);

        ImageBall.style = `left: ${x-10}px; top: ${y-10}px; scale:${BallScale};`;
        console.log(ImageBall);
        console.log(BallScale, sizeup_ratio);
    }

    // API 에서 넘어온 좌표를 canvas에 맞는 좌표로 변환한다.
    function ConvertPos(IsHome, API_x, API_y) {
        //  API_x, API_y 는 골대 기준 상대 좌표이며, x 가 골대 좌우, y가 골대 앞뒤 이다.
        //  즉, 지금 코트 모양에서는 API_x 를 y(height)랑 계산하고, API_y 를 x(width)랑 계산해야한다. 
        
        const API_pos_hoop_home = {x:63, y:300};
        const API_pos_hoop_away = {x:1065, y:300};

        //  농구코트 이미지의 문제인지 정확하진 않지만 NBA 사이트의 슛 위치보다 짧게 계산된다
        //  그래서 거리가 길어지도록 보정값을 넣어본다.
        //  3점슛인데 라인보다 안쪽이면 보기 안좋다.
        const CorrectionValue = 1.2;
        API_x = API_x * CorrectionValue;
        API_y = API_y * CorrectionValue;

        let Relative_Pos = {};
        if(IsHome === true){
            // API 좌표는 width 1128, height 600 기준
            Relative_Pos["x"] = (API_pos_hoop_home.x + API_y) * (size_court_x / 1128);
            Relative_Pos["y"] = (API_pos_hoop_home.y - API_x) * (size_court_y / 600);
        } else {
            // API 좌표는 width 1128, height 600 기준
            Relative_Pos["x"] = (API_pos_hoop_away.x - API_y) * (size_court_x / 1128);
            Relative_Pos["y"] = (API_pos_hoop_away.y + API_x) * (size_court_y / 600);
        }

        return Relative_Pos;
    }
    //////////////////////////////////////////////////

    async function GetScheduleByTeam() {
        let TeamID = TeamObj[SelectedTeamname]["TeamID"];
        const response = await fetch(
            `timeformatch/db/GetScheduleByTeam?ScheduleYYYYMM=${SelectedScheduleYYYYMM}&TeamID=${TeamID}`
        );
        ScheduleArray = await response.json();
        //console.log(ScheduleArray);
    }

    async function GetPlaybyPlay(GameID) {
        //console.log(`SelectGame(${GameID})`);

        const response = await fetch(
            `timeformatch/api/playbyplay?GameID=${GameID}`
        );
        PlaybyPlayArray = await response.json();

        //console.log(PlaybyPlayArray);
    }

    async function GetBoxScoreTraditional(GameID) {
        const response = await fetch(
            `timeformatch/api/boxscoretraditional?GameID=${GameID}`
        );
        PlayerStatArray = await response.json();

        //console.log(PlayerStatArray);
    }

    function SelectGame(ArrayIndex) {
        //console.log(`SelectGame(${ArrayIndex})`);
        SelectedGame = ScheduleArray[ArrayIndex];

        CurrentScore_Home = 0;
        CurrentScore_Away = 0;

        PlaybyPlayArray = [];
        SelectedActionArray = [];

        PlayerStatArray = [];

        GetPlaybyPlay(SelectedGame["game_id"]);
        GetBoxScoreTraditional(SelectedGame["game_id"]);

        //////////////////////////////////////////////////
        // canvas 에 농구공 그리기
        canvas = document.getElementById("PbyP_Court");
        console.log("canvas : ", canvas);

        ctx = canvas.getContext("2d");
        console.log("ctx : ", ctx);
    }

    function SelectAction(ArrayIndex) {
        //console.log(`SelectAction(${ArrayIndex})`);

        let Action = PlaybyPlayArray[ArrayIndex];

        //////////////////////////////////////////////////
        // canvas 에 농구공 그리기
        if(interval !== null){
            clearInterval(interval);
        }

        sumdelay = 0;

        let IsHome = Action["location"] === "h" ? true : false;

        let Relative_Pos = ConvertPos(IsHome, Action["xLegacy"],Action["yLegacy"]);
        x = Relative_Pos.x;
        y = Relative_Pos.y;
        Action["PosX"] = Relative_Pos.x;
        Action["PosY"] = Relative_Pos.y;

        // x = Math.random() * size_court_x;
        // y = Math.random() * size_court_y;

        let pos_hoop;
        if(IsHome === true){
            pos_hoop = pos_lefthoop;
        } else{
            pos_hoop = pos_righthoop;
        }
        dx = (pos_hoop.x - x)/(time_ballmove/delay_draw);
        dy = (pos_hoop.y - y)/(time_ballmove/delay_draw);

        // 49, 181  왼쪽 골대
        // 136, 181 왼쪽 자유투
        // 564, 361 코드 이미지 크기

        console.log(x,y,dx,dy);

        interval = setInterval(draw, delay_draw);

        //  [순서 중요] 위에서 Action["PosX"], Action["PosY"]가 설정된 이후에 배열에 넣는다.
        SelectedActionArray = [Action];
    }
</script>

<body class="body">
    <div class="groupbox1">
        <div>
            <div class="selectinformation">경기 년월(YYYY-MM)</div>
            <select
                class="overflow selectbox"
                bind:value={SelectedScheduleYYYYMM}
            >
                {#each ScheduleYYYYMMArray as ScheduleYYYYMM}
                    <option class="option" value={ScheduleYYYYMM}>
                        {ScheduleYYYYMM}
                    </option>
                {/each}
            </select>
        </div>

        <div>
            <div class="selectinformation">팀이름</div>
            <select class="overflow selectbox" bind:value={SelectedTeamname}>
                {#each TeamnameArray as teamname}
                    <option class="option" value={teamname}>
                        {teamname}
                    </option>
                {/each}
            </select>
        </div>

        <button class="search" on:click={GetScheduleByTeam}> 조회하기 </button>
    </div>

    <div class="gameboardcontainer">
        {#if ScheduleArray.length === 0}
            <div class="nogame">해당 일자에 경기가 없습니다.</div>
        {/if}
        {#each ScheduleArray as schedule, ArrayIndex}
            <div
                class="gameboard"
                on:click={() => {
                    SelectGame(ArrayIndex);
                }}
            >
                <div class="gameteam">
                    <img
                        src="/TeamLogo/{schedule['home_teamid']}.svg"
                        alt="TeamLogo"
                        class="teamlogo"
                    />
                    <div class="teamname">
                        {schedule["home_teamabbreviation"]}
                    </div>
                </div>
                <div class="dateandscore">
                    <div class="gamedate">
                        {schedule["game_date"].slice(0, 10)}
                    </div>
                    <div class="scorevsscore">
                        <div class="score">{schedule["home_gamescore"]}</div>
                        <div class="vs">VS</div>
                        <div class="score">{schedule["away_gamescore"]}</div>
                    </div>
                </div>
                <div class="gameteam">
                    <img
                        src="/TeamLogo/{schedule['away_teamid']}.svg"
                        alt="TeamLogo"
                        class="teamlogo"
                    />
                    <div class="teamname">
                        {schedule["away_teamabbreviation"]}
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <div class="selectedgame_title">
        {#if SelectedGame["game_date"] === undefined}
            <div class="title">경기를 선택해 주세요.</div>
        {:else}
            <div class="title">{SelectedGame["game_date"].slice(0, 10)}</div>
            <div>
                <img
                    src="/TeamLogo/{SelectedGame['home_teamid']}.svg"
                    alt="HomeTeamLogo"
                    class="TeamLogoImage"
                />
                <div class="selectedgame_score">
                    {SelectedGame["home_gamescore"]}
                </div>
                <div class="selectedgame_vs">VS</div>
                <div class="selectedgame_score">
                    {SelectedGame["away_gamescore"]}
                </div>
                <img
                    src="/TeamLogo/{SelectedGame['away_teamid']}.svg"
                    alt="AwayTeamLogo"
                    class="TeamLogoImage"
                />
            </div>
        {/if}
    </div>

    <div class="PbyPContainer">
        <div class="PbyP_ActionContainer">
            {#each PlaybyPlayArray as PbyPAction, ArrayIndex}
                {#if ArrayIndex === 0}
                <div class="PbyP_Action_Common PbyP_Action_Home">
                    <div class="PbyP_Action_JumpBall">
                        <div class="PbyP_Action_Time">
                            <span class="PbyP_Text_Big">Q{PbyPAction['period']}</span><br>
                            <!-- PT01M17.00S -> 01:17 -->
                            <span class="PbyP_Text_Small">{PbyPAction['clock'].replace('PT','').replace('M',':').slice(0,5)}</span>
                        </div>
                        <img
                            src="/TeamLogo/{SelectedGame['home_teamid']}.svg"
                            alt="TeamLogo"
                            class="PbyP_Action_Image"
                        />
                        <div class="PbyP_Action_Desc_JumpBall">
                            <span class="PbyP_Text_JumpBall">Game Start - Jump Ball</span><br>
                            <span class="PbyP_Text_Small">{PbyPAction['description']}</span>
                        </div>
                        <img
                            src="/TeamLogo/{SelectedGame['away_teamid']}.svg"
                            alt="TeamLogo"
                            class="PbyP_Action_Image"
                        />
                    </div>
                </div>
                {:else}
                <div
                    class={PbyPAction["location"] === "h"
                        ? "PbyP_Action_Common PbyP_Action_Home"
                        : "PbyP_Action_Common PbyP_Action_Away"}
                    on:click={() => {
                        SelectAction(ArrayIndex);
                    }}
                >
                    <div class="PbyP_Action">
                        <div class="PbyP_Action_Time">
                            <span class="PbyP_Text_Big">Q{PbyPAction['period']}</span><br>
                            <!-- PT01M17.00S -> 01:17 -->
                            <span class="PbyP_Text_Small">{PbyPAction['clock'].replace('PT','').replace('M',':').slice(0,5)}</span>
                        </div>
                        <img
                            src="/TeamLogo/{PbyPAction['teamId']}.svg"
                            alt="TeamLogo"
                            class="PbyP_Action_Image"
                        />
                        <img
                            src="https://cdn.nba.com/headshots/nba/latest/1040x760/{PbyPAction[
                                'personId'
                            ]}.png"
                            onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'"
                            alt="PlayerHeadShot"
                            class="PbyP_Action_Image"
                        />
                        <div class="PbyP_Action_Desc">
                            {#if PbyPAction['pointsTotal'] === 0}
                                <span class="PbyP_Text_Miss">Missed</span><span class="PbyP_Text_Big">&nbsp;&nbsp;&nbsp;[{PbyPAction['scoreHome']} vs {PbyPAction['scoreAway']}]</span><br>
                                <span class="PbyP_Text_Small">{PbyPAction['subType']}({PbyPAction['xLegacy']},{PbyPAction['yLegacy']})</span>
                            {:else}
                                <span class="PbyP_Text_Made">{PbyPAction['pointsTotal']} Points</span><span class="PbyP_Text_Big">&nbsp;&nbsp;&nbsp;[{PbyPAction['scoreHome']} vs {PbyPAction['scoreAway']}]</span><br>
                                <span class="PbyP_Text_Small">{PbyPAction['subType']}({PbyPAction['xLegacy']},{PbyPAction['yLegacy']})</span>
                            {/if}
                        </div>
                    </div>
                </div>
                {/if}
            {/each}
        </div>

        <div class="PbyP_Court_Container">
            <canvas id="PbyP_Court" width="{size_court_x}" height="{size_court_y}"></canvas>
            {#each SelectedActionArray as Action}
                <img
                src="https://cdn.nba.com/headshots/nba/latest/1040x760/{Action['personId']}.png"
                onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'"
                alt="PlayerHeadShot"
                class="Shooter"
                style="left: {Action["PosX"]-20}px; top: {Action["PosY"]-20}px;"
                />
                <img
                bind:this={ImageBall}
                src="Ball.jpg"
                alt="Ball"
                id="Ball"
                style="left: {Action["PosX"]-10}px; top: {Action["PosY"]-10}px;"
                />
                
            {/each}
        </div>
    </div>

    <!-- <input class="center" type="range" min="0" max="48" list="tickmarks" />
    <datalist id="tickmarks">
        <option value="0">시작</option>
        <option value="12">1Q 끝</option>
        <option value="24">2Q 끝</option>
        <option value="36">3Q 끝</option>
        <option value="48">4Q 끝</option>
    </datalist> -->

    <div class="tposition">
        {#if SelectedGame["game_id"] !== undefined && PlayerStatArray.length > 0}
            <div class="title">
                홈팀 : <img
                    src="/TeamLogo/{SelectedGame['home_teamid']}.svg"
                    alt="AwayTeamLogo"
                    class="TeamLogoImage"
                />
                {SelectedGame["home_teamcityname"]}
                {SelectedGame["home_teamname"]}
            </div>
            <table>
                <tr>
                    <th>선수 이름</th>
                    <th>출전시간</th>
                    <th>득점</th>
                    <th>리바운드</th>
                    <th>어시스트</th>
                    <th>스틸</th>
                    <th>블록</th>
                    <th>야투율(%)</th>
                    <th>3점 성공률(%)</th>
                </tr>
                {#each PlayerStatArray as PlayerStat}
                    {#if SelectedGame["home_teamid"] === PlayerStat[0]}
                        <tr>
                            <td class="playername">
                                <img
                                    src="https://cdn.nba.com/headshots/nba/latest/1040x760/{PlayerStat[1]}.png"
                                    onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'"
                                    alt="PlayerHeadShot"
                                    class="playerimage"
                                />
                                {PlayerStat[2]}
                            </td>
                            {#if PlayerStat[4] === null}
                                <td colspan="8">{PlayerStat[3]}</td>
                            {:else}
                                <td
                                    >{parseInt(
                                        PlayerStat[4]
                                    )}{PlayerStat[4].slice(-3)}</td
                                >
                                <td>{PlayerStat[5]}</td>
                                <td>{PlayerStat[6]}</td>
                                <td>{PlayerStat[7]}</td>
                                <td>{PlayerStat[8]}</td>
                                <td>{PlayerStat[9]}</td>
                                <td
                                    >{(Number(PlayerStat[10]) * 100).toFixed(
                                        1
                                    )}</td
                                >
                                <td
                                    >{(Number(PlayerStat[11]) * 100).toFixed(
                                        1
                                    )}</td
                                >
                            {/if}
                        </tr>
                    {/if}
                {/each}
            </table>
        {/if}
    </div>
    <div class="tposition">
        {#if SelectedGame["game_id"] !== undefined && PlayerStatArray.length > 0}
            <div class="title">
                어웨이팀 : <img
                    src="/TeamLogo/{SelectedGame['away_teamid']}.svg"
                    alt="AwayTeamLogo"
                    class="TeamLogoImage"
                />
                {SelectedGame["away_teamcityname"]}
                {SelectedGame["away_teamname"]}
            </div>
            <table>
                <tr>
                    <th>선수 이름</th>
                    <th>출전시간</th>
                    <th>득점</th>
                    <th>리바운드</th>
                    <th>어시스트</th>
                    <th>스틸</th>
                    <th>블록</th>
                    <th>야투율(%)</th>
                    <th>3점 성공률(%)</th>
                </tr>
                {#each PlayerStatArray as PlayerStat}
                    {#if SelectedGame["away_teamid"] === PlayerStat[0]}
                        <tr>
                            <td class="playername">
                                <img
                                    src="https://cdn.nba.com/headshots/nba/latest/1040x760/{PlayerStat[1]}.png"
                                    onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'"
                                    alt="PlayerHeadShot"
                                    class="playerimage"
                                />
                                {PlayerStat[2]}
                            </td>
                            {#if PlayerStat[4] === null}
                                <td colspan="8">{PlayerStat[3]}</td>
                            {:else}
                                <td
                                    >{parseInt(
                                        PlayerStat[4]
                                    )}{PlayerStat[4].slice(-3)}</td
                                >
                                <td>{PlayerStat[5]}</td>
                                <td>{PlayerStat[6]}</td>
                                <td>{PlayerStat[7]}</td>
                                <td>{PlayerStat[8]}</td>
                                <td>{PlayerStat[9]}</td>
                                <td
                                    >{(Number(PlayerStat[10]) * 100).toFixed(
                                        1
                                    )}</td
                                >
                                <td
                                    >{(Number(PlayerStat[11]) * 100).toFixed(
                                        1
                                    )}</td
                                >
                            {/if}
                        </tr>
                    {/if}
                {/each}
            </table>
        {/if}
    </div>
</body>

<style>
    .groupbox1 {
        margin: 0px auto;
        margin-top: 30px;
        padding: 20px 20px;
        width: 90%;
        display: flex;
        justify-content: center;
        background-color: white;
        border-radius: 20px;
        margin-bottom: 50px;
    }

    .selectinformation {
        margin-left: 10px;
        margin-bottom: 5px;
        margin-left: 20px;
        font-weight: bold;
    }

    .overflow {
        height: 200px;
        width: 200px;
        overflow: auto;
    }

    .option {
        border: 1px solid black;
        cursor: pointer;
        background-color: rgb(229, 231, 235);
    }

    .selectbox {
        min-width: 220px;
        background-color: rgb(229, 231, 235);
        border: 1px solid black;
        margin-left: 20px;
        text-align: center;
        height: 45px;
        cursor: pointer;
        border-radius: 20px;
    }

    .search {
        font-size: 15px;
        background-color: rgb(121 207 159);
        min-width: 90px;
        height: 60px;
        padding: 10px;
        border-radius: 15px;
        border: 1px solid black;
        margin-top: 21px;
        margin-left: 30px;
    }

    .gameboardcontainer {
        display: flex;
        border: 1px solid black;
        border-radius: 5px;
        flex-wrap: wrap;
        justify-content: left;
        margin: 0px 100px;
        background-color: white;
    }

    .nogame {
        width: 100%;
        text-align: center;
        font-size: 30px;
        font-weight: bolder;
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .gameboard {
        width: 23%;
        height: 80px;
        border: 1px solid black;
        border-radius: 10px;
        margin: 1%;

        display: flex;
        justify-content: space-around;
    }

    .gameteam {
        width: 25%;
        height: 90%;
        /* border: 1px solid blue; */
        margin: auto 0px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .teamlogo {
        width: 100%;
    }
    .teamname {
        font-size: 15px;
        font-weight: bolder;
        text-align: center;
        width: 100%;
    }

    .dateandscore {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: 10px 0px;
    }

    .gamedate {
        width: 90%;
        font-size: 12px;
        text-align: center;
        /* margin: auto 0px; */
    }

    .scorevsscore {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .score {
        width: 40%;
        font-size: 25px;
        text-align: center;
        margin: auto 0px;
    }

    .vs {
        width: 20%;
        font-size: 12px;
        text-align: center;
        margin: auto 3px;
    }

    .playername {
        width: 250px;
        text-align: left;
    }

    .playerimage {
        display: inline;
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }

    datalist {
        display: grid;
        grid-auto-flow: column;
        width: 100%;
        text-align: center;
    }

    .selectedgame_title {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
    }

    .title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }

    .selectedgame_score {
        display: inline-block;
        width: 100px;
        text-align: center;
        font-size: 50px;
        font-weight: bold;
        line-height: 100px;
    }

    .selectedgame_vs {
        display: inline-block;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        padding-left: 10px;
        padding-right: 10px;
    }

    .center {
        margin: 0 auto;
        width: 100%;
    }

    .PbyPContainer {
        display: flex;
        width: 100%;
        margin: 50px auto;
    }

    .PbyP_ActionContainer {
        width: 500px;
        height: 500px;
        margin-left: 30px;
        margin-right: 30px;
        overflow-y: scroll;
        border: 1px solid black;
        border-radius: 5px;
        /* background-color: burlywood; */
    }

    .PbyP_Action_Common {
        width: 468px;
        height: 54px;
        display: flex;
        flex-direction: column;
        align-items: start;
        margin: 2px;
    }

    .PbyP_Action_Home {
        align-items: start;
        /* background-color: blue; */
    }

    .PbyP_Action_Away {
        align-items: end;
        /* background-color: red; */
    }

    .PbyP_Action {
        width: 360px;
        height: 100%;
        display: flex;
        border: 1px solid black;
        /* background-color: cornflowerblue; */
    }

    .PbyP_Action_JumpBall {
        width: 100%;
        height: 100%;
        display: flex;
        border: 1px solid black;
        /* background-color: cornflowerblue; */
    }

    .PbyP_Action_Image {
        display: inline-block;
        width: 50px;
        height: 50px;
    }

    .PbyP_Action_Time {
        width: 60px;
        height: 50px;
        text-align: center;
    }

    .PbyP_Action_Desc {
        width: 200px;
        height: 50px;
        text-align: center;
    }

    .PbyP_Action_Desc_JumpBall {
        width: 300px;
        height: 50px;
        text-align: center;
    }

    .PbyP_Text_JumpBall {
        width: 80px;
        text-align: center;
        font-size: 18px;
        font-weight: bolder;
    }

    .PbyP_Text_Made {
        width: 80px;
        color: green;
        text-align: center;
        font-size: 18px;
        font-weight: bolder;
    }

    .PbyP_Text_Miss {
        width: 80px;
        color: red;
        text-align: center;
        font-size: 18px;
        font-weight: bolder;
    }

    .PbyP_Text_Big {
        width: 80px;
        color: black;
        text-align: center;
        font-size: 18px;
    }

    .PbyP_Text_Small {
        width: 80px;
        color: black;
        text-align: center;
        font-size: 13px;
    }

    .PbyP_Court_Container{
        position: relative;
    }

    #PbyP_Court {
        width: 700px;
        height: 373px;
        background-image: url("/NBACourt03.jpg");
        display: inline-block;
        border: 1px solid black;
        background-repeat: no-repeat;
        background-size : contain;        
    }

    .Shooter {
        position: absolute;
        width: 40px;
        height: 40px;
        left: -100px;
        top: 0px;
        border-radius: 100%;
        border: 1px solid black;
        background-color: green;

        z-index: 1;
    }

    #Ball {
        position: absolute;
        background-image: url("/ball.jpg");
        width: 20px;
        height: 20px;
        left: -100px;
        top: 0px;
        border-radius: 100%;

        z-index: 2;
    }

    .center {
        display: flex;
        left: 50%;
        width: 90%;
    }

    table {
        min-width: 70%;
        padding-left: 5px;
        padding-right: 5px;
        border: 1px solid black;
        border-collapse: collapse;
        margin: 20px auto;
    }
    .tposition {
        margin: 50px auto;
    }

    .TeamLogoImage {
        display: inline-block;
        width: 100px;
        height: 100px;
    }

    .body {
        overflow: auto;
        height: calc(100vh - 50px);
    }

    tr {
        transition: 0.3s;
    }

    tr:hover {
        background-color: #d0e3ed;
        cursor: pointer;
    }

    th {
        background-color: rgb(229, 231, 235);
    }

    td {
        text-align: center;
    }

    td,
    th {
        border: 1px solid black;
        min-width: 100px;
    }

    th:hover {
        background-color: #d0e3ed;
    }
</style>
