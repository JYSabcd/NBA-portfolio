<script lang="ts">
  import { baseurl, SeasonArray, TeamnameArray, TeamObj } from "../data.js";

  const TableHeaders = [
    "이름",
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

  let SimilarPlayerArray = [];

  let tablename = "";
  let tablename2 = "";

  let MainplayerSeason = "";

  async function PlayerRoaster() {
    let TeamID = TeamObj[SelectedTeamname]["TeamID"];
    const response1 = await fetch(
      `${baseurl}/showsimilarplayers/api/PlayerRoaster?Season=${SelectedSeason}&TeamID=${TeamID}`
    );
    Playerroaster = await response1.json();
    tablename = SelectedSeason + " 시즌 ";
    tablename2 = SelectedTeamname;
  }

  async function GETMainPlayer(PlayerID) {
    const response2 = await fetch(
      `${baseurl}/showsimilarplayers/api/MainPlayer1?PlayerID=${PlayerID}`
    );
    Mainplayer = await response2.json();
  }

  async function GETMainplayerstats(PlayerID) {
    const response3 = await fetch(
      `${baseurl}/showsimilarplayers/api/MainPlayer2?Season=${SelectedSeason}&PlayerID=${PlayerID}`
    );
    Mainplayerstats = await response3.json();
    MainplayerSeason = SelectedSeason;
  }

  async function GETSimilarPlayer(PlayerID) {
    const response3 = await fetch(
      `${baseurl}/showsimilarplayers/db/fn_similarplayer?Season=${SelectedSeason}&PlayerID=${PlayerID}`
    );
    SimilarPlayerArray = await response3.json();
  }

  function SelectPlayer(ArrayIndex) {
    const PlayerID = Playerroaster[ArrayIndex][6];

    GETMainPlayer(PlayerID);
    GETMainplayerstats(PlayerID);
    GETSimilarPlayer(PlayerID);

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
    <div class="pagename">비슷한 선수 보여주기</div>
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
            <td>{player[3].toFixed(1)}</td>
            <td>{player[4].toFixed(1)}</td>
            <td>{player[5].toFixed(1)}</td>
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
        <tr class="th">
          <th class="thwidth">나이</th>
          <th class="thwidth">평균 득점</th>
          <th class="thwidth">평균 리바운드</th>
          <th class="thwidth">평균 어시스트</th>
          <th class="thwidth">경기 수</th>
          <th class="thwidth">평균 출전 시간</th>
        </tr>
        <tr>
          <td
            >{parseFloat(SelectedSeason.slice(0, 5)) -
              Mainplayer[2].slice(0, 4)+1}세</td
          >
          <td
            >{Mainplayerstats[2] !== undefined
              ? parseFloat(Mainplayerstats[2]).toFixed(1)
              : "--"}</td
          >
          <td
            >{Mainplayerstats[3] !== undefined
              ? parseFloat(Mainplayerstats[3]).toFixed(1)
              : "--"}</td
          >
          <td
            >{Mainplayerstats[4] !== undefined
              ? parseFloat(Mainplayerstats[4]).toFixed(1)
              : "--"}</td
          >
          <td
            >{Mainplayerstats[0] !== undefined ? Mainplayerstats[0] : "--"}</td
          >
          <td
            >{Mainplayerstats[1] !== undefined
              ? parseFloat(Mainplayerstats[1]).toFixed(1)
              : "--"}</td
          >
        </tr>
      </table>

      <div class="tabletitle">{MainplayerSeason}년도&nbsp;&nbsp;<span class="fontsize_name">{Mainplayer[1]}</span>&nbsp;&nbsp;선수와 비슷한 선수들</div>
      <table class="table3">
        <tr>
          <th>선수 이름</th>
          <th>시즌</th>
          <th>나이</th>
          <th>평균 득점</th>
          <th>평균 리바운드</th>
          <th>평균 어시스트</th>
          <th>경기 수</th>
          <th>평균 출전 시간</th>
        </tr>
        {#each SimilarPlayerArray as SimilarPlayer}
          <tr>
            <td class="playernametd">
              <img
                class="playerimage"
                src="https://cdn.nba.com/headshots/nba/latest/1040x760/{SimilarPlayer[
                  'player_id'
                ]}.png"
                onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'"
                alt="Player Headshot"
              />
              {SimilarPlayer["player_name"]}
            </td>
            <td class="table3td">{SimilarPlayer["season"]}</td>
            <td class="table3td">{SimilarPlayer["age"]}세</td>
            <td class="table3td">{parseFloat(SimilarPlayer["pts"]).toFixed(1)}</td>
            <td class="table3td">{parseFloat(SimilarPlayer["reb"]).toFixed(1)}</td>
            <td class="table3td">{parseFloat(SimilarPlayer["ast"]).toFixed(1)}</td>
            <td class="table3td">{SimilarPlayer["gp"]}</td>
            <td class="table3td">{parseFloat(SimilarPlayer["min"]).toFixed(1)}</td>
          </tr>
        {/each}
        {#if SimilarPlayerArray.length === 0}
          <tr>
            <td colspan="8">비슷한 조건의 선수가 없습니다.</td>
          </tr>
        {/if}
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

  .tabletitle {
    min-width: 500px;
    max-width: calc(100% - 40px);
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

  th {
    border: 1px solid black;
    background-color: rgb(255, 201, 14);
  }

  td {
    min-width: 150px;
    border: 1px solid black;
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

  .playernametd {
    text-align: left;
    min-width: 240px;
  }

  .table3td{
    min-width: 120px;
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

  table {
    width: calc(100% - 40px);
  }

  .table1 {
    border-collapse: collapse;
    border: 1px solid black;
    margin: 30px auto;
    margin-bottom: 30px;
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

  .table3 {
    border-collapse: collapse;
    border: 1px solid black;
    margin: 30px auto;
    height: 40px;
    line-height: 40px;
  }

  .thwidth {
    background-color: rgb(255, 201, 14);
    min-width: 100px;
  }

  .name {
    font-size: 35px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }

  .listname {
    font-size: 25px;
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
    height: 1080px;
  }

</style>
