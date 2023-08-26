<script lang="ts">
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

  const TableHeaders = ["이름", "등번호", "포지션", "나이", "키", "몸무게"];

  let SelectedSeason = "2022-23";

  let SelectedTeamname = "Atlanta Hawks";

  let Playerroaster = [];

  let Mainplayer = [];

  let Mainplayerstats = [];

  let tablename = "";

  let MainplayerSeason = ""

  async function PlayerRoaster() {
    let TeamID = TeamObj[SelectedTeamname]["TeamID"];
    const response1 = await fetch(
      `playerinformation/api/PlayerRoaster?Season=${SelectedSeason}&TeamID=${TeamID}`
    );
    Playerroaster = await response1.json();
    tablename = SelectedSeason + " 시즌 " + SelectedTeamname;
  }

  async function GETMainPlayer(PlayerID) {
    const response2 = await fetch(
      `playerinformation/api/MainPlayer1?PlayerID=${PlayerID}`
    );
    Mainplayer = await response2.json();
    console.log(Mainplayer);
  }

  async function GETMainplayerstats(PlayerID) {
    const response3 = await fetch(
      `playerinformation/api/MainPlayer2?Season=${SelectedSeason}&PlayerID=${PlayerID}`
    );
    Mainplayerstats = await response3.json();
    MainplayerSeason = SelectedSeason;
  }

  function SelectPlayer(ArrayIndex) {
    const PlayerID = Playerroaster[ArrayIndex][6];

    GETMainPlayer(PlayerID);
    GETMainplayerstats(PlayerID);

    // 선수 정보창으로 스크롤 이동.
    const el = document.querySelector('#section');
		if (!el) return;
    el.scrollIntoView({
      behavior: 'smooth'
    });
  }
  
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
      <div class="selectinformation">팀이름</div>
      <select class="overflow selectbox" bind:value={SelectedTeamname}>
        {#each TeamnameArray as teamname}
          <option class="option" value={teamname}>
            {teamname}
          </option>
        {/each}
      </select>
    </div>

    <button class="search" on:click={PlayerRoaster}> 조회하기 </button>
  </div>

  {#if Playerroaster.length > 0}
    <div class="groupbox2">
      <div>
        <div class="text">{tablename} 선수들</div>
        <table class="table">
          <tr class="th">
            {#each TableHeaders as header}
              <th class="option">
                {header}
              </th>
            {/each}
          </tr>
          {#each Playerroaster as player, ArrayIndex}
            <tr
              class="firsttr"
              on:click={() => {
                SelectPlayer(ArrayIndex);
              }}
            >
              <td class="playernametd">
                <img
                  src="https://cdn.nba.com/headshots/nba/latest/1040x760/{player[6]}.png"
                  onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'"
                  alt="TeamLogo"
                  class="playerimage"
                />
                {player[0]}
              </td>
              {#if player[1] === null}
                <td>--</td>
              {:else}
                <td>{player[1]}</td>
              {/if}
              <td>{player[2]}</td>
              <td>{player[3]}</td>
              <td
                >{(parseFloat(player[4].replace("-", ".")) * 0.3048).toFixed(2)}
                m</td
              >
              <td>{(player[5] * 0.453592).toFixed(0)} kg</td>
            </tr>
          {/each}
        </table>
      </div>
    </div>
  {/if}

  {#if Mainplayer.length > 0}
    <div id="section" class="groupbox3">
      <div class="name">{MainplayerSeason}년도 {Mainplayer[1]}</div>
      <div class="image">
        <img
          src="https://cdn.nba.com/headshots/nba/latest/1040x760/{Mainplayer[0]}.png"
          onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'"
          alt="Player Headshot"
        />
      </div>

      <table class="table">
        <tr class="th">
          <th class="border">경기 당 평균 출전시간</th>
          <th class="border">경기 당 평균 득점</th>
          <th class="border">경기 당 평균 리바운드</th>
          <th class="border">경기 당 평균 어시스트</th>
        </tr>
        <tr>
          <td class="border">{parseFloat(Mainplayerstats[0]).toFixed(1)!==undefined?Mainplayerstats[0]:"--"}</td>
          <td class="border">{parseFloat(Mainplayerstats[1]).toFixed(1)!==undefined?Mainplayerstats[1]:"--"}</td>
          <td class="border">{parseFloat(Mainplayerstats[2]).toFixed(1)!==undefined?Mainplayerstats[2]:"--"}</td>
          <td class="border">{parseFloat(Mainplayerstats[3]).toFixed(1)!==undefined?Mainplayerstats[3]:"--"}</td>
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
          <td class="border">{((parseFloat(Mainplayer[2].replace("-", ".")))* 0.3048).toFixed(2)}m</td>
          <td class="border">{((Mainplayer[3])* 0.453592).toFixed(0)}kg</td>
          <td class="border">{Mainplayer[5]}</td>
          <td class="border">
            {#if Mainplayer[6] === ""}
              --번
            {:else}
              {Mainplayer[6]}번
            {/if}
            & {#if Mainplayer[7] === "Guard"}
              가드
            {:else if Mainplayer[7] === "Forward"}
              포워드
            {:else if Mainplayer[7] === "Center"}
              센터
            {:else if Mainplayer[7] === "Guard-Forward"}
              가드 - 포워드
            {:else if Mainplayer[7] === "Forward-Center"}
              포워드 - 센터
            {/if}
          </td>
        </tr>
        <tr class="th">
          <th class="border">나이</th>
          <th class="border">생년원일</th>
          <th class="border">판타지 포인트</th>
          <th class="border">경력</th>
        </tr>
        <tr>
          <td class="border">
              {parseFloat(SelectedSeason.slice(0,5)) - (Mainplayer[4].slice(0,4)) +1}세
          </td>
          <td class="border"
            >{Mainplayer[4]
              .replace("-", "년 ")
              .replace("-", "월 ")
              .replace("T00:00:00", "일 ")}</td
          >
          <td class="border">{Mainplayerstats[4]!==undefined?Mainplayerstats[4]:"--"}</td>
          <td class="border">{Mainplayer[8]}년차</td>
        </tr>
      </table>
    </div>
  {:else}
    <div id="section" class="airbox"></div>
  {/if}
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

  th {
    border: 1px solid black;
    background-color: rgb(229, 231, 235);
  }

  td {
    border: 1px solid black;
    text-align: center;
  }

  .firsttr {
    background-color: white;
  }

  .firsttr:hover {
    cursor: pointer;
    background-color: #d0e3ed;
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

  .playernametd {
    text-align: left;
  }

  .playerimage {
    display: inline;
    width: 75px;
    height: 60px;
    margin-right: 10px;
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
    padding-bottom: 30px;
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
    font-size: 35px;
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

  .airbox{
    width: 1115px;
    height: 1030px;
  }

  .selectinformation {
    margin-left: 10px;
    margin-bottom: 5px;
    margin-left: 20px;
    font-weight: bold;
  }
</style>
