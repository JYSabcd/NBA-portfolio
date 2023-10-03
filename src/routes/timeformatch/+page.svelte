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
    let SelectedAction = [];
    let PlayerStatArray = [];

    let CurrentScore_Home = 0;
    let CurrentScore_Away = 0;

    async function GetScheduleByTeam() {
        let TeamID = TeamObj[SelectedTeamname]["TeamID"];
        const response = await fetch(
            `timeformatch/db/GetScheduleByTeam?ScheduleYYYYMM=${SelectedScheduleYYYYMM}&TeamID=${TeamID}`
        );
        ScheduleArray = await response.json();
        console.log(ScheduleArray);
    }

    async function GetPlaybyPlay(GameID) {
        //console.log(`SelectGame(${GameID})`);

        const response = await fetch(
            `timeformatch/api/playbyplay?GameID=${GameID}`
        );
        PlaybyPlayArray = await response.json();

        console.log(PlaybyPlayArray);
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

        GetPlaybyPlay(SelectedGame["game_id"]);
        GetBoxScoreTraditional(SelectedGame["game_id"]);
    }

    function SelectAction(ArrayIndex) {
        console.log(`SelectAction(${ArrayIndex})`);

        SelectedAction = [PlaybyPlayArray[ArrayIndex]];
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

        <!-- Q: What x/y vertices define action areas in the x/y coordinate graph?

        A: A list of areas is included below. Note that these vertices are for the left side of the court. For the right side, we use the following calculation, where length=1128 and width=600:

        right-court-point = (length - x, width - y)
        left_basket=[63, 300]
        right_basket=[1065, 300]
        Areas:

        underbasket: [ 48, 252 ], [ 77, 258 ], [ 111, 300 ], [ 77, 342 ], [ 48, 348 ]
        inthepaint: [ 0, 204 ], [ 228, 204 ], [ 228, 396 ], [ 0, 396 ]
        insiderightwing: [ 0, 36 ], [ 115, 36 ], [ 77, 204 ], [ 0, 204 ]
        insideright: [ 115, 36 ], [ 225, 87 ], [ 294, 161 ], [ 225, 204 ], [ 77, 204 ]
        insidecenter: [ 225, 204 ], [ 294, 161 ], [ 324, 218 ], [ 337, 300 ], [ 324, 382 ], [ 294, 439 ], [ 225, 396 ]
        insideleft: [ 115, 564 ], [ 225, 513 ], [ 294, 439 ], [ 225, 396 ], [ 77, 396 ]
        insideleftwing: [ 0, 564 ], [ 115, 564 ], [ 77, 396 ], [ 0, 396 ]
        outsiderightwing: [ 0, 0 ], [ 122, 0 ], [ 115, 36 ], [ 0, 36 ]
        outsideright: [ 122, 0 ], [ 492, 0 ], [ 492, 69 ], [ 324, 218 ], [ 294, 161 ], [ 225, 87 ], [ 115, 36 ]
        outsidecenter: [ 324, 216 ], [ 492, 69 ], [ 492, 531 ], [ 324, 382 ], [ 337, 300 ]
        outsideleft: [ 122, 600 ], [ 492, 600 ], [ 492, 531 ], [ 324, 382 ], [ 294, 439 ], [ 225, 513 ], [ 115, 564 ]
        outsideleftwing: [ 0, 600 ], [ 122, 600 ], [ 115, 564 ], [ 0, 564 ]
        backcourt: [ 492, 0 ], [ 564, 0 ], [ 564, 600 ], [ 492, 600 ] -->

        <div class="PbyP_Court">
            {#each SelectedAction as Action}
                <img
                src="https://cdn.nba.com/headshots/nba/latest/1040x760/{Action['personId']}.png"
                onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'"
                alt="PlayerHeadShot"
                class="Shooter"
                style="top: 200px"
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

    .PbyP_Court {
        width: 700px;
        background-image: url("/NBACourt03.jpg");
        display: inline-block;
        border: 1px solid black;
        background-repeat: no-repeat;
        background-size : contain;

        position: relative;
    }

    .Shooter {
        position: absolute;
        width: 40px;
        height: 40px;
        left: 100px;
        top: 100px;
        border-radius: 100%;
        border: 1px solid black;
        background-color: green;
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
