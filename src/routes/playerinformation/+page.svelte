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
    "New Orleans PelicaBHns",
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
    <div>
      <div class="text">다른 선수들</div>
        <table class="table">
          <tr class="th">
            <th class="border">이름</th>
            <th class="border">등번호 & 포지션</th>
            <th class="border">키</th>
            <th class="border">몸무게</th>
            <th class="border">나이</th>
            <th class="border">국적</th>
          </tr>
          <tr>
            <td class="border">aaaaa</td>
            <td class="border">1 & guard</td>
            <td class="border">1.90m (6`2")</td>
            <td class="border">84kg (185 lbs)</td>
            <td class="border">30세</td>
            <td class="border">그리스 (Greece)</td>
          </tr>
          <tr>
            <td class="border">bbbbb</td>
            <td class="border">3 & forward</td>
            <td class="border">2.00m (6`5")</td>
            <td class="border">95kg (209 lbs)</td>
            <td class="border">25세</td>
            <td class="border">미국 (USA)</td>
          </tr>
          <tr>
            <td class="border">xxxxx</td>
            <td class="border">7 & center</td>
            <td class="border">2.11m (6`11")</td>
            <td class="border">129kg (284lbs)</td>
            <td class="border">28세</td>
            <td class="border">캐나다 (Canada)</td>
          </tr>
        </table>
    </div>
  </div>

  <div class="groupbox3">
    <div class="name">Stephen Curry</div>
    <div class="image">
      <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png" alt="Player Headshot">
    </div>
  
    <table class="table">
      <tr class="th">
        <th class="border">경기 당 평균 득점</th>
        <th class="border">경기 당 평균 리바운드</th>
        <th class="border">경기 당 평균 어시스트</th>
        <th class="border">선수 공헌도 (PIE)</th>
      </tr>
      <tr>
        <td class="border">29.4</td>
        <td class="border">6.1</td>
        <td class="border">6.3</td>
        <td class="border">16.6</td>
      </tr>
    </table>

    <table class="table">
      <tr class="th">
        <th class="border">키</th>
        <th class="border">몸무게</th>
        <th class="border">국적</th>
        <th class="border">등번호 & 포지션</th>
      </tr>
      <tr>
        <td class="border">1.88m (6'2")</td>
        <td class="border">84kg (185lb)</td>
        <td class="border">미국 (USA)</td>
        <td class="border">30 & guard</td>
      </tr>
      <tr class="th">
        <th class="border">나이</th>
        <th class="border">생년원일</th>
        <th class="border">드래프트</th>
        <th class="border">경력</th>
      </tr>
      <tr>
        <td class="border">35세</td>
        <td class="border">1988년 7월 8일</td>
        <td class="border">2009 NBA 드래프트 1라운드 7순위</td>
        <td class="border">14년차</td>
      </tr>
    </table>
    
  </div>
 
</div>

<style>
  .text {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
  }

  .selectinformation {
    margin-bottom: 5px;
    font-weight: bold;
    text-align: center;
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

  .option {
    border: 1px solid black;
    cursor: pointer;
    background-color: rgb(229, 231, 235);
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

  .image {
    width: 500px;
    background-color: rgb(233, 196, 240);
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px  ;
  }

  .table {
    border-collapse: collapse;
    border: 1px solid black;
    margin: 30px auto;
    margin-bottom: 100px;
    width: 800px;
    height: 40px;
    line-height: 40px;
  }

  .border {
    border: 1px solid black;
    text-align: center;
  }

  .th {
    background-color: rgb(229, 231, 235);
  }

  .body {
    overflow: auto;
    height: calc(100vh - 50px);
    background-color: rgb(246, 246, 246);
  }

  .name {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
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
    display: flex;
    justify-content: center;
    background-color: white;
    border-radius: 20px;
    margin-bottom: 50px;
  }

  .groupbox3 {
    margin: 0px auto;
    margin-top: 30px;
    padding: 20px 20px;
    width: 90%;
    justify-content: center;
    background-color: white;
    border-radius: 20px;
    margin-bottom: 50px;
  }

  .selectinformation {
    margin-left: 10px;
    margin-bottom: 5px;
    margin-left: 20px;
    font-weight: bold;
  }
</style>
