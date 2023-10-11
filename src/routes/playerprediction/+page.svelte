<script lang="ts">
  import {
    SeasonArray,
    TeamnameArray,
    TeamObj,
    NBAAVG,
    NBAAGE,
    NBAMIN,
    NBAPTS,
    NBAREB,
    NBAAST,
  } from "../data.js";

  const TableHeaders = [
    "선수 이름",
    "나이",
    "경기 수",
    "평균 득점",
    "평균 리바운드",
    "평균 어시스트",
  ];

  let SelectedSeason = "2022-23";
  let SaveSelectedSeason = SelectedSeason;

  let SelectedTeamname = "Atlanta Hawks";

  let Playerroaster = [];

  let Mainplayer = [];

  let Mainplayerstats = [];

  let tablename = "";
  let tablename2 = "";

  let MainplayerSeason = "";

  async function PlayerRoaster() {
    let TeamID = TeamObj[SelectedTeamname]["TeamID"];
    const response1 = await fetch(
      `playerprediction/api/PlayerRoaster?Season=${SelectedSeason}&TeamID=${TeamID}`
    );
    Playerroaster = await response1.json();
    tablename = SelectedSeason + " 시즌 ";
    tablename2 = SelectedTeamname;
    SaveSelectedSeason = SelectedSeason;
  }

  async function GETMainPlayer(PlayerID) {
    const response2 = await fetch(
      `playerprediction/api/Mainplayer1?PlayerID=${PlayerID}`
    );
    Mainplayer = await response2.json();
  }

  async function GETMainplayerstats(PlayerID) {
    const response3 = await fetch(
      `playerprediction/api/Mainplayer2?Season=${SaveSelectedSeason}&PlayerID=${PlayerID}`
    );
    Mainplayerstats = await response3.json();
    MainplayerSeason = SaveSelectedSeason;
  }
  function SelectPlayer(ArrayIndex) {
    const PlayerID = Playerroaster[ArrayIndex][6];

    GETMainPlayer(PlayerID);
    GETMainplayerstats(PlayerID);

    // 선수 정보창으로 스크롤 이동.
    const el = document.querySelector("#section");
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
    });
  }

  function GetNextSeason(SeasonString) {
    let Year1 = parseInt(SeasonString.slice(0, 4))+1;
    let Year2 = Year1 + 1;

    return Year1.toString() + "-" + Year2.toString().slice(2,4);
  }
</script>

<body>
  <div class="pagenamecontainer">
      <div class="pagename">다음 시즌 예측하기</div>
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

  <div class="groupbox0">
    <div class="explain">
      <strong>선수 예측 방법</strong> : 1996-97시즌부터 2022-23시즌까지의 선수들의
      기록을 각 나이별로 출전시간, 득점, 리바운드, 어시스트의 각 나이별 평균 기록을
      구했다. 그리고 최댓값을 1로 정하고 나머지들을 최댓값을 기준으로 환산하여
      일정한 비율로 구했다. 그 다음 각 나이별 상승세 또는 하락세를 구해서 그 선수의
      기록에 곱해주어 다음 시즌을 예측하였다.
    </div>

    <div class="grapecontainer">
      <div class="avgtablecontainer">
      <table class="avgtable">
        <tr>
          <th>나이</th>
          <th>출전시간</th>
          <th>득점</th>
          <th>리바운드</th>
          <th>어시스트</th>
        </tr>

        {#each NBAAGE as age, i}
        <tr>
          <td>{age}</td>
          <td>{NBAMIN[i]}</td>
          <td>{NBAPTS[i]}</td>
          <td>{NBAREB[i]}</td>
          <td>{NBAAST[i]}</td>
        </tr>
        {/each}
      </table>
    </div>      

    <img class="grape" src="/NBAavggrape.png" alt="Grape" /> 

    </div>
  </div>

  <div class="groupbox1">
    <div>
      <div class="selectinformation">시즌 연도</div>
      <select class="overflow selectbox" bind:value={SelectedSeason}>
        {#each SeasonArray as Season}
          <option class="selected" value={Season}>
            {Season}
          </option>
        {/each}
      </select>
    </div>

    <div>
      <div class="selectinformation">팀 이름</div>
      <select class="overflow selectbox2" bind:value={SelectedTeamname}>
        {#each TeamnameArray as teamname}
          <option class="selected" value={teamname}>
            {teamname}
          </option>
        {/each}
      </select>
    </div>

    <button class="button" on:click={PlayerRoaster}> 조회하기 </button>
  </div>

  {#if Playerroaster.length > 0}
    <div class="groupbox2">
      <div class="tabletitle">{tablename}&nbsp;&nbsp;<span class="fontsize_name">{tablename2}</span>&nbsp;&nbsp;선수들</div>
      <table class="table1">
        <tr>
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
                alt="playerimg"
                class="playerimage"
              />
              {player[0]}
            </td>
            <td>{player[1]}</td>
            <td>{player[2]}</td>
            <td>{player[3]}</td>
            <td>{player[4]}</td>
            <td>{player[5]}</td>
          </tr>
        {/each}
      </table>
    </div>
  {/if}

  {#if Mainplayer.length > 0}
    <div id="section" class="groupbox3">
      <div class="tabletitle">{MainplayerSeason}년도&nbsp;&nbsp;<span class="fontsize_name">{Mainplayer[1]}</span></div>
      <div class="image">
        <img
          src="https://cdn.nba.com/headshots/nba/latest/1040x760/{Mainplayer[0]}.png"
          onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'"
          alt="Player Headshot"
        />
      </div>

      <table class="table2">
        <tr>
          <th>나이</th>
          <th>평균 득점</th>
          <th>평균 리바운드</th>
          <th>평균 어시스트</th>
          <th>평균 출전 시간</th>
        </tr>
        <tr>
          <td class="center"
            >{parseFloat(SaveSelectedSeason.slice(0, 5)) -
              Mainplayer[2].slice(0, 4)}세</td
          >
          <td class="center"
            >{Mainplayerstats[2] !== undefined
              ? parseFloat(Mainplayerstats[2]).toFixed(1)
              : "--"}</td
          >
          <td class="center"
            >{Mainplayerstats[3] !== undefined
              ? parseFloat(Mainplayerstats[3]).toFixed(1)
              : "--"}</td
          >
          <td class="center"
            >{Mainplayerstats[4] !== undefined
              ? parseFloat(Mainplayerstats[4]).toFixed(1)
              : "--"}</td
          >
          <td class="center"
            >{Mainplayerstats[1] !== undefined
              ? parseFloat(Mainplayerstats[1]).toFixed(1)
              : "--"}</td
          >
        </tr>
      </table>

      <img src="/Arrow/Arrow.png" alt="Arrow" class="arrow" />

      <div class="name2">
        {GetNextSeason(SaveSelectedSeason)}년도 {Mainplayer[1]} 기록 예측
      </div>
      <table class="table2">
        <tr>
          <th>나이</th>
          <th>평균 득점</th>
          <th>평균 리바운드</th>
          <th>평균 어시스트</th>
          <th>평균 출전 시간</th>
        </tr>
        <tr>
          <td
            >{parseFloat(SaveSelectedSeason.slice(0, 5)) -
              Mainplayer[2].slice(0, 4) +
              1}세</td
          >
          <td
            >{Mainplayerstats[2] !== undefined
              ? (
                  parseFloat(Mainplayerstats[2]) *
                  (parseFloat(
                    NBAAVG[
                      parseFloat(SaveSelectedSeason.slice(0, 5)) -
                        Mainplayer[2].slice(0, 4) +
                        1
                    ].PTS
                  ) /
                    parseFloat(
                      NBAAVG[
                        parseFloat(SaveSelectedSeason.slice(0, 5)) -
                          Mainplayer[2].slice(0, 4)
                      ].PTS
                    ))
                ).toFixed(1)
              : "--"}</td
          >
          <td
            >{Mainplayerstats[3] !== undefined
              ? (
                  parseFloat(Mainplayerstats[3]) *
                  (parseFloat(
                    NBAAVG[
                      parseFloat(SaveSelectedSeason.slice(0, 5)) -
                        Mainplayer[2].slice(0, 4) +
                        1
                    ].REB
                  ) /
                    parseFloat(
                      NBAAVG[
                        parseFloat(SaveSelectedSeason.slice(0, 5)) -
                          Mainplayer[2].slice(0, 4)
                      ].REB
                    ))
                ).toFixed(1)
              : "--"}</td
          >
          <td
            >{Mainplayerstats[4] !== undefined
              ? (
                  parseFloat(Mainplayerstats[4]) *
                  (parseFloat(
                    NBAAVG[
                      parseFloat(SaveSelectedSeason.slice(0, 5)) -
                        Mainplayer[2].slice(0, 4) +
                        1
                    ].AST
                  ) /
                    parseFloat(
                      NBAAVG[
                        parseFloat(SaveSelectedSeason.slice(0, 5)) -
                          Mainplayer[2].slice(0, 4)
                      ].AST
                    ))
                ).toFixed(1)
              : "--"}</td
          >
          <td
            >{Mainplayerstats[1] !== undefined
              ? (
                  parseFloat(Mainplayerstats[1]) *
                  (parseFloat(
                    NBAAVG[
                      parseFloat(SaveSelectedSeason.slice(0, 5)) -
                        Mainplayer[2].slice(0, 4) +
                        1
                    ].MIN
                  ) /
                    parseFloat(
                      NBAAVG[
                        parseFloat(SaveSelectedSeason.slice(0, 5)) -
                          Mainplayer[2].slice(0, 4)
                      ].MIN
                    ))
                ).toFixed(1)
              : "--"}</td
          >
        </tr>
      </table>
    </div>
  {:else}
    <div id="section" class="airbox" />
  {/if}
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

  .selectinformation {
    margin-left: 30px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
  }

  .overflow {
    height: 200px;
    width: 200px;
    overflow: auto;
  }

  .tabletitle {
    /* width: calc(100% - 40px); */
    min-width: 500px;
    height: 60px;
    line-height: 60px;
    background: black;
    color: white;
    border-radius: 10px;
    font-weight: bolder;
    text-align: center;
    font-size: 18px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .fontsize_name {
    font-size: 28px;
  }

  table {
    border-collapse: collapse;
    border: 1px solid black;
  }

  th, td {
    border: 1px solid black;
  }
  
  table.table1, table.table2 {
    width: calc(100% - 40px);
    margin: 30px auto;
    line-height: 40px;
  }

  table.table1 th, table.table2 th {
    min-width: 150px;
    font-weight: bold;
    font-size: 18px;
    background-color: rgb(255, 201, 14);
  }

  table.table1 td, table.table2 td {
    min-width: 150px;
    text-align: center;
  }

  table.table1 td.playernametd {
    text-align: left;
    min-width: 240px;
    padding-left: 10px;
  }

  table.avgtable {
  }

  table.avgtable th{
    font-weight: bold;
    font-size: 17px;
    background-color: rgb(255, 201, 14);
  }

  table.avgtable td{
    width: 50px;
    text-align: center;
  }

  .grapecontainer {
    display: flex;
  }

  .avgtablecontainer {
    overflow-y: auto;
    height: 500px;
  }

  .grape {
    width: 811px;
    height: 500px;
    margin: 0 auto;
  }

  .center {
    text-align: center;
  }

  .firsttr {
    background-color: white;
  }

  .firsttr:hover {
    cursor: pointer;
    background-color: rgb(229, 231, 235);
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

  .playerimage {
    display: inline;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  .option {
    border: 1px solid black;
    font-size: 18px;
    cursor: pointer;
    background-color: rgb(255, 201, 14);
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

  .selected {
    border: 1px solid black;
    font-size: 18px;
    cursor: pointer;
    background-color: white;
  }

  .image {
    width: 500px;
    background-color: rgb(229, 231, 235);
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 30px;
    padding-top: 30px;
  }

  .name {
    font-size: 35px;
    font-weight: bold;
    text-align: center;
  }

  .name2 {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
  }

  .groupbox0 {
    margin: 0px auto;
    margin-top: 30px;
    padding: 20px 20px;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    border-radius: 20px;
    margin-bottom: 50px;
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
    flex-direction: column;
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

  .airbox {
    width: 90%;
    height: 896px;
  }

  .arrow {
    width: 50px;
    height: 50px;
    margin: 0 auto;
  }

  .explain {
    margin: 20px auto;
  }
</style>
