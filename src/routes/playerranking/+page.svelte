<script lang="ts">
    import { SeasonArray, SeasonTypeArray } from "../data.js";

    /** @type {(string)[]} */
    let TableHeader = ['선수 이름','게임 수','출전시간','득점','리바운드','어시스트','스틸','블록','필드골(%)', '3점(%)', '자유투(%)'];
    /** @type {number} */
    const DefaultSortIndex = 3;  // '득점', TableHeader 배열 인덱스
    const DefaultSortMethod = -1;  // 내림차순
    let SortIndex = DefaultSortIndex;  // 정렬할 TableHeader 배열 인덱스
    let SortMethod = DefaultSortMethod;  // 1 : 오름차순, -1 : 내림차순

    let SelectedSeasonType = 'Regular Season' 
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

    async function PlayerRankingSearch() {
		const response = await fetch(`playerranking/api?Season=${SelectedSeason}&SeasonType=${SelectedSeasonType}`);
		TableData = await response.json();

        // 데이터 조회 후 기본방식으로 정렬하기
        SortIndex = DefaultSortIndex;
        SortMethod = DefaultSortMethod;
        TableData.sort(CompareDescending);

        console.log(TableData);
	}

    const SetSortIndex = (HeaderIndex:number) => {
        //console.log(HeaderIndex);
        if(HeaderIndex < 0){
            SortIndex = DefaultSortIndex;
            SortMethod = DefaultSortMethod;
        }
        else{
            if(SortIndex === HeaderIndex){
                SortMethod *= -1;   //  정렬방식 변경
            }else{
                SortIndex = HeaderIndex;
            }
        }
        
        TableData = TableData.sort(CompareDescending);
    }
</script>

<body>
    <div class="pagenamecontainer">
        <div class="pagename">개인 순위</div>
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

    <div class="groupbox1">
        <div>
            <div class="selectinformation">시즌 연도</div>
            <select class="selectbox" bind:value={SelectedSeason}>
                {#each SeasonArray as Season}
                    <option class="selected" value={Season}>
                        {Season}
                    </option>
                {/each}
            </select>
        </div>
    
        <div>
            <div class="selectinformation">시즌 타입</div>
            <select class="selectbox2" bind:value={SelectedSeasonType}>
                {#each SeasonTypeArray as SeasonType}
                    <option class="selected" value={SeasonType}>
                        {SeasonType}
                    </option>
                {/each}
            </select>    
        </div>
    
        <button class="button" on:click={PlayerRankingSearch}>조회하기</button>
    </div>
    
    {#if TableData !== undefined}
    <div class="groupbox2">
    <table>
        <thead>
            <tr>
                <th>순위</th>
                {#each TableHeader as HeaderName, ArrayIndex}
                    <th class="thminwidth" on:click={()=> SetSortIndex(ArrayIndex)}>
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
                                <img src="/TeamLogo/{data[11]}.svg" alt="TeamLogo" class="logoimage" />
                                <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/{data[12]}.png" onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'" alt="TeamLogo" class="playerimage" />
                                <span>{data[ColIndex]}</span>
                            </td>
                        {:else if ColIndex == 1}
                            <td>{data[ColIndex]}</td>
                        {:else if ColIndex >= 8}
                            <td>{(Number(data[ColIndex])*100).toFixed(1)}</td>
                        {:else if ColIndex !== 1}
                            <td>{Number(data[ColIndex]).toFixed(1)}</td>
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
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        background-color: rgb(255, 201, 14);
        transition: 0.3s;
    }

    .thminwidth{
        min-width: 80px;
    }

    td {
        border: 1px solid black;
        text-align: center;
        /* min-width: 60px; */
        transition: 0.3s;
    }

    td:nth-child(1) {
        width: 50px;
    }

    td:nth-child(n+3) {
        width: 50px;
    }

    th:hover{
        background-color: rgb(190, 151, 9);
        cursor: pointer;
    }

    .button {
        background-color: rgb(243, 139, 43);
        width: 150px;
        height: 45px;
        margin-top: 35px;
        margin-left: 50px;
        /* padding: 10px 30px; */
        border-radius: 10px;
        font-weight: bold;
        font-size: 23px;
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
    
    .logoimage{
        display: inline;
        width: 40px;
        height: 40px;
        margin-left: 5px;
    }

    .playerimage{
        display: inline;
        width: 40px;
        height: 40px;
        margin-right: 10px;
    }

    .teamname{
        width: 250px;
        text-align: left;
    }

    .selectbox {
        min-width: 220px;
        background-color: rgb(229, 231, 235);
        border: 1px solid black;
        margin-left: 20px;
        text-align: center;
        height: 45px;
        cursor: pointer;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
    }

    .selectbox2 {
        min-width: 280px;
        background-color: rgb(229, 231, 235);
        border: 1px solid black;
        margin-left: 20px;
        text-align: center;
        height: 45px;
        cursor: pointer;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
    }


    .selectinformation {
        margin-left: 30px;
        margin-bottom: 5px;
        font-size: 20px;
        font-weight: bold;
    }

    .selected {
        border: 1px solid black;
        font-size: 18px;
        cursor: pointer;
        background-color: white;
    }
        
</style>
