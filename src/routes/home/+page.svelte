<script lang="ts">
    import { browser } from "$app/environment"; // browser가 열리기 전에 데이터들이 먼저 받아와져 작동 오류가 생기는 부분을 보완하기 위함이다. 아래 browser참고
    import { Datepicker } from "svelte-calendar";
    import dayjs from "dayjs";

    const theme = {
        calendar: {
            width: "500px",
            legend: {
                height: "45px",
            },
            shadow: "0px 0px 5px rgba(0, 0, 0, 0.25)",
            colors: {
                background: {
                    highlight: "rgb(243,139,43)",
                },
            },
            font: {
                regular: "1em",
                large: "22em",
            },
        },
    };

    let format = "YYYY-MM-DD";

    const DefaultSelectedDate = new Date(2023, 0, 1); // 월은 0부터 시작
    const DateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    let store;
    let selecteddate = DefaultSelectedDate;

    // 이 반응성 코드는 날짜가 변하는 걸 캐치해서 받아와 GetSchedule을 한번 더 돌리는 것이다.
    $: {
        selecteddate = dayjs($store?.selected).format(format);
        GetSchedule();
        // GetRankFromAPI();
    }

    //  Schedule 컬럼
    //  game_date,game_id,home_teamid,home_teamabbreviation,home_teamcityname,home_teamname,home_gamescore,away_teamid,away_teamabbreviation,away_teamcityname,away_teamname,away_gamescore
    let schedulearray = [];

    async function GetSchedule() {
        if (!browser) {
            return;
        }

        const response = await fetch(
            `home/db/getschedule?SelectedDate=${selecteddate}`
        );

        schedulearray = await response.json();

        console.log(schedulearray);

        GetRankFromAPI();
    }

    let RankAPIData: (number | string)[][];

    let RankArray_PTS: (number | string)[] = [];
    let RankArray_REB: (number | string)[] = [];
    let RankArray_AST: (number | string)[] = [];
    let RankArray_BLK: (number | string)[] = [];
    let RankArray_STL: (number | string)[] = [];
    let RankArray_FANTASY_PTS: (number | string)[] = [];

    function CompareDescending(a: (number | string)[], b: (number | string)[]) {
        if (a[0] < b[0]) {
            return -1;
        } else if (a[0] > b[0]) {
            return 1;
        } else {
            return 0;
        }
    }

    async function GetRankFromAPI() {
        if (!browser) {
            return;
        }

        const response = await fetch(
            `home/api/leaguedashplayerstats?DateFrom=${selecteddate}&DateTo=${selecteddate}`
        );

        RankAPIData = await response.json();

        let tempRankArray_PTS = [];
        let tempRankArray_REB = [];
        let tempRankArray_AST = [];
        let tempRankArray_BLK = [];
        let tempRankArray_STL = [];
        let tempRankArray_FANTASY_PTS = [];

        for (let i = 0; i < RankAPIData.length; i++) {
            //  PTS_RANK
            if (RankAPIData[i][5] <= 5) {
                tempRankArray_PTS.push([
                    RankAPIData[i][5],
                    RankAPIData[i][1],
                    RankAPIData[i][3],
                    RankAPIData[i][4],
                ]);
            }
            //  REB_RANK
            if (RankAPIData[i][7] <= 5) {
                tempRankArray_REB.push([
                    RankAPIData[i][7],
                    RankAPIData[i][1],
                    RankAPIData[i][3],
                    RankAPIData[i][6],
                ]);
            }
            //  AST_RANK
            if (RankAPIData[i][9] <= 5) {
                tempRankArray_AST.push([
                    RankAPIData[i][9],
                    RankAPIData[i][1],
                    RankAPIData[i][3],
                    RankAPIData[i][8],
                ]);
            }
            //  BLK_RANK
            if (RankAPIData[i][11] <= 5) {
                tempRankArray_BLK.push([
                    RankAPIData[i][11],
                    RankAPIData[i][1],
                    RankAPIData[i][3],
                    RankAPIData[i][10],
                ]);
            }
            //  STL_RANK
            if (RankAPIData[i][13] <= 5) {
                tempRankArray_STL.push([
                    RankAPIData[i][13],
                    RankAPIData[i][1],
                    RankAPIData[i][3],
                    RankAPIData[i][12],
                ]);
            }
            //  NBA_FANTASY_PTS_RANK
            if (RankAPIData[i][15] <= 5) {
                tempRankArray_FANTASY_PTS.push([
                    RankAPIData[i][15],
                    RankAPIData[i][1],
                    RankAPIData[i][3],
                    RankAPIData[i][14],
                ]);
            }
        }

        RankArray_PTS = tempRankArray_PTS.sort(CompareDescending).slice(0, 5);
        RankArray_REB = tempRankArray_REB.sort(CompareDescending).slice(0, 5);
        RankArray_AST = tempRankArray_AST.sort(CompareDescending).slice(0, 5);
        RankArray_BLK = tempRankArray_BLK.sort(CompareDescending).slice(0, 5);
        RankArray_STL = tempRankArray_STL.sort(CompareDescending).slice(0, 5);
        RankArray_FANTASY_PTS = tempRankArray_FANTASY_PTS.sort(CompareDescending).slice(0, 5);

        //console.log(RankAPIData);
    }
</script>

<body>
    <img src="/home_image01.jpg" alt="homeimage01" class="homeimage01" />

    <!-- <div class="description_calendar">&#60;조회하고 싶은 경기의 날짜로 변경해주세요.&#62;</div> -->
    <!-- <div class="description_calendar">조회하고 싶은 경기의 날짜로 변경해주세요.</div> -->

    <div class="datepickercontainer">
        <Datepicker bind:store let:key let:send let:receive selected={DefaultSelectedDate} {theme} {format}>
            <button class="button_calendar" in:receive|local={{ key }} out:send|local={{ key }}>
                {dayjs(selecteddate).format(format)}
            </button>
        </Datepicker>
    </div>

    <div class="description_calendar2">※ 조회하고 싶은 경기의 날짜로 변경해주세요.</div>

    <div class="gameboardcontainer">
        {#if schedulearray.length === 0}
            <div class="nogame">해당 일자에 경기가 없습니다.</div>
        {/if}
        {#each schedulearray as schedule, index}
            <div class="gameboard">
                <div class="gameteam">
                    <img
                        src="/TeamLogo/{schedule['home_teamid']}.svg"
                        alt="TeamLogo"
                        class="teamlogo"
                    />
                    <div class="teamname">{schedule["home_teamname"]}</div>
                </div>
                <div class="score">{schedule["home_gamescore"]}</div>
                <div class="vs">VS</div>
                <div class="score">{schedule["away_gamescore"]}</div>
                <div class="gameteam">
                    <img
                        src="/TeamLogo/{schedule['away_teamid']}.svg"
                        alt="TeamLogo"
                        class="teamlogo"
                    />
                    <div class="teamname">{schedule["away_teamname"]}</div>
                </div>
            </div>
        {/each}
    </div>

    <div class="mvptitle">
        {$store?.selected.toLocaleDateString(undefined, DateOptions)} TOP 5
    </div>

    <div class="line">
        <div class="box">
            <div class="title">득점</div>
            <table class="ranktable">
                {#each RankArray_PTS as Rank}
                    <tr>
                        <td>{Rank[0]}</td>
                        <td>{Rank[1]}</td>
                        <td>{Rank[2]}</td>
                        <td>{Rank[3]}</td>
                    </tr>
                {/each}
            </table>
        </div>
        <div class="box">
            <div class="title">리바운드</div>
            <table class="ranktable">
                {#each RankArray_REB as Rank}
                    <tr>
                        <td>{Rank[0]}</td>
                        <td>{Rank[1]}</td>
                        <td>{Rank[2]}</td>
                        <td>{Rank[3]}</td>
                    </tr>
                {/each}
            </table>
        </div>
        <div class="box">
            <div class="title">어시스트</div>
            <table class="ranktable">
                {#each RankArray_AST as Rank}
                    <tr>
                        <td>{Rank[0]}</td>
                        <td>{Rank[1]}</td>
                        <td>{Rank[2]}</td>
                        <td>{Rank[3]}</td>
                    </tr>
                {/each}
            </table>
        </div>
    </div>

    <div class="line">
        <div class="box">
            <div class="title">블록</div>
            <table class="ranktable">
                {#each RankArray_BLK as Rank}
                    <tr>
                        <td>{Rank[0]}</td>
                        <td>{Rank[1]}</td>
                        <td>{Rank[2]}</td>
                        <td>{Rank[3]}</td>
                    </tr>
                {/each}
            </table>
        </div>
        <div class="box">
            <div class="title">스틸</div>
            <table class="ranktable">
                {#each RankArray_STL as Rank}
                    <tr>
                        <td>{Rank[0]}</td>
                        <td>{Rank[1]}</td>
                        <td>{Rank[2]}</td>
                        <td>{Rank[3]}</td>
                    </tr>
                {/each}
            </table>
        </div>
        <div class="box">
            <div class="title">판타지 포인트</div>
            <table class="ranktable">
                {#each RankArray_FANTASY_PTS as Rank}
                    <tr>
                        <td>{Rank[0]}</td>
                        <td>{Rank[1]}</td>
                        <td>{Rank[2]}</td>
                        <td>{Rank[3]}</td>
                    </tr>
                {/each}
            </table>
        </div>
    </div>
</body>

<style>
    body {
        overflow: hidden;
        width: 100%;
        background-color: rgb(246, 246, 246);
    }

    .homeimage01 {
        width: 100%;
    }

    .description_calendar{
        width: 650px;
        height: 80px;
        line-height: 70px;
        border-radius: 20px;
        margin: 0 auto;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
        margin-top: 30px;
        margin-bottom: 20px;
        /* border: 4px solid rgb(255, 201, 14, 80%); */
        border: 5px solid rgb(243,139,43);
        color: black;
    }

    .description_calendar2{
        margin: 0 auto;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        /* border: 4px solid rgb(255, 201, 14, 80%); */
        /* border: 5px solid rgb(243,139,43); */
        color: black;
    }

    .datepickercontainer {
        display: grid;
        padding-top: 30px;
        justify-content: center;
    }
    
    .button_calendar {
        /* background-color: black; */
        background-color: rgb(243,139,43);
		color: white;
        font-weight: bold;
		border: 0;
		padding: 18px 30px;
		font-size: 25px;
		border-radius: 6px;
        /* border: 2px solid black; */
		cursor: pointer;
        width: 300px;
        border-radius: 20px;
	}

    .button_calendar:hover {
        background-color: rgb(201, 115, 34);
    }

    .gameboardcontainer {
        display: flex;
        border: 3px solid rgb(243,139,43);
        border-radius: 20px;
        flex-wrap: wrap;
        justify-content: space-between;
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
        width: 44%;
        height: 150px;
        border: 1px solid black;
        border-radius: 10px;
        margin: 2% 3% 1% 3%;
        display: flex;
        justify-content: space-around;
    }

    .gameteam {
        width: 25%;
        height: 90%;
        margin: auto 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .teamlogo {
        width: 70%;
    }
    .teamname {
        font-size: 15px;
        font-weight: bolder;
        text-align: center;
        width: 100%;
    }

    .score {
        width: 20%;
        font-size: 40px;
        text-align: center;
        margin: auto 0px;
    }

    .vs {
        font-size: 20px;
        margin: auto 0px;
    }

    .line {
        display: flex;
    }

    .title {
        font-size: 25px;
        font-weight: bold;
    }

    .box {
        width: 400px;
        height: 210px;
        margin: 20px auto;
        padding-bottom: 10px;
        text-align: center;
        border-radius: 50px;
        border: 4px solid rgb(255, 201, 14);
        font-size: 18px;
    }

    .mvptitle {
        margin: 20px auto;
        margin-top: 40px;
        width: 600px;
        height: 100px;
        line-height: 100px;
        font-family: "Inter";
        font-weight: bold;
        text-align: center;
        justify-content: center;
        font-size: 30px;
        background-color: black;
        color: white;
        border-radius: 20px;
    }
    .ranktable {
        width: 80%;
        margin: 5px auto;
    }
</style>
