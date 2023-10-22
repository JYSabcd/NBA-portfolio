<script lang="ts">
  import { baseurl, SeasonArray, TeamnameArray, TeamObj } from "../data.js";

  const TableHeaders = [
    "선수 이름",
    "등번호",
    "포지션",
    "나이",
    "키",
    "몸무게",
  ];

  let SelectedSeason = "2022-23";

  let SelectedTeamname = "Atlanta Hawks";

  let Playerroaster:string[] = [];

  let Mainplayer:(number|string)[] = [];

  let Mainplayerstats:string[] = [];

  let MainplayerSeason = "";

  let tablename = "";
  let tablename2 = "";

  async function PlayerRoaster() {
    let TeamID = TeamObj[SelectedTeamname]["TeamID"];
    const response1 = await fetch(
      `${baseurl}/playerinformation/api/PlayerRoaster?Season=${SelectedSeason}&TeamID=${TeamID}`
    );
    Playerroaster = await response1.json();
    tablename = SelectedSeason + " 시즌 ";
    tablename2 = SelectedTeamname;
  }

  async function GETMainPlayer(PlayerID:any) {
    const response2 = await fetch(
      `${baseurl}/playerinformation/api/MainPlayer1?PlayerID=${PlayerID}`
    );
    Mainplayer = await response2.json();
    console.log(Mainplayer);
  }

  async function GETMainplayerstats(PlayerID:any) {
    const response3 = await fetch(
      `${baseurl}/playerinformation/api/MainPlayer2?Season=${SelectedSeason}&PlayerID=${PlayerID}`
    );
    Mainplayerstats = await response3.json();
    MainplayerSeason = SelectedSeason;
  }

  function SelectPlayer(ArrayIndex:any) {
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
    <div class="pagename">선수 세부 정보</div>
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
      <table class="table">
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
  {/if}

  {#if Mainplayer.length > 0}
    <div id="section" class="groupbox3">
      <div class="playertitle">{MainplayerSeason}년도&nbsp;&nbsp;<span class="fontsize_name">{Mainplayer[1]}</span>&nbsp;&nbsp;선수 세부 정보</div>

      <div class="mainplayerimage">
        <img
          src="https://cdn.nba.com/headshots/nba/latest/1040x760/{Mainplayer[0]}.png"
          onerror="this.src='https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png'"
          alt="Player Headshot"
        />
      </div>

      <table class="table">
        <tr>
          <th class="border">경기 당 평균 출전시간</th>
          <th class="border">경기 당 평균 득점</th>
          <th class="border">경기 당 평균 리바운드</th>
          <th class="border">경기 당 평균 어시스트</th>
        </tr>
        <tr>
          <td
            >{Mainplayerstats[0] !== undefined
              ? parseFloat(Mainplayerstats[0]).toFixed(1)
              : "--"}</td
          >
          <td
            >{Mainplayerstats[1] !== undefined
              ? parseFloat(Mainplayerstats[1]).toFixed(1)
              : "--"}</td
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
        </tr>
      </table>

      <table class="table">
        <tr>
          <th class="border">키</th>
          <th class="border">몸무게</th>
          <th class="border">국적</th>
          <th class="border">등번호 & 포지션</th>
        </tr>
        <tr>
          <td
            >{(parseFloat(Mainplayer[2].replace("-", ".")) * 0.3048).toFixed(
              2
            )}m</td
          >
          <td>{(Mainplayer[3] * 0.453592).toFixed(0)}kg</td>
          <td>{Mainplayer[5]}</td>
          <td>
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
        <tr>
          <th class="border">나이</th>
          <th class="border">생년월일</th>
          <th class="border">판타지 포인트</th>
          <th class="border">경력</th>
        </tr>
        <tr>
          <td>
            {parseFloat(SelectedSeason.slice(0, 5)) -
              Mainplayer[4].slice(0, 4)}세
          </td>
          <td
            >{Mainplayer[4]
              .replace("-", "년 ")
              .replace("-", "월 ")
              .replace("T00:00:00", "일 ")}</td
          >
          <td
            >{Mainplayerstats[4] !== undefined
              ? parseFloat(Mainplayerstats[4]).toFixed(1)
              : "--"}</td
          >
          <td>{Mainplayer[8]}년차</td>
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

  .playertitle {
    width: calc(100% - 40px);
    /* width: 500px; */
    height: 60px;
    line-height: 60px;
    background: black;
    color: white;
    border-radius: 10px;
    font-weight: bolder;
    text-align: center;
    font-size: 18px;
    margin: 0 auto;
  }  
  
  .fontsize_name {
    font-size: 28px;
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
    padding-left: 10px;
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
  }

  .selected {
    border: 1px solid black;
    font-size: 18px;
    cursor: pointer;
    background-color: white;
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

  .mainplayerimage {
    width: 500px;
    background-color: rgb(229, 231, 235);
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 30px;
    padding-top: 30px;
  }

  .table {
    border-collapse: collapse;
    border: 1px solid black;
    margin: 30px auto;
    /* width: 800px; */
    width: calc(100% - 40px);
    height: 40px;
    line-height: 40px;
  }

  .border {
    border: 1px solid black;
    text-align: center;
    font-size: 18px;
  }

  .groupbox1 {
    margin: 30px auto;
    padding: 20px 20px;
    width: 90%;
    display: flex;
    justify-content: center;
    background-color: white;
    border-radius: 20px;
  }

  .groupbox2 {
    margin: 0px auto;
    padding: 30px 20px;
    padding-top: 50px;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    border-radius: 20px;
    margin-bottom: 30px;
  }

  .groupbox3 {
    margin: 0px auto;
    margin-top: 30px;
    padding: 20px 20px;
    padding-top: 50px;
    width: 90%;
    justify-content: center;
    background-color: white;
    border-radius: 20px;
    margin-bottom: 50px;
  }

  .airbox {
    width: 1115px;
    height: 1030px;
  }

  .selectinformation {
    margin-left: 30px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
  }
</style>
