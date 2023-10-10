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

  let SelectedTeamname = "Atlanta Hawks";

  let Playerroaster = [];

  let Mainplayer = [];

  let Mainplayerstats = [];

  let PredictionArray = [];

  let tablename = "";

  let MainplayerSeason = "";

  async function PlayerRoaster() {
    let TeamID = TeamObj[SelectedTeamname]["TeamID"];
    const response1 = await fetch(
      `playerprediction/api/PlayerRoaster?Season=${SelectedSeason}&TeamID=${TeamID}`
    );
    Playerroaster = await response1.json();
    tablename = SelectedSeason + " 시즌 " + SelectedTeamname;
  }

  async function GETMainPlayer(PlayerID) {
    const response2 = await fetch(
      `playerprediction/api/Mainplayer1?PlayerID=${PlayerID}`
    );
    Mainplayer = await response2.json();
  }

  async function GETMainplayerstats(PlayerID) {
    const response3 = await fetch(
      `playerprediction/api/Mainplayer2?Season=${SelectedSeason}&PlayerID=${PlayerID}`
    );
    Mainplayerstats = await response3.json();
    MainplayerSeason = SelectedSeason;
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

    <button class="button" on:click={PlayerRoaster}> 조회하기 </button>
  </div>

  {#if Playerroaster.length > 0}
    <div class="groupbox2">
      <div class="text">{tablename} 선수들</div>
      <table class="table1">
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
      <div class="name">{MainplayerSeason}년도 {Mainplayer[1]}</div>
      <div class="image">
        <img
          src="https://cdn.nba.com/headshots/nba/latest/1040x760/{Mainplayer[0]}.png"
          onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'"
          alt="Player Headshot"
        />
      </div>

      <table class="table2">
        <tr class="th">
          <th class="thwidth">나이</th>
          <th class="thwidth">평균 득점</th>
          <th class="thwidth">평균 리바운드</th>
          <th class="thwidth">평균 어시스트</th>
          <th class="thwidth">평균 출전 시간</th>
        </tr>
        <tr>
          <td class="center"
            >{parseFloat(SelectedSeason.slice(0, 5)) -
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
        {parseFloat(SelectedSeason.slice(0, 5)) + 1} -
        {#if parseFloat(SelectedSeason.slice(5)) + 1 === 100}
          00
        {:else if parseFloat(SelectedSeason.slice(5)) + 1 < 10}
          0{parseFloat(SelectedSeason.slice(5)) + 1}
        {:else if parseFloat(SelectedSeason.slice(5)) + 1 >= 10}
          {parseFloat(SelectedSeason.slice(5)) + 1}
        {/if}년도 {Mainplayer[1]} 기록 예측
      </div>
      <table class="table2">
        <tr class="th">
          <th>나이</th>
          <th>평균 득점</th>
          <th>평균 리바운드</th>
          <th>평균 어시스트</th>
          <th>평균 출전 시간</th>
        </tr>
        <tr>
          <td
            >{parseFloat(SelectedSeason.slice(0, 5)) -
              Mainplayer[2].slice(0, 4) +
              1}세</td
          >
          <td
            >{Mainplayerstats[2] !== undefined
              ? (
                  parseFloat(Mainplayerstats[2]) *
                  (parseFloat(
                    NBAAVG[
                      parseFloat(SelectedSeason.slice(0, 5)) -
                        Mainplayer[2].slice(0, 4) +
                        1
                    ].PTS
                  ) /
                    parseFloat(
                      NBAAVG[
                        parseFloat(SelectedSeason.slice(0, 5)) -
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
                      parseFloat(SelectedSeason.slice(0, 5)) -
                        Mainplayer[2].slice(0, 4) +
                        1
                    ].REB
                  ) /
                    parseFloat(
                      NBAAVG[
                        parseFloat(SelectedSeason.slice(0, 5)) -
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
                      parseFloat(SelectedSeason.slice(0, 5)) -
                        Mainplayer[2].slice(0, 4) +
                        1
                    ].AST
                  ) /
                    parseFloat(
                      NBAAVG[
                        parseFloat(SelectedSeason.slice(0, 5)) -
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
                      parseFloat(SelectedSeason.slice(0, 5)) -
                        Mainplayer[2].slice(0, 4) +
                        1
                    ].MIN
                  ) /
                    parseFloat(
                      NBAAVG[
                        parseFloat(SelectedSeason.slice(0, 5)) -
                          Mainplayer[2].slice(0, 4)
                      ].MIN
                    ))
                ).toFixed(1)
              : "--"}</td
          >
        </tr>
      </table>
      <img class="grape" src="/NBAavggrape.png" alt="Grape" />
      <div class="nbastat-container">
        <table class="nbastat">
          <tr>
            <td class="nbatable">나이</td>
            {#each NBAAGE as age}
              <td class="nbatable2">{age}</td>
            {/each}
          </tr>
          <tr>
            <td class="nbatable">출전시간</td>
            {#each NBAMIN as min}
              <td class="nbatable2">{min}</td>
            {/each}
          </tr>
          <tr>
            <td class="nbatable">득점</td>
            {#each NBAPTS as pts}
              <td class="nbatable2">{pts}</td>
            {/each}
          </tr>
          <tr>
            <td class="nbatable">리바운드</td>
            {#each NBAREB as reb}
              <td class="nbatable2">{reb}</td>
            {/each}
          </tr>
          <tr>
            <td class="nbatable">어시스트</td>
            {#each NBAAST as ast}
              <td class="nbatable2">{ast}</td>
            {/each}
          </tr>
        </table>
      </div>
      <div class="explain">
        <strong>선수 예측 방법</strong> : 1996-97시즌부터 2022-23시즌까지의 선수들의
        기록을 각 나이별로 출전시간, 득점, 리바운드, 어시스트의 각 나이별 평균 기록을
        구했다. 그리고 최댓값을 1로 정하고 나머지들을 최댓값을 기준으로 환산하여
        일정한 비율로 구했다. 그 다음 각 나이별 상승세 또는 하락세를 구해서 그 선수의
        기록에 곱해주어 다음 시즌을 예측하였다
      </div>
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

  .text {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 5px;
    font-size: 23px;
    font-weight: bold;
  }

  .selectinformation {
    margin-bottom: 5px;
    margin-left: 30px;
    font-weight: bold;
  }

  .overflow {
    height: 200px;
    width: 200px;
    overflow: auto;
  }

  th {
    border: 1px solid black;
    font-weight: bold;
    font-size: 17px;
    background-color: rgb(255, 201, 14);
  }

  td {
    min-width: 150px;
    border: 1px solid black;
    text-align: center;
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
    height: 60px;
    margin-top: 20px;
    margin-left: 50px;
    padding: 10px 30px;
    border-radius: 20px;
    font-weight: bold;
    font-size: 20px;
    color: white;
  }

  .button:hover {
    background-color: rgb(201, 115, 34);
  }

  .playernametd {
    text-align: left;
    min-width: 240px;
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
    border-radius: 20px;
  }

  .image {
    width: 500px;
    background-color: rgb(233, 196, 240);
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  table {
    width: calc(100% - 40px);
  }

  .table1 {
    border-collapse: collapse;
    border: 1px solid black;
    margin: 30px auto;
    height: 40px;
    line-height: 40px;
  }

  .table2 {
    border-collapse: collapse;
    border: 1px solid black;
    margin: 30px auto;
    height: 40px;
    line-height: 40px;
  }

  .thwidth {
    min-width: 100px;
    text-align: center;
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
    width: 1115px;
    height: 715px;
  }

  .arrow {
    width: 80px;
    margin: 0 auto;
  }

  .grape {
    width: 900px;
    height: 550px;
    margin: 0 auto;
  }

  .nbastat {
    margin: 20px auto;
  }
  .nbastat-container {
    overflow-x: auto;
  }

  .nbatable {
    min-width: 0px;
    width: 58px;
    background-color: rgb(229, 231, 235);
    background-color: rgb(255, 201, 14);
    font-weight: bold;
    font-size: 17px;
  }

  .nbatable2 {
    width: 58px;
    min-width: 0px;
  }

  .explain {
    margin: 20px auto;
  }
</style>
