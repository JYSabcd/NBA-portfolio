<script lang="ts">
  const SeasonArray = [
    "1996-97",
    "1997-98",
    "1998-99",
    "1999-00",
    "2000-01",
    "2001-02",
    "2002-03",
    "2003-04",
    "2004-05",
    "2005-06",
    "2006-07",
    "2007-08",
    "2008-09",
    "2009-10",
    "2010-11",
    "2011-12",
    "2012-13",
    "2013-14",
    "2014-15",
    "2015-16",
    "2016-17",
    "2017-18",
    "2018-19",
    "2019-20",
    "2020-21",
    "2021-22",
    "2022-23",
  ];

  const SeasontypeArray = [
    "Preseason",
    "Regular Season",
    "Playoffs",
    "All-Star",
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

  let SelectedSeason = "2022-23";

  let SelectedSeasontype = "Regular Season";

  let SelectedTeamname = "Atlanta Hawks";
</script>

<div class="body">
  <div class="groupbox1">
    <div>
      <div class="selectinformation">시즌연도</div>
      <select class="overflow selectbox" bind:value={SelectedSeason}>
        {#each SeasonArray as Season}
          <option class="option" value={Season}>
            {Season}
          </option>
        {/each}
      </select>
    </div>

    <div>
      <div class="selectinformation">시즌타입</div>
      <select class="overflow selectbox" bind:value={SelectedSeasontype}>
        {#each SeasontypeArray as Seasontype}
          <option class="option" value={Seasontype}>
            {Seasontype}
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

    <button class="search" on:click={() => alert("조회하기")}>
      조회하기
    </button>
  </div>

  <div class="groupbox2">
    <div class="name">Stephen Curry</div>
    <div class="image">
      <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png" alt="Player Headshot">
    </div>
  
    <table class="table">
      <tr class="th">
        <th class="border">나이</th>
        <th class="border">경기 당 평균 득점</th>
        <th class="border">경기 당 평균 리바운드</th>
        <th class="border">경기 당 평균 어시스트</th>
        <th class="border">선수 공헌도</th>
      </tr>
      <tr>
        <td class="border">31</td>
        <td class="border">25.3</td>
        <td class="border">12.5</td>
        <td class="border">10.2</td>
        <td class="border">15.8</td>
      </tr>
    </table>
    <img src="/Arrow/Arrow.png" alt="" class="arrow" />
  </div>

  <div class="groupbox2">
    <div class="text">내년 예측결과</div>
    <table class="table">
      <tr class="th">
        <th class="border">나이</th>
        <th class="border">경기 당 평균 득점</th>
        <th class="border">경기 당 평균 리바운드</th>
        <th class="border">경기 당 평균 어시스트</th>
        <th class="border">선수 공헌도</th>
      </tr>
      <tr>
        <td class="border">32</td>
        <td class="border">24.7</td>
        <td class="border">12.3</td>
        <td class="border">10.8</td>
        <td class="border">15.4</td>
      </tr>
    </table>
  </div>
</div>

<style>
  .body {
    overflow: auto;
    height: calc(100vh - 50px);
    background-color: rgb(246, 246, 246);
  }
  .overflow {
    height: 200px;
    width: 200px;
    overflow: auto;
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

  .image {
    width: 500px;
    background-color: rgb(233, 196, 240);
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px  ;
  }

  .table {
    border: 1px solid black;
    margin: 20px auto;
    width: 800px;
    height: 40px;
    line-height: 40px;
  }

  .border {
    border: 1px solid black;
    text-align: center;
  }

  th {
    background-color: rgb(229, 231, 235);
  }

  td {
    background-color: white;
  }

  .text {
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 5px;
    font-weight: bolder;
  }

  .arrow {
    display: inline-block;
    width: 100px;
    margin-top: 10px;
    margin-left: 46%;
    background-color: rgb(246, 246, 246);
  }

  .selectinformation {
    margin-left: 10px;
    margin-bottom: 5px;
    margin-left: 20px;
    font-weight: bold;
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

  .option {
    border: 1px solid black;
    cursor: pointer;
    background-color: rgb(229, 231, 235);
  }

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

  .groupbox2 {
    margin: 0px auto;
    margin-top: 30px;
    padding: 20px 20px;
    width: 90%;
    justify-content: center;
    background-color: white;
    border-radius: 20px;
    margin-bottom: 50px;
  }
  
  .name {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
</style>
