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
    let PlayerStatArray = [];

    async function GetScheduleByTeam() {
        let TeamID = TeamObj[SelectedTeamname]["TeamID"];
        const response = await fetch(
            `timeformatch/db/GetScheduleByTeam?ScheduleYYYYMM=${SelectedScheduleYYYYMM}&TeamID=${TeamID}`
        );
        ScheduleArray = await response.json();
        console.log(ScheduleArray);
    }

    async function GetPlaybyPlay(GameID) {
        const response = await fetch(
            `timeformatch/api/playbyplay?GameID=${GameID}`
        );
        PlaybyPlayArray = await response.json();
    }

    async function GetBoxScoreTraditional(GameID) {
        const response = await fetch(
            `timeformatch/api/boxscoretraditional?GameID=${GameID}`
        );
        PlayerStatArray = await response.json();

        console.log(PlayerStatArray);
    }

    function SelectGame(ArrayIndex) {
        console.log(`SelectGame(${ArrayIndex})`);
        SelectedGame = ScheduleArray[ArrayIndex];

        GetPlaybyPlay(SelectedGame["game_id"]);
        GetBoxScoreTraditional(SelectedGame["game_id"]);
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

    <div>
        {#if SelectedGame["game_date"] === undefined}
            <div class="title">경기를 선택해 주세요.</div>
        {:else}
            <div class="title">{SelectedGame["game_date"].slice(0, 10)}</div>
            <div class="imagecenter">
                <img
                    src="/TeamLogo/{SelectedGame['home_teamid']}.svg"
                    alt="HomeTeamLogo"
                    class="image"
                />
                <div class="title inlineblock">
                    {SelectedGame["home_gamescore"]} VS {SelectedGame[
                        "away_gamescore"
                    ]}
                </div>
                <img
                    src="/TeamLogo/{SelectedGame['away_teamid']}.svg"
                    alt="AwayTeamLogo"
                    class="image"
                />
            </div>
        {/if}

        <img
            src="/basketballcourt.jpg"
            alt="basketballcourt.jpg"
            class="court"
        />
    </div>

    <input class="center" type="range" min="0" max="48" list="tickmarks" />
    <datalist id="tickmarks">
        <option value="0">시작</option>
        <option value="12">1Q 끝</option>
        <option value="24">2Q 끝</option>
        <option value="36">3Q 끝</option>
        <option value="48">4Q 끝</option>
    </datalist>

    <div class="tposition">
        {#if SelectedGame["game_id"] !== undefined && PlayerStatArray.length > 0}
            <div class="title">
                홈팀 : <img
                    src="/TeamLogo/{SelectedGame['home_teamid']}.svg"
                    alt="AwayTeamLogo"
                    class="image"
                />
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
                                <td colspan='8'>{PlayerStat[3]}</td>
                            {:else}
                                <td>{parseInt(PlayerStat[4])}{PlayerStat[4].slice(-3)}</td>
                                <td>{PlayerStat[5]}</td>
                                <td>{PlayerStat[6]}</td>
                                <td>{PlayerStat[7]}</td>
                                <td>{PlayerStat[8]}</td>
                                <td>{PlayerStat[9]}</td>
                                <td>{(Number(PlayerStat[10])*100).toFixed(1)}</td>
                                <td>{(Number(PlayerStat[11])*100).toFixed(1)}</td>
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
                    class="image"
                />
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
                                <td colspan='8'>{PlayerStat[3]}</td>
                            {:else}
                                <td>{parseInt(PlayerStat[4])}{PlayerStat[4].slice(-3)}</td>
                                <td>{PlayerStat[5]}</td>
                                <td>{PlayerStat[6]}</td>
                                <td>{PlayerStat[7]}</td>
                                <td>{PlayerStat[8]}</td>
                                <td>{PlayerStat[9]}</td>
                                <td>{(Number(PlayerStat[10])*100).toFixed(1)}</td>
                                <td>{(Number(PlayerStat[11])*100).toFixed(1)}</td>
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

    .playername{
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

    .title {
        font-weight: bold;
        font-size: 20px;
    }

    .center {
        margin: 0 auto;
        width: 100%;
    }

    .imagecenter {
        display: inline-block;
        margin-left: 480px;
    }

    .title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-top: 20px;
    }

    .inlineblock {
        display: inline-block;
    }

    .court {
        display: inline-block;
        width: 70%;
        height: 10%;
        margin-left: 200px;
        margin-top: 30px;
        margin-bottom: 30px;
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

    .image {
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
