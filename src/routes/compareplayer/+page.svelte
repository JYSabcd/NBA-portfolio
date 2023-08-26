<script lang="ts">
    const PlayerCT_PlusButton = 0;
    const PlayerCT_Selecting = 1;
    const PlayerCT_Selected = 2;

    let PlayerCT1 = PlayerCT_PlusButton; //  Player Container Type 1
    let PlayerCT2 = PlayerCT_PlusButton; //  Player Container Type 2

    let IsAverageMode = false;  //  false : 평균값 사용 안함, true : 평균값 사용 (Player2 정보에 평균값 표시)
    let IsSelectedSeason1Mode = false
    
    const SeasonArray = [
        "2022-23",
        "2021-22",
        "2020-21",
        "2019-20",
        "2018-19",
        "2017-18",
        "2016-17",
        "2015-16",
        "2014-15",
        "2013-14",
        "2012-13",
        "2011-12",
        "2010-11",
        "2009-10",
        "2008-09",
        "2007-08",
        "2006-07",
        "2005-06",
        "2004-05",
        "2003-04",
        "2002-03",
        "2001-02",
        "2000-01",
        "1999-00",
        "1998-99",
        "1997-98",
        "1996-97",
    ];

    const TeamnameArray = [
        "Atlanta Hawks",
        "Boston Celtics",
        "Brooklyn Nets",
        "Charlotte Hornets",
        "Chicago Bulls",
        "Cleveland Cavaliers",
        "Dallas Mavericks",
        "Denver Nuggets",
        "Detroit Pistons",
        "Golden State Warriors",
        "Houston Rockets",
        "Indiana Pacers",
        "Los Angeles Clippers",
        "Los Angeles Lakers",
        "Memphis Grizzlies",
        "Miami Heat",
        "Milwaukee Bucks",
        "Minnesota Timberwolves",
        "New Orleans Pelicans",
        "New York Knicks",
        "Oklahoma City Thunder",
        "Orlando Magic",
        "Philadelphia 76ers",
        "Phoenix Suns",
        "Portland Trail Blazers",
        "Sacramento Kings",
        "San Antonio Spurs",
        "Toronto Raptors",
        "Utah Jazz",
        "Washington Wizards",
    ];

    const TeamObj = {
        "Atlanta Hawks": {
            TeamID: 1610612737,
            Abbrev: "ATL",
            TeamName: "Hawks",
            City: "Atlanta",
        },

        "Boston Celtics": {
            TeamID: 1610612738,
            Abbrev: "BOS",
            TeamName: "Celtics",
            City: "Boston",
        },

        "Brooklyn Nets": {
            TeamID: 1610612751,
            Abbrev: "BKN",
            TeamName: "Nets",
            City: "Brooklyn",
        },

        "Charlotte Hornets": {
            TeamID: 1610612766,
            Abbrev: "CHA",
            TeamName: "Hornets",
            City: "Charlotte",
        },

        "Chicago Bulls": {
            TeamID: 1610612741,
            Abbrev: "CHI",
            TeamName: "Bulls",
            City: "Chicago",
        },

        "Cleveland Cavaliers": {
            TeamID: 1610612739,
            Abbrev: "CLE",
            TeamName: "Cavaliers",
            City: "Cleveland",
        },

        "Dallas Mavericks": {
            TeamID: 1610612742,
            Abbrev: "DAL",
            TeamName: "Mavericks",
            City: "Dallas",
        },

        "Denver Nuggets": {
            TeamID: 1610612743,
            Abbrev: "DEN",
            TeamName: "Nuggets",
            City: "Denver",
        },

        "Detroit Pistons": {
            TeamID: 1610612765,
            Abbrev: "DET",
            TeamName: "Pistons",
            City: "Detroit",
        },

        "Golden State Warriors": {
            TeamID: 1610612744,
            Abbrev: "GSW",
            TeamName: "Warriors",
            City: "Golden State",
        },

        "Houston Rockets": {
            TeamID: 1610612745,
            Abbrev: "HOU",
            TeamName: "Rockets",
            City: "Houston",
        },

        "Indiana Pacers": {
            TeamID: 1610612754,
            Abbrev: "IND",
            TeamName: "Pacers",
            City: "Indiana",
        },

        "Los Angeles Clippers": {
            TeamID: 1610612746,
            Abbrev: "LAC",
            TeamName: "Clippers",
            City: "Los Angeles",
        },

        "Los Angeles Lakers": {
            TeamID: 1610612747,
            Abbrev: "LAL",
            TeamName: "Lakers",
            City: "Los Angeles",
        },

        "Memphis Grizzlies": {
            TeamID: 1610612763,
            Abbrev: "MEM",
            TeamName: "Grizzlies",
            City: "Memphis",
        },

        "Miami Heat": {
            TeamID: 1610612748,
            Abbrev: "MIA",
            TeamName: "Heat",
            City: "Miami",
        },

        "Milwaukee Bucks": {
            TeamID: 1610612749,
            Abbrev: "MIL",
            TeamName: "Bucks",
            City: "Milwaukee",
        },

        "Minnesota Timberwolves": {
            TeamID: 1610612750,
            Abbrev: "MIN",
            TeamName: "Timberwolves",
            City: "Minnesota",
        },

        "New Orleans Pelicans": {
            TeamID: 1610612740,
            Abbrev: "NOP",
            TeamName: "Pelicans",
            City: "New Orleans",
        },

        "New York Knicks": {
            TeamID: 1610612752,
            Abbrev: "NYK",
            TeamName: "Knicks",
            City: "New York",
        },

        "Oklahoma City Thunder": {
            TeamID: 1610612760,
            Abbrev: "OKC",
            TeamName: "Thunder",
            City: "Oklahoma City",
        },

        "Orlando Magic": {
            TeamID: 1610612753,
            Abbrev: "ORL",
            TeamName: "Magic",
            City: "Orlando",
        },

        "Philadelphia 76ers": {
            TeamID: 1610612755,
            Abbrev: "PHI",
            TeamName: "76ers",
            City: "Philadelphia",
        },

        "Phoenix Suns": {
            TeamID: 1610612756,
            Abbrev: "PHX",
            TeamName: "Suns",
            City: "Phoenix",
        },

        "Portland Trail Blazers": {
            TeamID: 1610612757,
            Abbrev: "POR",
            TeamName: "Trail Blazers",
            City: "Portland",
        },

        "Sacramento Kings": {
            TeamID: 1610612758,
            Abbrev: "SAC",
            TeamName: "Kings",
            City: "Sacramento",
        },

        "San Antonio Spurs": {
            TeamID: 1610612759,
            Abbrev: "SAS",
            TeamName: "Spurs",
            City: "San Antonio",
        },

        "Toronto Raptors": {
            TeamID: 1610612761,
            Abbrev: "TOR",
            TeamName: "Raptors",
            City: "Toronto",
        },

        "Utah Jazz": {
            TeamID: 1610612762,
            Abbrev: "UTA",
            TeamName: "Jazz",
            City: "Utah",
        },

        "Washington Wizards": {
            TeamID: 1610612764,
            Abbrev: "WAS",
            TeamName: "Wizards",
            City: "Washington",
        },
    };


    let playerrosters1 = [];    //  api에서 얻어온 플레이어 리스트
    let playerrosters2 = [];

    let PlayerData1 = [];   //  api에서 얻어온 선수 기록
    let PlayerData2 = [];

    let Average =[];    //  api에서 얻어온 한 시즌 선수들의 평균 (58경기 이상 선수만)

    let SelectedSeason1 = "";
    let SelectedTeamname1 = "";
    let SelectedPlayerInfo1 = [];   //  ["PlayerName", PlayerID]

    let SelectedSeason2 = "";
    let SelectedTeamname2 = "";
    let SelectedPlayerInfo2 = [];   //  ["PlayerName", PlayerID]

    async function ChangeRoster1() {

        if (SelectedTeamname1 === "" || SelectedSeason1 === "") {
            return;
        }

        playerrosters1 = [];

        let TeamID1 = TeamObj[SelectedTeamname1]["TeamID"];
        const response1 = await fetch(
            `compareplayer/api/playerrosters?Season=${SelectedSeason1}&TeamID=${TeamID1}`
        );
        IsSelectedSeason1Mode = true;
        playerrosters1 = await response1.json();
    }

    async function ChangeRoster2() {

        if (SelectedTeamname2 === "" || SelectedSeason2 === "") {
            return;
        }

        playerrosters2 = [];

        let TeamID2 = TeamObj[SelectedTeamname2]["TeamID"];
        const response2 = await fetch(
            `compareplayer/api/playerrosters?Season=${SelectedSeason2}&TeamID=${TeamID2}`
        );
        playerrosters2 = await response2.json();
    }

    async function PlayerDataLoading1() {
        const response3 = await fetch(
            `compareplayer/api/playerstats?Season=${SelectedSeason1}&PlayerID=${SelectedPlayerInfo1[1]}`
        );
        PlayerData1 = await response3.json();
    }

    async function PlayerDataLoading2() {
        const response4 = await fetch(
            `compareplayer/api/playerstats?Season=${SelectedSeason2}&PlayerID=${SelectedPlayerInfo2[1]}`
        );
        PlayerData2 = await response4.json();
    }
    
    async function Averagebutton() {
        if(PlayerCT1 !== PlayerCT_Selected){
            alert('첫 번째 선수를 먼저 골라주세요');
            return;
        }

        Reset2();   //  평균값은 플레이어2에 적용되므로 기존에 선택된 값이 있다면 초기화 시킨다.

        const response5 = await fetch(
            `compareplayer/api/playerstatsaverage?Season=${SelectedSeason1}`
        );
        IsAverageMode = true;
        Average = await response5.json();
    }

    function Selecting1() {
        PlayerCT1 = PlayerCT_Selecting;
    }

    function Selecting2() {
        PlayerCT2 = PlayerCT_Selecting;

        IsAverageMode = false;
    }

    function Selected1() {
        PlayerCT1 = PlayerCT_Selected;
        PlayerDataLoading1();
    }

    function Selected2() {
        PlayerCT2 = PlayerCT_Selected;

        IsAverageMode = false;

        PlayerDataLoading2();
    }

    function ResetAll() {
        PlayerCT1 = PlayerCT_PlusButton;
        PlayerCT2 = PlayerCT_PlusButton;

        playerrosters1 = [];
        PlayerData1 = [];
        playerrosters2 = [];
        PlayerData2 = [];
        Average = [];

        SelectedSeason1 = "";
        IsSelectedSeason1Mode = false;
        SelectedTeamname1 = "";
        SelectedPlayerInfo1 = [];
        SelectedSeason2 = "";
        SelectedTeamname2 = "";
        SelectedPlayerInfo2 = [];
        Average = [];

        IsAverageMode = false;
    }
    function Reset1() {
        PlayerCT1 = PlayerCT_PlusButton;

        playerrosters1 = [];
        PlayerData1 = [];

        SelectedSeason1 = "";
        SelectedTeamname1 = "";
        SelectedPlayerInfo1 = [];

        if(IsAverageMode === true){
            Reset2();
        }
    }

    function Reset2() {
        PlayerCT2 = PlayerCT_PlusButton;

        playerrosters2 = [];
        PlayerData2 = [];
        Average = [];

        SelectedSeason2 = "";
        SelectedTeamname2 = "";
        SelectedPlayerInfo2 = [];

        IsAverageMode = false;
    }
</script>

<div class="body">
    <div class="white">
        <div class="button">
            <div class="NBAAverage space" on:click={Averagebutton}>NBA 평균</div>
            <div class="reset" on:click={ResetAll}>선수 초기화</div>
        </div>

        <div class="flex">
            <div class="player-container">
                <div class="text">선수1 이름 : {SelectedPlayerInfo1[0]?SelectedPlayerInfo1[0]:"---"}</div>

                {#if PlayerCT1 === PlayerCT_PlusButton}
                    <div class="comparebox firstp1" on:click={Selecting1}>
                        +
                    </div>
                {:else if PlayerCT1 === PlayerCT_Selecting}
                    <div class="comparebox secondp1">
                        <div class="distance">
                            <div>시즌연도</div>
                            <select
                                bind:value={SelectedSeason1}
                                on:change={ChangeRoster1}
                            >
                                <option value="" hidden selected
                                    >연도를 선택해주세요</option
                                >
                                {#each SeasonArray as Season}
                                    <option class="option" value={Season}>
                                        {Season}
                                    </option>
                                {/each}
                            </select>
                        </div>
                        <div class="distance">
                            <div>팀이름</div>
                            <select
                                bind:value={SelectedTeamname1}
                                on:change={ChangeRoster1}
                            >
                                <option value="" hidden selected>
                                    팀을 선택해주세요
                                </option>
                                {#each TeamnameArray as teamname}
                                    <option class="option" value={teamname}>
                                        {teamname}
                                    </option>
                                {/each}
                            </select>
                        </div>
                        <div class="distance">
                            <div>선수 로스터</div>
                            <select bind:value={SelectedPlayerInfo1}>
                                <option value="" hidden selected>
                                    팀 연도를 먼저 선택해주세요.
                                </option>
                                {#each playerrosters1 as playerinfo}
                                    <option class="option" value={playerinfo}>
                                        {playerinfo[0]}
                                    </option>
                                {/each}
                            </select>
                        </div>
                        {#if SelectedSeason1 !== "" && SelectedTeamname1 !== "" && SelectedPlayerInfo1[0] !== ""}
                            <button
                                class="NBAAverage distance"
                                on:click={Selected1}
                                >조회하기
                            </button>
                        {:else}
                            <button class="NBAAverage distance">
                                조회하기
                            </button>
                        {/if}
                    </div>
                {:else if PlayerCT1 === PlayerCT_Selected}
                    <img
                        src="https://cdn.nba.com/headshots/nba/latest/1040x760/{SelectedPlayerInfo1[1]}.png"
                        alt="Player Headshot"
                    />

                    <div class="reset center" on:click={Reset1}>
                        선수1 초기화
                    </div>
                {/if}
            </div>

            <div class="position">
                <table class="table">
                    <tbody class="font">
                        <tr><td>{PlayerData1[0]!==undefined?PlayerData1[0]:"--"}</td></tr>
                        <tr><td>{PlayerData1[1]!==undefined?PlayerData1[1]:"--"}</td></tr>
                        <tr><td>{PlayerData1[2]!==undefined?PlayerData1[2]:"--"}</td></tr>
                        <tr><td>{PlayerData1[3]!==undefined?PlayerData1[3]:"--"}</td></tr>
                        <tr><td class="bigger">{PlayerData1[4]!==undefined?PlayerData1[4]:"--"}</td></tr>
                        <tr><td>{PlayerData1[5]!==undefined?PlayerData1[5]:"--"}</td></tr>
                    </tbody>
                </table>

                <table class="table">
                    <tbody class="font">
                        <tr><td>평균 출전 시간</td></tr>
                        <tr><td>평균 득점</td></tr>
                        <tr><td>평균 리바운드</td></tr>
                        <tr><td>평균 어시스트</td></tr>
                        <tr><td>평균 스틸</td></tr>
                        <tr><td>평균 블록</td></tr>
                    </tbody>
                </table>

                {#if IsAverageMode === true}
                    <table class="table">
                        <tbody class="font">
                            <tr><td>{Average[0]!==undefined?Average[0]:"--"}</td></tr>
                            <tr><td>{Average[1]!==undefined?Average[1]:"--"}</td></tr>
                            <tr><td>{Average[2]!==undefined?Average[2]:"--"}</td></tr>
                            <tr><td>{Average[3]!==undefined?Average[3]:"--"}</td></tr>
                            <tr><td class="bigger">{Average[4]!==undefined?Average[4]:"--"}</td></tr>
                            <tr><td>{Average[5]!==undefined?Average[5]:"--"}</td></tr>
                        </tbody>
                    </table>
                {:else}
                    <table class="table">
                        <tbody class="font">
                            <tr><td>{PlayerData2[0]!==undefined?PlayerData2[0]:"--"}</td></tr>
                            <tr><td>{PlayerData2[1]!==undefined?PlayerData2[1]:"--"}</td></tr>
                            <tr><td>{PlayerData2[2]!==undefined?PlayerData2[2]:"--"}</td></tr>
                            <tr><td>{PlayerData2[3]!==undefined?PlayerData2[3]:"--"}</td></tr>
                            <tr><td class="bigger">{PlayerData2[4]!==undefined?PlayerData2[4]:"--"}</td></tr>
                            <tr><td>{PlayerData2[5]!==undefined?PlayerData2[5]:"--"}</td></tr>
                        </tbody>
                    </table>
                {/if}
            </div>

            <div class="player-container">
                
                    {#if IsAverageMode === true}
                        {#if SelectedSeason1 !== ""}
                            <div class="text">선수2 이름 : {SelectedSeason1}년도 평균 기록 (규정경기 수 O)</div>
                            <img
                                src="/NBA-Average-Logo.png"
                                alt="NBA logo"
                            />

                            <div class="reset center" on:click={Reset2}>
                                선수2 초기화
                            </div>
                        {:else}
                            <div class="text">선수2 이름 : {SelectedPlayerInfo2[0]?SelectedPlayerInfo2[0]:"---"}</div>
                            <div class="comparebox firstp2" on:click={Selecting2}>
                                +
                            </div>
                        {/if}
                    {:else}
                        <div class="text">선수2 이름 : {SelectedPlayerInfo2[0]?SelectedPlayerInfo2[0]:"---"}</div>
                        {#if PlayerCT2 === PlayerCT_PlusButton}
                        <div class="comparebox firstp2" on:click={Selecting2}>
                            +
                        </div>
                        {:else if PlayerCT2 === PlayerCT_Selecting}
                            <div class="comparebox secondp2">
                                <div class="distance">
                                    <div>시즌연도</div>
                                    <select
                                        bind:value={SelectedSeason2}
                                        on:change={ChangeRoster2}
                                    >
                                        <option value="" hidden selected
                                            >연도를 선택해주세요</option
                                        >
                                        {#each SeasonArray as Season}
                                            <option class="option" value={Season}>
                                                {Season}
                                            </option>
                                        {/each}
                                    </select>
                                </div>
                                <div class="distance">
                                    <div>팀이름</div>
                                    <select
                                        bind:value={SelectedTeamname2}
                                        on:change={ChangeRoster2}
                                    >
                                        <option value="" hidden selected>
                                            팀을 선택해주세요
                                        </option>
                                        {#each TeamnameArray as teamname}
                                            <option class="option" value={teamname}>
                                                {teamname}
                                            </option>
                                        {/each}
                                    </select>
                                </div>
                                <div class="distance">
                                    <div>선수 로스터</div>
                                    <select bind:value={SelectedPlayerInfo2}>
                                        <option value="" hidden selected>
                                            팀 연도를 먼저 선택해주세요.
                                        </option>
                                        {#each playerrosters2 as playerinfo}
                                            <option class="option" value={playerinfo}>
                                                {playerinfo[0]}
                                            </option>
                                        {/each}
                                    </select>
                                </div>
                            {#if SelectedSeason2 !== "" && SelectedTeamname2 !== "" && SelectedPlayerInfo2[0] !== ""}
                                <button
                                    class="NBAAverage distance"
                                    on:click={Selected2}
                                    >조회하기
                                </button>
                            {:else}
                                <button class="NBAAverage distance">
                                    조회하기
                                </button>
                            {/if}
                        </div>
                    {:else if PlayerCT2 === PlayerCT_Selected}
                        <img
                            src="https://cdn.nba.com/headshots/nba/latest/1040x760/{SelectedPlayerInfo2[1]}.png"
                            alt="Player Headshot"
                        />

                        <div class="reset center" on:click={Reset2}>
                            선수2 초기화
                        </div>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
</div>

<style>
    .body {
        overflow: auto;
        height: calc(100vh - 50px);
        background-color: rgb(246, 246, 246);
    }

    .white {
        margin: 30px auto;
        padding: 20px 20px;
        width: 90%;
        justify-content: center;
        background-color: white;
        padding-bottom: 170px;
        border-radius: 20px;
    }

    .button {
        margin-left: 70%;
        margin-top: 10px;
    }

    .text {
        text-align: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .table {
        width: 140px;
        margin: 200px auto;
    }
    
    .position{
        display: flex;
    }

    .flex {
        display: flex;
        margin-top: 70px;
    }

    .player-container {
        flex-grow: 1;
        min-width: 150px;
        width: 300px;
    }

    .comparebox {
        background-color: rgb(206, 206, 206);
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 20%;
        aspect-ratio: 1 / 1.3;
        transition: 0.3s;
    }

    .firstp1 {
        display: flex;
        font-size: 200px;
    }

    .firstp1:hover {
        color: white;
        background-color: black;
        cursor: pointer;
    }

    .secondp1 {
        font-size: 20px;
    }

    .firstp2 {
        display: flex;
        font-size: 200px;
    }

    .firstp2:hover {
        color: white;
        background-color: black;
        cursor: pointer;
    }

    .secondp2 {
        font-size: 20px;
    }

    select{
        text-align: center;
    }

    .reset {
        display: inline;
        width: 150px;
        height: 50px;
        background: #db4455;
        border-radius: 50px;
        border: 1px solid black;
        padding: 15px;
    }

    .reset:hover {
        cursor: pointer;
    }

    .NBAAverage {
        display: inline;
        width: 150px;
        height: 50px;
        background-color: #57bd85;
        border-radius: 50px;
        border: 1px solid black;
    }

    img{
        aspect-ratio: 1.3/1;
    }

    .space {
        padding: 15px;
        margin-right: 30px;
    }

    .NBAAverage:hover {
        cursor: pointer;
    }

    .font {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }

    .bigger {
        color: #db4455;
    }

    td {
        width: 150px;
    }

    .option {
        border: 1px solid black;
        background-color: rgb(229, 231, 235);
        text-align: center;
    }

    .distance {
        margin-top: 30px;
        min-width: 200px;
    }

    .center {
        display: flex;
        margin: 30px auto;
        line-height: 20px;
        text-align: center;
    }
</style>