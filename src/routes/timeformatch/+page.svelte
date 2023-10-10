<script lang="ts">
    import { ScheduleYYYYMMArray, TeamnameArray, TeamObj } from "../data.js";

    let SelectedScheduleYYYYMM = "2023-01";

    let SelectedTeamname = "Atlanta Hawks";

    //  Schedule 컬럼
    //  game_date,game_id,home_teamid,home_teamabbreviation,home_teamcityname,home_teamname,home_gamescore,away_teamid,away_teamabbreviation,away_teamcityname,away_teamname,away_gamescore
    let ScheduleArray = [];
    let SelectedGame = {};

    let PlaybyPlayArray = [];
    let ActionDivs = [];
    let ActionContainerDiv = null;
    let LastestActionIndex = null;
    let SelectedAction = null;

    let AutoProgress = true;    //  PlayByPlay 자동 진행

    let PlayerStatArray = [];

    let CurrentScore_Home = 0;
    let CurrentScore_Away = 0;

    /*
    Q: What x/y vertices define action areas in the x/y coordinate graph?

    A: A list of areas is included below. Note that these vertices are for the left side of the court. For the right side, we use the following calculation, where length=1128 and width=600:

    right-court-point = (length - x, width - y)
    left_basket=[63, 300]
    right_basket=[1065, 300]
    */
    //////////////////////////////////////////////////
    // 농구공 그리기
    let ImageBall; //  img #Ball 태그
    let ImageShooter; //  img .Shooter 태그
    let Ball_x; //  Ball 위치 x (left)
    let Ball_y; //  Ball 위치 y (top)
    let Ball_dx; //  그리기 Delay 당 Ball 이동거리 x
    let Ball_dy; //  그리기 Delay 당 Ball 이동거리 y
    let IsShootSuccess = false;

    // 왼쪽 골대 위치 (홈팀이 넣어야 하는 골대)
    const pos_lefthoop = { x: 39, y: 186 }; //  이미지 위치 기준 / API 위치 기준 x:63, y:300
    // 오른쪽 골대 위치 (어웨이팀이 넣어야 하는 골대)
    const pos_righthoop = { x: 660, y: 186 }; //  이미지 위치 기준 / API 위치 기준 x:1065, y:300

    const size_court_x = 700; //  코트 이미지 크기
    const size_court_y = 373; //  코트 이미지 크기

    const draw_time_delay = 20; //  ms
    const draw_time_shooting = 1300; //  ms
    const draw_time_result = 500; //  ms
    const draw_time_total = draw_time_shooting + draw_time_result; //  ms

    let interval_ball = null;
    let delay_sum = 0;

    function draw() {
        delay_sum += draw_time_delay;

        Ball_x += Ball_dx;
        Ball_y += Ball_dy;

        const timehalf = draw_time_shooting / 2;
        const sizeup_ratio =
            (timehalf - Math.abs(timehalf - delay_sum)) / timehalf;
        let BallScale = 1;

        if (delay_sum <= draw_time_shooting) {
            BallScale = 1 + 0.5 * sizeup_ratio;
        }
        // 슛 성공여부에 대한 처리
        else if (delay_sum <= draw_time_total) {
            if (IsShootSuccess === true) {
                BallScale = 1;
                Ball_dx = 0;
                Ball_dy = 0;
            } else {
                BallScale = 1 + ((delay_sum - draw_time_shooting) / draw_time_delay) * 0.08;
            }
        }
        // 그리기 시간이 초과됐으면 이동(Interval) 종료.
        else {
            clearInterval(interval_ball);

            if(LastestActionIndex !== null){
                ActionDivs[LastestActionIndex].style = "border: 1px solid black;";

                if(AutoProgress === true && LastestActionIndex < (PlaybyPlayArray.length - 1)){
                    SelectAction(LastestActionIndex + 1);
                } else {
                    LastestActionIndex = null;
                }
            }

            ImageBall.style = "scale:0;";
            ImageShooter.style = "scale:0;";

            return;
        }

        //  볼 이미지 크기가 20px, 20px 이어서 가운데 위치시키기 위해 -10 을 해준다.
        ImageBall.style = `left: ${Ball_x - 10}px; top: ${Ball_y - 10}px; scale:${BallScale};`;
        ImageShooter.style = `left: ${SelectedAction['PosX'] - 20}px; top: ${SelectedAction['PosY'] - 20}px; scale:1; background-color: ${SelectedAction['pointsTotal'] === 0 ? 'red' : 'green'}`;

        // console.log(ImageBall);
        // console.log(BallScale, sizeup_ratio);
    }

    // API 에서 넘어온 좌표를 코트 이미지에 맞는 좌표로 변환한다.
    function ConvertPos(IsHome, API_x, API_y) {
        //  API_x, API_y 는 골대 기준 상대 좌표이며, x 가 골대 좌우, y가 골대 앞뒤 이다.
        //  즉, 지금 코트 모양에서는 API_x 를 y(height)랑 계산하고, API_y 를 x(width)랑 계산해야한다.

        const API_pos_hoop_home = { x: 63, y: 300 };
        const API_pos_hoop_away = { x: 1065, y: 300 };

        //  농구코트 이미지의 문제인지 정확하진 않지만 NBA 사이트의 슛 위치보다 짧게 계산된다
        //  그래서 거리가 길어지도록 보정값을 넣어본다.
        //  3점슛인데 라인보다 안쪽이면 보기 안좋다.
        const CorrectionValue = 1.2;
        API_x = API_x * CorrectionValue;
        API_y = API_y * CorrectionValue;

        let Relative_Pos = {};
        if (IsHome === true) {
            // API 좌표는 width 1128, height 600 기준
            Relative_Pos["x"] =
                (API_pos_hoop_home.x + API_y) * (size_court_x / 1128);
            Relative_Pos["y"] =
                (API_pos_hoop_home.y - API_x) * (size_court_y / 600);
        } else {
            // API 좌표는 width 1128, height 600 기준
            Relative_Pos["x"] =
                (API_pos_hoop_away.x - API_y) * (size_court_x / 1128);
            Relative_Pos["y"] =
                (API_pos_hoop_away.y + API_x) * (size_court_y / 600);
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
        SelectedAction = null;

        PlayerStatArray = [];

        GetPlaybyPlay(SelectedGame["game_id"]);
        GetBoxScoreTraditional(SelectedGame["game_id"]);
    }

    function SelectAction(ArrayIndex) {
        //console.log(`SelectAction(${ArrayIndex})`);
        if(LastestActionIndex !== null){
            ActionDivs[LastestActionIndex].style = "border: 1px solid black;";
        }
        LastestActionIndex = ArrayIndex;
        ActionDivs[ArrayIndex].style = "border: 2px solid blue;";
        ActionContainerDiv.scrollTop = (ActionDivs[ArrayIndex].clientHeight + (2+4)) * ArrayIndex;
        
        console.log(ActionDivs[ArrayIndex].clientHeight);
        console.log(ActionContainerDiv.scrollTop);
        // ActionDivs[ArrayIndex].scrollIntoView(true, {behavior: "smooth",block: "nearest", inline: "nearest"});

        let Action = PlaybyPlayArray[ArrayIndex];

        CurrentScore_Home = Action["scoreHome"];
        CurrentScore_Away = Action["scoreAway"];


        //////////////////////////////////////////////////
        //  농구공 그리기
        if (interval_ball !== null) {
            clearInterval(interval_ball);
            interval_ball = null;
            delay_sum = 0;
        }

        let IsHome = Action["location"] === "h" ? true : false;

        let Relative_Pos = ConvertPos(
            IsHome,
            Action["xLegacy"],
            Action["yLegacy"]
        );
        Ball_x = Relative_Pos.x;
        Ball_y = Relative_Pos.y;
        Action["PosX"] = Relative_Pos.x;
        Action["PosY"] = Relative_Pos.y;

        let pos_hoop;
        if (IsHome === true) {
            pos_hoop = pos_lefthoop;
        } else {
            pos_hoop = pos_righthoop;
        }
        Ball_dx =
            (pos_hoop.x - Ball_x) / (draw_time_shooting / draw_time_delay);
        Ball_dy =
            (pos_hoop.y - Ball_y) / (draw_time_shooting / draw_time_delay);
        IsShootSuccess = Action["pointsTotal"] === 0 ? false : true;

        //console.log(Ball_x,Ball_y,Ball_dx,Ball_dy);

        interval_ball = setInterval(draw, draw_time_delay);

        //  [순서 중요] 위에서 Action["PosX"], Action["PosY"]가 설정된 이후에 배열에 넣는다.
        SelectedAction = Action;
    }
</script>

<body>
    <div class="pagenamecontainer">
        <div class="pagename">경기 기록보기</div>
        <div class="BMW_container">
            <img class="BMWimg" src="/Site_Logo.png" alt="BMWimg" />
    
            <div>
                <span class="BMW_BMW">B</span>
                <span class="BMW_normal">asketball</span>
                <span class="BMW_BMW">M</span>
                <span class="BMW_normal">ania</span>
                <span class="BMW_BMW">W</span>
                <span class="BMW_normal">ebsite</span>
            </div>
            <!-- <img class="ballimg" src="/ball_monster.png" alt="BMW ball" /> -->
            <!-- <img class="BMWimg" src="/Site_Logo.png" alt="BMWimg" /> -->
            <!-- <img class="ballimg" src="/fireball.jpg" alt="BMW ball" /> -->
            
        </div>
    </div>

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
            <div class="selectinformation">팀 이름</div>
            <select class="overflow selectbox" bind:value={SelectedTeamname}>
                {#each TeamnameArray as teamname}
                    <option class="option" value={teamname}>
                        {teamname}
                    </option>
                {/each}
            </select>
        </div>

        <button class="button" on:click={GetScheduleByTeam}> 조회하기 </button>
    </div>

    {#if ScheduleArray.length > 0}
    <div class="gameboardcontainer">
        {#if ScheduleArray.length === 0}
            <div class="nogame">※ 원하는 "경기 년월", "팀 이름" 을 선택하고 "조회하기"를 눌러주세요.</div>
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
            <div class="title">※ 경기를 선택해 주세요.</div>
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
        <div bind:this = {ActionContainerDiv} class="PbyP_ActionContainer">
            {#each PlaybyPlayArray as PbyPAction, ArrayIndex}
                {#if ArrayIndex === 0}
                    <div
                        bind:this={ActionDivs[ArrayIndex]}
                        class="PbyP_Action_Common PbyP_Action_Home"
                    >
                        <div class="PbyP_Action_JumpBall">
                            <div class="PbyP_Action_Time">
                                <span class="PbyP_Text_Big"
                                    >Q{PbyPAction["period"]}</span
                                ><br />
                                <!-- PT01M17.00S -> 01:17 -->
                                <span class="PbyP_Text_Small"
                                    >{PbyPAction["clock"]
                                        .replace("PT", "")
                                        .replace("M", ":")
                                        .slice(0, 5)}</span
                                >
                            </div>
                            <img
                                src="/TeamLogo/{SelectedGame[
                                    'home_teamid'
                                ]}.svg"
                                alt="TeamLogo"
                                class="PbyP_Action_Image"
                            />
                            <div class="PbyP_Action_Desc_JumpBall">
                                <span class="PbyP_Text_JumpBall"
                                    >Game Start - Jump Ball</span
                                ><br />
                                <span class="PbyP_Text_Small"
                                    >{PbyPAction["description"]}</span
                                >
                            </div>
                            <img
                                src="/TeamLogo/{SelectedGame[
                                    'away_teamid'
                                ]}.svg"
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
                    >
                        <div
                            bind:this={ActionDivs[ArrayIndex]}
                            class="PbyP_Action"
                            on:click={() => {
                                SelectAction(ArrayIndex);
                            }}
                        >
                            <div class="PbyP_Action_Time">
                                <span class="PbyP_Text_Big"
                                    >Q{PbyPAction["period"]}</span
                                ><br />
                                <!-- PT01M17.00S -> 01:17 -->
                                <span class="PbyP_Text_Small"
                                    >{PbyPAction["clock"]
                                        .replace("PT", "")
                                        .replace("M", ":")
                                        .slice(0, 5)}</span
                                >
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
                                {#if PbyPAction["pointsTotal"] === 0}
                                    <span class="PbyP_Text_Miss">Missed</span
                                    ><span class="PbyP_Text_Big"
                                        >&nbsp;&nbsp;&nbsp;[{PbyPAction[
                                            "scoreHome"
                                        ]} vs {PbyPAction["scoreAway"]}]</span
                                    ><br />
                                    <span class="PbyP_Text_Small"
                                        >{PbyPAction["subType"]}</span
                                    >
                                {:else}
                                    <span class="PbyP_Text_Made"
                                        >{PbyPAction["pointsTotal"]} Points</span
                                    ><span class="PbyP_Text_Big"
                                        >&nbsp;&nbsp;&nbsp;[{PbyPAction[
                                            "scoreHome"
                                        ]} vs {PbyPAction["scoreAway"]}]</span
                                    ><br />
                                    <span class="PbyP_Text_Small"
                                        >{PbyPAction["subType"]}</span
                                    >
                                {/if}
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>

        <div class="PbyP_Court_Container">
            <div class="CS_Board">
                <div>
                    {#if SelectedGame["game_id"] !== undefined}
                    <img
                        src="/TeamLogo/{SelectedGame['home_teamid']}.svg"
                        alt="HomeTeamLogo"
                        class="CS_TeamLogoImage"
                    />
                    {/if}
                    <div class="CS_Board_Real">
                        <div class="CS_score">
                            {CurrentScore_Home}
                        </div>
                        <div class="CS_vs">VS</div>
                        <div class="CS_score">
                            {CurrentScore_Away}
                        </div>
                    </div>
                    {#if SelectedGame["game_id"] !== undefined}
                    <img
                        src="/TeamLogo/{SelectedGame['away_teamid']}.svg"
                        alt="AwayTeamLogo"
                        class="CS_TeamLogoImage"
                    />
                    {/if}
                </div>
            </div>
            <div id="PbyP_Court">
            {#if SelectedAction !== null}
                <img
                    bind:this={ImageShooter}
                    src="https://cdn.nba.com/headshots/nba/latest/1040x760/{SelectedAction['personId']}.png"
                    onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'"
                    alt="PlayerHeadShot"
                    class="Shooter"
                    style="left: {SelectedAction['PosX'] - 20}px; top: {SelectedAction['PosY'] - 20}px; background-color: {SelectedAction['pointsTotal'] === 0 ? 'red' : 'green'};"
                />
                <img
                    bind:this={ImageBall}
                    src="Ball.jpg"
                    alt="Ball"
                    id="Ball"
                    style="left: {SelectedAction['PosX'] - 10}px; top: {SelectedAction['PosY'] - 10}px;"
                />
            {/if}
            </div>
            <label class="AutoProgress">
                <input type="checkbox" bind:checked={AutoProgress} />
                Play By Play 자동 진행
            </label>
        </div>
    </div>
    {/if}

    {#if SelectedGame["game_id"] !== undefined && PlayerStatArray.length > 0}
        <div class="groupbox2">
            <div class="playerlist_teamname">
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
                    <th class="gameresult">선수 이름</th>
                    <th class="gameresult">출전시간</th>
                    <th class="gameresult">득점</th>
                    <th class="gameresult">리바운드</th>
                    <th class="gameresult">어시스트</th>
                    <th class="gameresult">스틸</th>
                    <th class="gameresult">블록</th>
                    <th class="gameresult">야투율(%)</th>
                    <th class="gameresult">3점 성공률(%)</th>
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
        </div>
    {/if}
    
    {#if SelectedGame["game_id"] !== undefined && PlayerStatArray.length > 0}
        <div class="groupbox2">
            <div class="playerlist_teamname">
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
                    <th class="gameresult">선수 이름</th>
                    <th class="gameresult">출전시간</th>
                    <th class="gameresult">득점</th>
                    <th class="gameresult">리바운드</th>
                    <th class="gameresult">어시스트</th>
                    <th class="gameresult">스틸</th>
                    <th class="gameresult">블록</th>
                    <th class="gameresult">야투율(%)</th>
                    <th class="gameresult">3점 성공률(%)</th>
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
        </div>
    {/if}
</body>

<style>
    body {
        /* overflow: hidden; */
        width: 100%;
        background-color: rgb(246, 246, 246);
        padding-bottom: 0.1px;
    }

    .pagenamecontainer {
        padding: 10px 65px;
        width: 100%;
        background-color: rgb(97, 0, 97);

        display: flex;
        justify-content: space-between;
    }

    .pagename {
        font-size: 30px;
        font-weight: bold;
        color: white;
    }

    .BMW_container {
        display: flex;
    }

    .BMW_normal {
        font-size: 15px;
        font-weight: bold;
        color: white;
        /* color: rgb(243, 139, 43); */

        font-style:italic;
    }
    .BMW_BMW {
        padding-left: 5px;
        font-size: 30px;
        font-weight: bold;
        color: rgb(255, 201, 14);

        font-style:italic;
        -webkit-text-stroke: 1px white;
        /* text-shadow: 2px 2px 4px gray; */
    }
    .BMWimg {
        width: 40px;
        height: 40px;
        margin-left: 20px;
        margin-right: 20px;
        border-radius: 5px;
        border: 2px solid white;
    }
    
    .groupbox1 {
        margin: 0px auto;
        margin-top: 30px;
        padding: 20px 20px;
        width: 90%;
        display: flex;
        justify-content: center;
        background-color: white;
        border-radius: 20px;
        margin-bottom: 30px;
    }

    .selectinformation {
        margin-left: 10px;
        margin-bottom: 5px;
        margin-left: 20px;
        font-weight: bold;
        /* text-align: center; */
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

    .button{
        background-color: rgb(243,139,43);
        width: 150px;
        height: 60px;
        margin-top: 20px;
        margin-left: 50px;
        padding: 10px 30px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 20px;
        color: white;
    }

    .button:hover {
        background-color: rgb(201, 115, 34);
    }

    .gameboardcontainer {
        display: flex;
        border: 3px solid rgb(243,139,43);
        border-radius: 20px;
        flex-wrap: wrap;
        justify-content: left;
        margin: 50px 100px;
        background-color: white;
    }

    .nogame {
        width: 100%;
        text-align: center;
        font-size: 20px;
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

    .groupbox2 {
        margin: 0px auto;
        padding: 20px 20px;
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: white;
        border-radius: 20px;
        margin-bottom: 30px;
    }
    
    .playername {
        width: 250px;
        text-align: left;
        padding-left: 10px;
    }

    .playerimage {
        display: inline;
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }

    .selectedgame_title {
        width: 50%;
        height: 170px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        margin-top: 50px;
        background-color: white;
        border: 3px solid rgb(243, 139, 43);
    }

    .title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }

    .playerlist_teamname {
        text-align: center;
        font-size: 35px;
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

    .PbyPContainer {
        display: flex;
        width: 95%;
        margin: 50px auto;
        border: 3px solid rgb(243, 139, 43);
        border-radius: 20px;
        padding: 10px;
    }

    .PbyP_ActionContainer {
        width: 500px;
        height: 500px;
        /* margin-left: 30px; */
        margin-right: 10px;
        overflow-y: scroll;
        border: 1px solid black;
        /* border-radius: 5px; */
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

    .PbyP_Court_Container {
    }

    .CS_Board {
        display: flex;
        justify-content: center;
    }

    .CS_Board_Real {
        display: inline-block;
        background-color: black;
        padding-left: 10px;
        padding-right: 10px;
        color: rgb(14, 209, 14);
        border-radius: 5px;
    }

    .CS_TeamLogoImage {
        display: inline-block;
        width: 50px;
        height: 50px;
        margin-left: 100px;
        margin-right: 100px;
    }

    .CS_score {
        display: inline-block;
        width: 50px;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        line-height: 50px;
    }

    .CS_vs {
        display: inline-block;
        text-align: center;
        font-size: 10px;
        font-weight: bold;
        padding-left: 5px;
        padding-right: 5px;
    }

    #PbyP_Court {
        width: 700px;
        height: 373px;
        background-image: url("/NBACourt03.jpg");
        display: inline-block;
        border: 1px solid black;
        background-repeat: no-repeat;
        background-size: contain;
        position: relative;
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

    .AutoProgress{
        display: block;
        padding: 10px;
        margin-top: 7px;
        background: black;
        color: rgb(255, 201, 14);
        /* color: white; */
        border-radius: 10px;
        font-size: 25px;
        font-weight: bold;
        text-align: center;
    }

    table {
        min-width: 70%;
        padding-left: 5px;
        padding-right: 5px;
        border: 1px solid black;
        border-collapse: collapse;
        margin: 20px auto;
    }

    .TeamLogoImage {
        display: inline-block;
        width: 100px;
        height: 100px;
    }

    tr {
        transition: 0.3s;
    }

    tr:hover {
        background-color: rgb(229, 231, 235);
        cursor: pointer;
    }

    th {
        background-color: rgb(255, 201, 14);
    }

    td {
        text-align: center;
    }

    td,
    th {
        border: 1px solid black;
        min-width: 100px;
    }

    .gameresult{
        border: 1px solid black;
        cursor: pointer;
        font-size: 18px;
    }
</style>
