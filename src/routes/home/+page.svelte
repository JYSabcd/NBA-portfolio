<script lang="ts">
    import { browser } from "$app/environment";
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
                    highlight: "purple",
                },
            },
            font: {
                regular: "1em",
                large: "22em",
            },
        },
    };

    let format = "YYYY-MM-DD";

    const DefaultSelectedDate = new Date(2023, 5, 12); // 월은 0부터 시작
    const DateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    let store;
    let selecteddate;

    $: {
        selecteddate = dayjs($store?.selected).format(format);
        GetSchedule();
        GetRankFromAPI();
    }

    let schedulearray = [];

    async function GetSchedule() {
        // As I load the data initially with PageServerLoad (https://kit.svelte.dev/docs/load#page-data), I for my part do not need to do a fetch in a svelte component while it is rendered server side. But I do need to do a fetch later on, which will only be on client side. My solution was to wrap it with the browser environment variable from sveltekit.

        // import { browser } from "$app/environment";

        // if (browser) {
        // const res = await fetch(
        //     // url
        // );
        // data = await res.json();
        // }
        // With this I did not get the error "Cannot use relative URL (...) with global fetch".

        // Just writing it as this may help some others reading this.

        if (!browser) {
            return;
        }

        const response = await fetch(
            `home/db/getschedule?SelectedDate=${selecteddate}`
        );
        //const response = await fetch(`teamranking/api?Conference=${'East'}&Season=${'2022-23'}&SeasonType=${'Regular Season'}`);
        schedulearray = await response.json();

        console.log(schedulearray);
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

    <div class="datepickercontainer">
        <Datepicker
            bind:store
            selected={DefaultSelectedDate}
            {theme}
            {format}
        />
        <!-- 
        - 달력이 Datepicker 아랫쪽에서 나오게 변경
        - 달력의 날짜칸에 경기 수가 함께 표시되게 수정
        - 가능하다면 경기 수가 0인 날짜는 클릭 안되게 처리
        -->
    </div>

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
        {$store?.selected.toLocaleDateString(undefined, DateOptions)}의 MVP
    </div>

    <div class="line">
        <div class="box mvpPT">
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
        <div class="box mvpREB">
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
        <div class="box mvpAST">
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
        <div class="box mvpBLK">
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
        <div class="box mvpSTL">
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
        <div class="box mvpFTP">
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
        overflow: auto;
        /* height: calc(100vh - 50px); */
        width: 100%;
        height: 100%;
        background-color: rgb(246, 246, 246);
    }

    .homeimage01 {
        width: 100%;
    }

    .datepickercontainer {
        display: grid;
        /* 달력이 Datepicker를 중심으로 커져서 윗쪽에 여유가 없으면 짤려서 표시된다.*/
        /* layout 뒤에 가려지지 않고 달력이 body 영역 안에서만 나오게 처리할수 있으면 좋겠다*/
        /* padding-top: 250px; */
        padding: 30px;
        justify-content: center;
    }

    .gameboardcontainer {
        display: flex;
        border: 1px solid black;
        border-radius: 5px;
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
        margin: 3%;

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
        font-size: 22px;
        font-weight: bold;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .box {
        width: 350px;
        height: 200px;
        margin: 30px auto;
        text-align: center;
        border-radius: 30px;
        border-radius: 50px;
        font-size: 18px;
    }

    .mvptitle {
        margin: 20px auto;
        width: 400px;
        height: 100px;
        line-height: 100px;
        font-family: "Inter";
        font-weight: bold;
        text-align: center;
        justify-content: center;
        font-size: 25px;
        background-color: #fccee2;
        border-radius: 20px;
    }

    .mvpPT {
        background: #fdb7ba;
    }

    .mvpREB {
        background: #f3cdad;
    }

    .mvpAST {
        background: #fcffb0;
    }

    .mvpBLK {
        background: #afffba;
    }

    .mvpSTL {
        background: #98bbeb;
    }

    .mvpFTP {
        background: #e2b9ff;
    }

    .ranktable {
        width: 90%;
        margin: 5px 5%;
    }
</style>
