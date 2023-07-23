<script lang="ts">
    /** @type {(string)[]} */
    let TableHeader = ['선수이름','게임 수','출전 시간','득점','리바운드','어시스트','스틸','블록','야투 성공률(%)', '3점 성공률(%)', '자유투 성공률(%)'];
    /** @type {number} */
    const DefaultSortIndex = 3;  // '득점', TableHeader 배열 인덱스
    const DefaultSortMethod = -1;  // 내림차순
    let SortIndex = DefaultSortIndex;  // 정렬할 TableHeader 배열 인덱스
    let SortMethod = DefaultSortMethod;  // 1 : 오름차순, -1 : 내림차순

    const SeasonArray = ['1996-97','1997-98','1998-99','1999-00','2000-01','2001-02','2002-03','2003-04','2004-05','2005-06',
    '2006-07','2007-08','2008-09','2009-10','2010-11','2011-12','2012-13','2013-14','2014-15','2015-16','2016-17','2017-18',
    '2018-19','2019-20','2020-21','2021-22','2022-23'];
    const SeasonTypeArray = ['Regular Season', 'Playoffs', 'All Star']; 
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
		const response = await fetch(`personalranking/api?Season=${SelectedSeason}&SeasonType=${SelectedSeasonType}`);
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

<body class="body">
    
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
            <div class="text">시즌타입</div>
            <select class="selectbox" bind:value={SelectedSeasonType}>
                {#each SeasonTypeArray as SeasonType}
                    <option value={SeasonType}>
                        {SeasonType}
                    </option>
                {/each}
            </select>    
        </div>
    
        <button class="button" on:click={PlayerRankingSearch}>조회하기</button>
    </div>
    
    <div class="groupbox2">
    <table>
        {#if TableData !== undefined}
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
                                    <img src="/TeamLogo/{data[11]}.svg" alt="TeamLogo" class="image" />
                                {:else}
                                    <img src="/TeamLogo/{data[11]}.svg" alt="TeamLogo" class="image" />
                                {/if}
                                <span>{data[ColIndex]}</span>
                            </td>
                        {:else if ColIndex == 1}
                            <td>{data[ColIndex]}</td>
                        {:else if ColIndex == 8 || ColIndex == 9 || ColIndex == 10}
                            <td>{(Number(data[ColIndex])*100).toFixed(1)}</td>
                        {:else if ColIndex !== 1}
                            <td>{Number(data[ColIndex]).toFixed(1)}</td>
                        {/if}   
                        
                    {/each}
                </tr>
            {/each}
        </tbody>
        {/if}
    </table>
    </div>
</body>

<style>
    body{
        width: 100%;
        height: 100%;
        padding-top: 20px;
        background-color: rgb(246, 246, 246)
    }
    
    .groupbox1{
        margin: 0px auto;
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
        background-color: #D0E3ED;
        cursor:pointer;
    }


    th, td {
        border: 1px solid black;
        text-align: center;
        min-width: 60px;
        transition: 0.3s;
    }

    th:hover{
        background-color: #D0E3ED;
    }

    .thcolor{
        background-color: rgb(229,231,235);
    }

    .thcolor:hover{
        cursor: pointer;
    }

    .thcolor:active{
        cursor: pointer;
    }

    .button{
        background-color: rgb(121 207 159);
        width: 130px;
        height: 50px;
        margin-top: 20px;
        margin-left: 50px;
        padding: 10px;
        padding-left: 30px;
        padding-right: 30px;
        border-radius: 15px;
        border: 1px solid black;
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
        margin-left: 10px;
        margin-bottom: 5px;
        font-weight: bold;
    }

    .body{
        overflow: auto;
        height: calc(100vh - 50px);
    }
    
</style>
