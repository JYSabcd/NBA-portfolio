<script lang="ts">
    /** @type {(string)[]} */
    let TableHeader = ['팀','게임수','승','패','승률','필드골 성공률','3점 성공률','자유투 성공률'];
    /** @type {number} */
    const DefaultSortIndex = 2;  // '승', TableHeader 배열 인덱스
    const DefaultSortMethod = -1;  // 내림차순
    let SortIndex = DefaultSortIndex;  // 정렬할 TableHeader 배열 인덱스
    let SortMethod = DefaultSortMethod;  // 1 : 오름차순, 2 : 내림차순

    const ConferenceArray = ['East', 'West'];
    const SeasonArray = ['1996-97','1997-98','1998-99','1999-00','2000-01','2001-02','2002-03','2003-04','2004-05','2005-06',
    '2006-07','2007-08','2008-09','2009-10','2010-11','2011-12','2012-13','2013-14','2014-15','2015-16','2016-17','2017-18',
    '2018-19','2019-20','2020-21','2021-22','2022-23']
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
		const response = await fetch(`teamranking/api?Conference=${SelectedConference}&Season=${SelectedSeason}`);
		TableData = await response.json();

        // 데이터 조회 후 기본방식으로 정렬하기
        SortIndex = DefaultSortIndex;
        SortMethod = DefaultSortMethod;
        TableData.sort(CompareDescending);

        //console.log(TableData);
	}

    $: SetSortIndex = (HeaderName:string) => {
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

<select bind:value={SelectedSeason}>
    {#each SeasonArray as Season}
        <option value={Season}>
            {Season}
        </option>
    {/each}
</select>

<select bind:value={SelectedConference}>
    {#each ConferenceArray as Conference}
        <option value={Conference}>
            {Conference}
        </option>
    {/each}
</select>

<button class="button" on:click={TeamRankingSearch}>조회</button>

<table>
    {#if TableData !== undefined}
    <thead>
		<tr>
            <th class="thcolor">순위</th>
            {#each TableHeader as HeaderName}
                <th class="thcolor" on:click={SetSortIndex(HeaderName)}>{HeaderName}</th>
            {/each}
        </tr>
	</thead>
    <tbody>        
            {#each TableData as data, ArrayIndex}
                <tr>
                    <td>{ArrayIndex + 1}</td>
                    {#each TableHeader as _, ColIndex}
                        <td>{data[ColIndex]}</td>
                    {/each}
                </tr>
            {/each}
    </tbody>
    {/if}
</table>

<style>
    table {
        border-collapse: collapse;
        width: 80%;
    }

    th, td {
        border: 1px solid black;
        text-align: center;
        min-width: 50px;
    }

    .thcolor{
        background-color: lightgray;
    }

    .thcolor:hover{
        cursor: pointer;
    }

    .thcolor:active{
        cursor: pointer;
    }

    .button{
        background-color: rgb(121 207 159);
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 10%;
    }

    select:hover{
        cursor: pointer;
    }

    select:active{
        cursor: pointer;
    }
</style>
