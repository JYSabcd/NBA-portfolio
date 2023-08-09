<script lang="ts">
    const PlayerCT_PlusButton = 0;
    const PlayerCT_Selecting = 1;
    const PlayerCT_Selected = 2;

    let PlayerCT1 = PlayerCT_PlusButton; //  Player Container Type 1
    let PlayerCT2 = PlayerCT_PlusButton; //  Player Container Type 2

    let Player1_Name = "";
    let Player2_Name = "";

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

    let playerrosters1 = [
        []
    ];

    let playerrosters2 = [
        []
    ];


    let SelectedSeason1 = "";
    let SelectedTeamname1 = "";
    let SelectedPlayerRosters1 = "";

    let SelectedSeason2 = "";
    let SelectedTeamname2 = "";
    let SelectedPlayerRosters2 = "";

    async function ChangeTeam1() {
        let TeamID1 = TeamObj[SelectedTeamname1]["TeamID"];
        let TeamID2 = TeamObj[SelectedTeamname2]["TeamID"];


        const response1 = await fetch(`compareplayer/api/playerrosters?Season=${SelectedSeason1}&TeamID=${TeamID1}`);
        const response2 = await fetch(`compareplayer/api/playerrosters?Season=${SelectedSeason2}&TeamID=${TeamID2}`);
		
        playerrosters1 = await response1.json();
        playerrosters2 = await response2.json();
    }
</script>

<div class="body">
    <div class="white">
        <div class="button">
            <div
                class="NBAavarage circle"
                on:click={() => alert("이 선수를 NBA 평균과 비교하시겠습니까?")}
            >
                NBA 평균
            </div>
            <div
                class="reset"
                on:click={() => {
                    PlayerCT1 = PlayerCT_PlusButton;
                    Player1_Name = "";
                    PlayerCT2 = PlayerCT_PlusButton;
                    Player2_Name = "";
                }}
            >
                선수 초기화
            </div>
        </div>

        <div class="flex">
            <div class="player-container">
                <div class="text">선수1 이름 : {Player1_Name}</div>

                {#if PlayerCT1 === PlayerCT_PlusButton}
                    <div
                        class="comparebox firstp1"
                        on:click={() => (PlayerCT1 = PlayerCT_Selecting)}
                    >
                        +
                    </div>
                {:else if PlayerCT1 === PlayerCT_Selecting}
                    <div class="comparebox secondp1">
                        <div class="distance">
                            <div>시즌연도</div>
                            <select bind:value={SelectedSeason1}>
                                <option value="" hidden selected>연도를 선택해주세요</option>
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
                                on:change={ChangeTeam1}
                            >
                            <option value="" hidden selected>팀을 선택해주세요</option>
                                {#each TeamnameArray as teamname}
                                    <option class="option" value={teamname}>
                                        {teamname}
                                    </option>
                                {/each}
                            </select>
                        </div>
                        <div class="distance">
                            <div>선수 로스터</div>
                            <select bind:value={SelectedPlayerRosters1}>
                                <option value="" hidden selected>팀 연도를 먼저 선택해주세요</option>
                                {#each playerrosters1 as playerroster1}
                                    <option
                                        class="option"
                                        value={playerroster1[0]}
                                    >
                                        {playerroster1[0]}
                                    </option>
                                {/each}
                            </select>
                        </div>
                        <button
                            class="NBAavarage distance"
                            on:click={() => {
                                PlayerCT1 = PlayerCT_Selected;
                                Player1_Name = "Stephen Curry";
                            }}>조회하기</button
                        >
                    </div>
                {:else if PlayerCT1 === PlayerCT_Selected}

                    <img
                        src="https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png"
                        alt="Player Headshot"
                    />
                    
                    <div
                        class="reset center"
                        on:click={() => {
                            PlayerCT1 = PlayerCT_PlusButton;
                            Player1_Name = "";
                        }}
                    >
                        선수1 초기화
                    </div>
                {/if}
            </div>

            <div>
                <table class="table">
                    <tbody class="font">
                        <tr>
                            <td class="bigger">34.7</td>
                            <td>평균 출전 시간</td>
                            <td>34.6</td>
                        </tr>
                        <tr>
                            <td class="bigger">29.4</td>
                            <td>평균 득점</td>
                            <td>27.8</td>
                        </tr>
                        <tr>
                            <td class="bigger">6.1</td>
                            <td>평균 리바운드</td>
                            <td>4.5</td>
                        </tr>
                        <tr>
                            <td class="bigger">6.3</td>
                            <td>평균 어시스트</td>
                            <td>5.5</td>
                        </tr>
                        <tr>
                            <td>0.9</td>
                            <td>평균 스틸</td>
                            <td class="bigger">1.0</td>
                        </tr>
                        <tr>
                            <td class="bigger">0.4</td>
                            <td>평균 블록</td>
                            <td>0.3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="player-container">
                <div class="text">선수2 이름 : {Player2_Name}</div>

                {#if PlayerCT2 === PlayerCT_PlusButton}
                    <div>
                        <div
                            class="comparebox firstp2"
                            on:click={() => (PlayerCT2 = PlayerCT_Selecting)}
                        >
                            +
                        </div>
                    </div>
                {:else if PlayerCT2 === PlayerCT_Selecting}
                    <div>
                        <div class="comparebox secondp2">
                            <div class="distance">
                                <div>시즌연도</div>
                                <select bind:value={SelectedSeason2}>
                                    <option value="" hidden selected>연도를 선택해주세요</option>
                                    {#each SeasonArray as Season}
                                        <option class="option" value={Season}>
                                            {Season}
                                        </option>
                                    {/each}
                                </select>
                            </div>
                            <div class="distance">
                                <div>팀이름</div>
                                <select bind:value={SelectedTeamname2}>
                                    <option value="" hidden selected>팀을 선택해주세요</option>
                                    {#each TeamnameArray as teamname}
                                        <option class="option" value={teamname}>
                                            {teamname}
                                        </option>
                                    {/each}
                                </select>
                            </div>
                            <div class="distance">
                                <div>선수 로스터</div>
                                <select bind:value={SelectedPlayerRosters2}>
                                    <option value="" hidden selected>팀 연도를 먼저 선택해주세요</option>
                                    {#each playerrosters2 as playerroster2}
                                        <option
                                            class="option"
                                            value={playerroster2[0]}
                                        >
                                            {playerroster2[0]}
                                        </option>
                                    {/each}
                                </select>
                            </div>
                            <button
                                class="NBAavarage distance"
                                on:click={() => {
                                    PlayerCT2 = PlayerCT_Selected;
                                    Player2_Name = "Devin Booker";
                                }}>조회하기</button
                            >
                        </div>
                    </div>
                {:else if PlayerCT2 === PlayerCT_Selected}
                    <div>
                        <img
                            src="https://cdn.nba.com/headshots/nba/latest/1040x760/1626164.png"
                            alt="Player Headshot"
                        />
                    </div>
                    <div
                        class="reset center"
                        on:click={() => {
                            PlayerCT2 = PlayerCT_PlusButton;
                            Player2_Name = "";
                        }}
                    >
                        선수2 초기화
                    </div>
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
        width: 420px;
        margin: 200px auto;
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

    .reset {
        display: inline;
        justify-content: center;
        width: 150px;
        height: 50px;
        line-height: 50px;
        background: #db4455;
        border-radius: 50px;
        border: 1px solid black;
        padding: 15px;
    }

    .reset:hover {
        cursor: pointer;
    }

    .reset:active {
        cursor: wait;
    }

    .NBAavarage {
        display: inline;
        justify-content: center;
        width: 150px;
        height: 50px;
        line-height: 50px;
        background-color: #57bd85;
        border-radius: 50px;
        border: 1px solid black;
    }

    .circle {
        padding: 15px;
        margin-right: 30px;
    }

    .NBAavarage:hover {
        cursor: pointer;
    }

    .NBAavarage:active {
        cursor: wait;
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
    }
</style>
