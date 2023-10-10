<script lang="ts">
    import { SeasonArray, SeasonTypeArray } from "../data.js";

    /** @type {(string)[]} */
    let TableHeader = ['팀','게임수','승','패','승률','필드골 성공률(%)','3점 성공률(%)','자유투 성공률(%)'];
    /** @type {number} */
    const DefaultSortIndex = 2;  // '승', TableHeader 배열 인덱스
    const DefaultSortMethod = -1;  // 내림차순
    let SortIndex = DefaultSortIndex;  // 정렬할 TableHeader 배열 인덱스
    let SortMethod = DefaultSortMethod;  // 1 : 오름차순, -1 : 내림차순

    const ConferenceArray = ['East', 'West','All']; 
    let SelectedSeasonType = 'Regular Season'; 
    let SelectedConference = 'East';
    let SelectedSeason = '2022-23';

    let TableData: (number|string)[] [];

    /**
     * @param {[]}  a - TableData array value.
     * @param {[]}  b - TableData array value.
     * @return {number}
     */
    function CompareDescending(a:(number|string)[], b:(number|string)[]) {
        if(a[SortIndex] < b[SortIndex]) {
            return -1 * SortMethod;
        } else if(a[SortIndex] > b[SortIndex]){
            return 1 * SortMethod;
        } else{
            return 0;
        }
    }

    async function TeamRankingSearch() {
		const response = await fetch(`teamranking/api?Conference=${SelectedConference}&Season=${SelectedSeason}&SeasonType=${SelectedSeasonType}`);
		TableData = await response.json();

        // 데이터 조회 후 기본방식으로 정렬하기
        SortIndex = DefaultSortIndex;
        SortMethod = DefaultSortMethod;
        TableData.sort(CompareDescending);

        console.log(TableData);
	}

    const SetSortIndex = (HeaderName:string) => {
        //console.log(HeaderName);
        let index = TableHeader.indexOf(HeaderName);
        if(index < 0){
            SortIndex = DefaultSortIndex;
            SortMethod = DefaultSortMethod;
        }
        else{
            if(SortIndex === index){
                SortMethod *= -1;   //  정렬방식 변경
            }else{
                SortIndex = index;
            }
        }
        
        TableData = TableData.sort(CompareDescending);
    }
</script>

<body>
    <div class="pagenamecontainer">
        <div class="pagename">팀 순위</div>
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
            <div class="text">시즌연도</div>
            <select class="selectbox" bind:value={SelectedSeason}>
                {#each SeasonArray as Season}
                    <option value={Season}>
                        {Season}
                    </option>
                {/each}
            </select>
        </div>
        
        <div>
            <div class="text">컨퍼런스</div>
            <select class="selectbox" bind:value={SelectedConference}>
                {#each ConferenceArray as Conference}
                    <option value={Conference}>
                        {Conference}
                    </option>
                {/each}
            </select>
        </div>
    
        <div>
            <div class="text">시즌타입</div>
            <select class="selectbox" bind:value={SelectedSeasonType}>
                {#each SeasonTypeArray as SeasonType}
                    <option value={SeasonType}>
                        {SeasonType}
                    </option>
                {/each}
            </select>    
        </div>
    
        <button class="button" on:click={TeamRankingSearch}>조회하기</button>
    </div>
    
    {#if TableData !== undefined}
    <div class="groupbox2">
    <table>
        <thead>
            <tr>
                <th class="thcolor">순위</th>
                {#each TableHeader as HeaderName, ArrayIndex}
                    <th class="thcolor" on:click={()=> SetSortIndex(HeaderName)}>
                        {HeaderName}
                        {#if ArrayIndex === SortIndex && SortMethod === -1}
                            ⬇
                        {:else if ArrayIndex === SortIndex && SortMethod === 1}
                            ⬆
                        {/if}
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody>        
            {#each TableData as data, ArrayIndex}
                <tr>
                    <td>{ArrayIndex + 1}</td>
                    {#each TableHeader as _, ColIndex}
                        {#if ColIndex == 0}
                            <td class="teamname">
                                {#if SelectedSeasonType === "All Star"}
                                    <img src="/TeamLogo/{data[8]}.png" alt="TeamLogo" class="image" />
                                {:else}
                                    <img src="/TeamLogo/{data[8]}.svg" alt="TeamLogo" class="image" />
                                {/if}
                                <span>{data[ColIndex]}</span>
                            </td>
                        {:else if ColIndex === 4}
                            <td>{Number(data[ColIndex]).toFixed(3)}</td>
                        {:else if ColIndex == 5 || ColIndex == 6 || ColIndex == 7}
                            <td>{(Number(data[ColIndex])*100).toFixed(1)}</td>
                        {:else}
                            <td>{data[ColIndex]}</td>
                        {/if}   
                        
                    {/each}
                </tr>
            {/each}
        </tbody>
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
    
    .groupbox1{
        margin: 20px auto;
        padding: 20px 20px;
        width: 90%;
        display: flex;
        justify-content: center;
        background-color: white;
        border-radius: 10px;
    }

    .groupbox2{
        margin: 20px auto;
        padding: 20px auto;
        width: 90%;
        display: flex;
        justify-content: center;
        background-color: white;
        border-radius: 10px;
    }

    table {
        border-collapse: collapse;
        width: calc(100% - 40px);
        margin: 20px auto;
    }

    tr{
        transition: 0.3s;
    }

    tr:hover{
        background-color: rgb(229,231,235);
        cursor:pointer;
    }


    th {
        border: 1px solid black;
        height: 40px;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        min-width: 60px;
        transition: 0.3s;
    }

    td {
        border: 1px solid black;
        text-align: center;
        min-width: 60px;
        transition: 0.3s;
    }

    th:hover{
        background-color: rgb(190, 151, 9);
        cursor: pointer;
    }

    .thcolor{
        background-color: rgb(255, 201, 14);
        font-size: 18px;
    }

    .thcolor:hover{
        cursor: pointer;
    }

    .thcolor:active{
        cursor: pointer;
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
        /* border: 1px solid black; */
        color: white;
    }

    .button:hover {
        background-color: rgb(201, 115, 34);
    }


    select:hover{
        cursor: pointer;
    }

    select:active{
        cursor: pointer;
    }

    .image{
        display: inline;
        width: 40px;
        height: 40px;
        margin-right: 10px;
        margin-left: 5px;
    }

    .teamname{
        width: 250px;
        text-align: left;
    }

    .selectbox{
        min-width: 220px;
        background-color: rgb(229,231,235);
        border: 1px solid black;
        height: 45px;
        margin-left: 10px;
        border-radius: 20px;
        text-align: center;
    }

    .text{
        margin-left: 20px;
        margin-bottom: 5px;
        font-weight: bold;
    }

</style>
