<script lang="ts">
    import { SeasonArray, TeamnameArray, TeamObj } from "../data.js";

    const PlayerCT_PlusButton = 0;
    const PlayerCT_Selecting = 1;
    const PlayerCT_Selected = 2;

    let PlayerCT1 = PlayerCT_PlusButton; //  Player Container Type 1
    let PlayerCT2 = PlayerCT_PlusButton; //  Player Container Type 2

    let IsAverageMode = false; //  false : 평균값 사용 안함, true : 평균값 사용 (Player2 정보에 평균값 표시)
    let IsSelectedSeason1Mode = false;

    let playerrosters1:(number|string)[] = []; //  api에서 얻어온 플레이어 리스트
    let playerrosters2:(number|string)[] = [];

    let PlayerData1:(number|string)[] = []; //  api에서 얻어온 선수 기록
    let PlayerData2:(number|string)[] = [];
    let Average:(number|string)[] = []; //  api에서 얻어온 한 시즌 선수들의 평균 (58경기 이상 선수만)

    //  큰 값의 색을 바꿔주기위해서 td 들의 bind:this 를 저장한다.
    let PlayerDataTD1:any[] = []; //  td array
    let PlayerDataTD2:any[] = []; //  td array
    let AverageDataTD2:any[] = []; //  td array

    let SelectedSeason1 = "";
    let SelectedTeamname1 = "";
    let SelectedPlayerInfo1:(number|string)[] = []; //  ["PlayerName", PlayerID]

    let SelectedSeason2 = "";
    let SelectedTeamname2 = "";
    let SelectedPlayerInfo2:(number|string)[] = []; //  ["PlayerName", PlayerID]

    async function ChangeRoster1() {
        if (SelectedTeamname1 === "" || SelectedSeason1 === "") {
            return;
        }

        playerrosters1 = [];

        let TeamID1 = TeamObj[SelectedTeamname1]["TeamID"];
        const response1 = await fetch(
            `https://nba-project.kro.kr:3000/compareplayer/api/playerrosters?Season=${SelectedSeason1}&TeamID=${TeamID1}`
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
            `https://nba-project.kro.kr:3000/compareplayer/api/playerrosters?Season=${SelectedSeason2}&TeamID=${TeamID2}`
        );
        playerrosters2 = await response2.json();
    }

    async function PlayerDataLoading1() {
        const response3 = await fetch(
            `https://nba-project.kro.kr:3000/compareplayer/api/playerstats?Season=${SelectedSeason1}&PlayerID=${SelectedPlayerInfo1[1]}`
        );
        PlayerData1 = await response3.json();

        //  두 선수 스텟중 큰 값을 빨간색으로 변경하기
        let Data2 = [];
        let TD2 = [];
        if (IsAverageMode === false) {
            Data2 = PlayerData2;
            TD2 = PlayerDataTD2;
        } else {
            Data2 = Average;
            TD2 = AverageDataTD2;
        }

        for (let i = 0; i < PlayerDataTD1.length; i++) {
            if (Data2[i] !== undefined) {
                if (PlayerData1[i] > Data2[i]) {
                    PlayerDataTD1[i].style.color = "#db4455";
                    TD2[i].style.color = "black";
                } else if (PlayerData1[i] < Data2[i]) {
                    PlayerDataTD1[i].style.color = "black";
                    TD2[i].style.color = "#db4455";
                } else {
                    //  같으면
                    PlayerDataTD1[i].style.color = "black";
                    TD2[i].style.color = "black";
                }
            } else {
                PlayerDataTD1[i].style.color = "black";
            }
        }
    }

    async function PlayerDataLoading2() {
        const response4 = await fetch(
            `compareplayer/api/playerstats?Season=${SelectedSeason2}&PlayerID=${SelectedPlayerInfo2[1]}`
        );
        PlayerData2 = await response4.json();

        //  두 선수 스텟중 큰 값을 빨간색으로 변경하기
        for (let i = 0; i < PlayerDataTD1.length; i++) {
            if (PlayerData1[i] !== undefined) {
                if (PlayerData1[i] > PlayerData2[i]) {
                    PlayerDataTD1[i].style.color = "#db4455";
                    PlayerDataTD2[i].style.color = "black";
                } else if (PlayerData1[i] < PlayerData2[i]) {
                    PlayerDataTD1[i].style.color = "black";
                    PlayerDataTD2[i].style.color = "#db4455";
                } else {
                    //  같으면
                    PlayerDataTD1[i].style.color = "blue";
                    PlayerDataTD2[i].style.color = "blue";
                }
            } else {
                PlayerDataTD2[i].style.color = "black";
            }
        }
    }

    async function Averagebutton() {
        if (PlayerCT1 !== PlayerCT_Selected) {
            alert("첫 번째 선수를 먼저 골라주세요");
            return;
        }

        Reset2(); //  평균값은 플레이어2에 적용되므로 기존에 선택된 값이 있다면 초기화 시킨다.

        const response5 = await fetch(
            `compareplayer/api/playerstatsaverage?Season=${SelectedSeason1}`
        );
        IsAverageMode = true;
        Average = await response5.json();

        //  두 선수 스텟중 큰 값을 빨간색으로 변경하기
        for (let i = 0; i < PlayerDataTD1.length; i++) {
            if (PlayerData1[i] !== undefined) {
                if (PlayerData1[i] > Average[i]) {
                    PlayerDataTD1[i].style.color = "#db4455";
                    AverageDataTD2[i].style.color = "black";
                } else if (PlayerData1[i] < Average[i]) {
                    PlayerDataTD1[i].style.color = "black";
                    AverageDataTD2[i].style.color = "#db4455";
                } else {
                    //  같으면
                    PlayerDataTD1[i].style.color = "blue";
                    AverageDataTD2[i].style.color = "blue";
                }
            } else {
                AverageDataTD2[i].style.color = "black";
            }
        }
    }

    function Selecting1() {
        PlayerCT1 = PlayerCT_Selecting;
    }

    function Selecting2() {
        PlayerCT2 = PlayerCT_Selecting;

        IsAverageMode = false;
    }

    function Selected1() {
        console.log(SelectedSeason1, SelectedTeamname1, SelectedPlayerInfo1[0]);

        if (SelectedSeason1 === undefined || SelectedSeason1 === "") {
            alert("시즌을 선택해 주세요.");
            return;
        }

        if (SelectedTeamname1 === undefined || SelectedTeamname1 === "") {
            alert("팀을 선택해 주세요.");
            return;
        }

        if (
            SelectedPlayerInfo1[0] === undefined ||
            SelectedPlayerInfo1[0] === ""
        ) {
            alert("선수를 선택해 주세요.");
            return;
        }

        PlayerCT1 = PlayerCT_Selected;
        PlayerDataLoading1();
    }

    function Selected2() {
        if (SelectedSeason2 === undefined || SelectedSeason2 === "") {
            alert("시즌을 선택해 주세요.");
            return;
        }

        if (SelectedTeamname2 === undefined || SelectedTeamname2 === "") {
            alert("팀을 선택해 주세요.");
            return;
        }

        if (
            SelectedPlayerInfo2[0] === undefined ||
            SelectedPlayerInfo2[0] === ""
        ) {
            alert("선수를 선택해 주세요.");
            return;
        }

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

        if (IsAverageMode === true) {
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

<body>
    <div class="pagenamecontainer">
        <div class="pagename">선수 비교하기</div>
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
        </div>
    </div>

    <div class="white">
        <div class="compareboxcontainer">
            <div class="player-container">
                <div class="playername">
                    선수 이름
                </div>
                <div class="playername2">
                    {SelectedPlayerInfo1[0]
                        ? SelectedPlayerInfo1[0]
                        : "---"}
                </div>

                {#if PlayerCT1 === PlayerCT_PlusButton}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="comparebox firstp1" on:click={Selecting1}>
                        <div class="PlusText">+</div>
                    </div>
                {:else if PlayerCT1 === PlayerCT_Selecting}
                    <div class="comparebox secondp1">
                        <div class="SelectGroup">
                            <div class="head">시즌 연도</div>
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
                        <div class="SelectGroup">
                            <div class="head">팀 이름</div>
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
                        <div class="SelectGroup">
                            <div class="head">선수 로스터</div>
                            {#if playerrosters1.length === 0}
                                <select>
                                    <option value="" hidden selected>
                                        팀 연도를 먼저 선택해주세요.
                                    </option>
                                </select>
                            {:else}
                                <select bind:value={SelectedPlayerInfo1}>
                                    <option value="" hidden selected>
                                        선수를 선택해 주세요.
                                    </option>
                                    {#each playerrosters1 as playerinfo}
                                        <option class="option" value={playerinfo}>
                                            {playerinfo[0]}
                                        </option>
                                    {/each}
                                </select>
                            {/if}
                        </div>
                        <button
                            class="SearchButton SelectGroup"
                            on:click={Selected1}
                            >조회하기
                        </button>
                    </div>
                {:else if PlayerCT1 === PlayerCT_Selected}
                    <div class="comparebox thirdp1">
                        <img
                            src="https://cdn.nba.com/headshots/nba/latest/1040x760/{SelectedPlayerInfo1[1]}.png"
                            alt="Player Headshot"
                        />

                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="reset2" on:click={Reset1}>선수 초기화</div>
                    </div>
                {/if}
            </div>

            <div class="position">
                <table class="table">
                    <tbody class="font">
                        <tr>
                            <td bind:this={PlayerDataTD1[0]}>{PlayerData1[0] !== undefined ? PlayerData1[0] : "--"}</td>
                        </tr>
                        <tr>
                            <td bind:this={PlayerDataTD1[1]}>{PlayerData1[1] !== undefined ? PlayerData1[1] : "--"}</td>
                        </tr>
                        <tr>
                            <td bind:this={PlayerDataTD1[2]}>{PlayerData1[2] !== undefined ? PlayerData1[2] : "--"}</td>
                        </tr>
                        <tr>
                            <td bind:this={PlayerDataTD1[3]}>{PlayerData1[3] !== undefined ? PlayerData1[3] : "--"}</td>
                        </tr>
                        <tr>
                            <td bind:this={PlayerDataTD1[4]}>{PlayerData1[4] !== undefined ? PlayerData1[4] : "--"}</td>
                        </tr>
                        <tr>
                            <td bind:this={PlayerDataTD1[5]}>{PlayerData1[5] !== undefined ? PlayerData1[5] : "--"}</td>
                        </tr>
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
                            <tr>
                                <td bind:this={AverageDataTD2[0]}>{Average[0] !== undefined ? Average[0] : "--"}</td>
                            </tr>
                            <tr>
                                <td bind:this={AverageDataTD2[1]}>{Average[1] !== undefined ? Average[1] : "--"}</td>
                            </tr>
                            <tr>
                                <td bind:this={AverageDataTD2[2]}>{Average[2] !== undefined ? Average[2] : "--"}</td>
                            </tr>
                            <tr>
                                <td bind:this={AverageDataTD2[3]}>{Average[3] !== undefined ? Average[3] : "--"}</td>
                            </tr>
                            <tr>
                                <td bind:this={AverageDataTD2[4]}>{Average[4] !== undefined ? Average[4] : "--"}</td>
                            </tr>
                            <tr>
                                <td bind:this={AverageDataTD2[5]}>{Average[5] !== undefined ? Average[5] : "--"}</td>
                            </tr>
                        </tbody>
                    </table>
                {:else}
                    <table class="table">
                        <tbody class="font">
                            <tr>
                                <td bind:this={PlayerDataTD2[0]}>{PlayerData2[0] !== undefined ? PlayerData2[0] : "--"}</td>
                            </tr>
                            <tr>
                                <td bind:this={PlayerDataTD2[1]}>{PlayerData2[1] !== undefined ? PlayerData2[1] : "--"}</td>
                            </tr>
                            <tr>
                                <td bind:this={PlayerDataTD2[2]}>{PlayerData2[2] !== undefined ? PlayerData2[2] : "--"}</td>
                            </tr>
                            <tr>
                                <td bind:this={PlayerDataTD2[3]}>{PlayerData2[3] !== undefined ? PlayerData2[3] : "--"}</td>
                            </tr>
                            <tr>
                                <td bind:this={PlayerDataTD2[4]}>{PlayerData2[4] !== undefined ? PlayerData2[4] : "--"}</td>
                            </tr>
                            <tr>
                                <td bind:this={PlayerDataTD2[5]}>{PlayerData2[5] !== undefined ? PlayerData2[5] : "--"}</td>
                            </tr>
                        </tbody>
                    </table>
                {/if}
            </div>

            <div class="player-container">
                {#if IsAverageMode === true}
                    {#if SelectedSeason1 !== ""}
                        <div class="playername">
                            선수 이름
                        </div>
                        <div class="playername3">
                            {SelectedSeason1}년도 평균 기록
                        </div>
                        
                        <div class="comparebox thirdp2">
                            <img src="/NBA-Average-Logo.png" alt="NBA logo" />

                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div class="reset2" on:click={Reset2}>선수 초기화</div>
                        </div>
                        
                    {:else}
                        <div class="playername">
                            선수 이름
                        </div>
                        <div class="playername2">
                            {SelectedPlayerInfo2[0]
                                ? SelectedPlayerInfo2[0]
                                : "---"}
                        </div>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="comparebox firstp2" on:click={Selecting2}>
                            <div class="PlusText">+</div>
                        </div>
                    {/if}
                {:else}
                    <div class="playername">
                        선수 이름
                    </div>
                    <div class="playername2">
                        {SelectedPlayerInfo2[0]
                            ? SelectedPlayerInfo2[0]
                            : "---"}
                    </div>
                    {#if PlayerCT2 === PlayerCT_PlusButton}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div class="comparebox firstp2" on:click={Selecting2}>
                            <div class="PlusText">+</div>

                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div class="NBAAverage" on:click|stopPropagation={Averagebutton}>
                                NBA 평균
                            </div>
                        </div>
                    {:else if PlayerCT2 === PlayerCT_Selecting}
                        <div class="comparebox secondp2">
                            <div class="SelectGroup">
                                <div class="head">시즌 연도</div>
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
                            <div class="SelectGroup">
                                <div class="head">팀 이름</div>
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
                            <div class="SelectGroup">
                                <div class="head">선수 로스터</div>
                                {#if playerrosters2.length === 0}
                                    <select>
                                        <option value="" hidden selected>
                                            팀 연도를 먼저 선택해 주세요.
                                        </option>
                                    </select>
                                {:else}
                                    <select bind:value={SelectedPlayerInfo2}>
                                        <option value="" hidden selected>
                                            선수를 선택해 주세요.
                                        </option>
                                        {#each playerrosters2 as playerinfo}
                                            <option
                                                class="option"
                                                value={playerinfo}
                                            >
                                                {playerinfo[0]}
                                            </option>
                                        {/each}
                                    </select>
                                {/if}
                            </div>

                            <button
                                class="SearchButton SelectGroup"
                                on:click={Selected2}
                                >조회하기
                            </button>
                        </div>
                    {:else if PlayerCT2 === PlayerCT_Selected}
                        <div class="comparebox thirdp2">
                            <img
                                src="https://cdn.nba.com/headshots/nba/latest/1040x760/{SelectedPlayerInfo2[1]}.png"
                                alt="Player Headshot"
                            />

                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div class="reset2" on:click={Reset2}>선수 초기화</div>
                        </div>
                    {/if}
                {/if}
            </div>
        </div>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="resetAll" on:click={ResetAll}>전체 선수 초기화</div>
    </div>
</body>

<style>
    body {
        /* overflow: hidden; */
        width: 100%;
        background-color: rgb(246, 246, 246);
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

    .white {
        margin: 30px auto;
        padding: 0px 20px;
        padding-bottom: 50px;
        width: 90%;
        background-color: white;
        border-radius: 20px;
    }

    .compareboxcontainer {
        display: flex;
        margin: 50px 0px;
    }

    .playername{
        width: 300px;
        height: 40px;
        line-height: 40px;
        background: black;
        color: white;
        border-radius: 10px;
        font-weight: bold;
        text-align: center;
        font-size: 18px;
        margin: 20px auto;
        margin-top: 40px;
    }

    .playername2 {
        margin: 0px auto;
        margin-bottom: 20px;
        text-align: center;
        font-size: 28px;
        font-weight: bold;
    }

    .playername3 {
        margin: 0px auto;
        margin-bottom: 20px;
        line-height: 42px;
        text-align: center;
        font-size: 25px;
        font-weight: bold;
    }

    .table {
        width: 140px;
        margin: 0px auto;
        margin-top: 150px;
    }

    .position {
        display: flex;
    }

    .player-container {
        flex-grow: 1;
        width: 350px;
    }

    .head {
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 5px;
    }

    .comparebox {
        width: 350px;
        aspect-ratio: 1 / 1.3;
        background-color: rgb(255, 201, 14);
        border-radius: 30px;
        transition: 0.3s;
    }

    .firstp1 {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .firstp1:hover {
        color: black;
        background-color: rgb(190, 151, 9);
        cursor: pointer;
    }

    .firstp2 {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .firstp2:hover {
        color: black;
        background-color: rgb(190, 151, 9);
        cursor: pointer;
    }

    .PlusText {
        display: inline-block;
        font-size: 200px;
        height: 150px;
        line-height: 100px;
    }

    .secondp1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .secondp2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .thirdp1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .thirdp2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .SelectGroup {
        text-align: center;
    }

    select {
        text-align: center;
        min-width: 300px;
    }

    .resetAll {
        width: 400px;
        height: 60px;
        line-height: 60px;
        background: black;
        color: rgb(255, 201, 14);
        /* color: white; */
        border-radius: 20px;
        font-weight: bold;
        text-align: center;
        font-size: 25px;
        margin: 0 auto;
    }

    .resetAll:hover {
        background: rgb(80, 80, 80);
        cursor: pointer;
    }

    .reset2 {
        margin: 30px auto;
        width: 170px;
        height: 60px;
        line-height: 60px;
        background: black;
        color: white;
        border-radius: 20px;
        font-weight: bold;
        text-align: center;
        font-size: 20px;
    }

    .reset2:hover {
        background: rgb(80, 80, 80);
        cursor: pointer;
    }

    .NBAAverage {
        width: 170px;
        height: 60px;
        line-height: 60px;
        background-color: rgb(243, 139, 43);
        color: white;
        border-radius: 15px;
        font-weight: bold;
        text-align: center;
        font-size: 20px;
        position: absolute;
        top: 350px;
        left: 90px;
    }

    .NBAAverage:hover {
        background-color: rgb(201, 115, 34);
        cursor: pointer;
    }

    .SearchButton {
        display: inline;
        width: 250px;
        height: 60px;
        background-color: rgb(243, 139, 43);
        color: white;
        border-radius: 20px;
        font-weight: bold;
        font-size: 25px;
    }

    .SearchButton:hover {
        background-color: rgb(201, 115, 34);
        cursor: pointer;
    }

    img {
        aspect-ratio: 1.3/1;
    }

    .font {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }
    
    tr {
        height: 10px;
    }

    td {
        width: 150px;
    }

    .option {
        border: 1px solid black;
        background-color: rgb(229, 231, 235);
        text-align: center;
    }
</style>
