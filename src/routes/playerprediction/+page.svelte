<script lang="ts">
  import {
    baseurl,
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

  let Playerroaster:string[] = [];

  let Mainplayer:number[] = [];
  let Mainplayerage = 0;

  let Mainplayerstats = [];
  //  예측Stat과 비교해서 증감값을 표시할때 사용하기 위해 미리 계산해놓는다.
  let Mainplayer_displaystats:number[] = []; //  .소수점 버림으로 1자리까지만 표시 xx.x
  let Prediction_displaystats:number[] = []; //  .소수점 버림으로 1자리까지만 표시 xx.x

  let tablename = "";
  let tablename2 = "";

  let MainplayerSeason = "";

  async function PlayerRoaster() {
    let TeamID = TeamObj[SelectedTeamname]["TeamID"];
    const response1 = await fetch(
      `${baseurl}/playerprediction/api/PlayerRoaster?Season=${SelectedSeason}&TeamID=${TeamID}`
    );
    Playerroaster = await response1.json();
    tablename = SelectedSeason + " 시즌 ";
    tablename2 = SelectedTeamname;
    SaveSelectedSeason = SelectedSeason;
  }

  async function GETMainPlayer(PlayerID:any) {
    const response2 = await fetch(
      `${baseurl}/playerprediction/api/Mainplayer1?PlayerID=${PlayerID}`
    );
    Mainplayer = await response2.json();
    Mainplayerage = parseInt(SaveSelectedSeason.slice(0, 4)) - Mainplayer[2].slice(0, 4);
  }

  async function GETMainplayerstats(PlayerID:any) {
    const response3 = await fetch(
      `${baseurl}/playerprediction/api/Mainplayer2?Season=${SaveSelectedSeason}&PlayerID=${PlayerID}`
    );
    Mainplayerstats = await response3.json();
    MainplayerSeason = SaveSelectedSeason;

    // 소수점 1자리만 남기고 버리기
    Mainplayer_displaystats[2] = Math.floor(Mainplayerstats[2]*10)/10;
    Mainplayer_displaystats[3] = Math.floor(Mainplayerstats[3]*10)/10;
    Mainplayer_displaystats[4] = Math.floor(Mainplayerstats[4]*10)/10;
    Mainplayer_displaystats[1] = Math.floor(Mainplayerstats[1]*10)/10;

    // 다음 시즌(나이+1) 예측하기 (단, 예측은 19세~38세까지만 가능)
    if(Mainplayerage >= 19 && Mainplayerage <= 38){
      Prediction_displaystats[2] = Math.floor(Mainplayerstats[2] * NBAAVG[Mainplayerage + 1].PTS / NBAAVG[Mainplayerage].PTS * 10) / 10;
      Prediction_displaystats[3] = Math.floor(Mainplayerstats[3] * NBAAVG[Mainplayerage + 1].PTS / NBAAVG[Mainplayerage].PTS * 10) / 10;
      Prediction_displaystats[4] = Math.floor(Mainplayerstats[4] * NBAAVG[Mainplayerage + 1].PTS / NBAAVG[Mainplayerage].PTS * 10) / 10;
      Prediction_displaystats[1] = Math.floor(Mainplayerstats[1] * NBAAVG[Mainplayerage + 1].PTS / NBAAVG[Mainplayerage].PTS * 10) / 10;
    }
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

  function GetNextSeason(SeasonString) {
    let Year1 = parseInt(SeasonString.slice(0, 4)) + 1;
    let Year2 = Year1 + 1;

    return Year1.toString() + "-" + Year2.toString().slice(2, 4);
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
      <div class="text1">&#91;예측 방법 설명&#93;</div>
      <div class="textgroup">
        <div class="text2">1. 데이터 수집</div>
        NBA API 를 활용해서 <strong
          >1996년부터 약 27년간의 12,846건 데이터</strong
        >를 로컬DB에 저장 합니다.<br />
        <div class="text3">&nbsp;&nbsp;&nbsp;&#60;데이터 상세 목록&#62;</div>
        &nbsp;&nbsp;&nbsp;1&#41; 각 시즌 별 선수 고유번호, 이름, 나이, 경기 수<br
        />
        &nbsp;&nbsp;&nbsp;2&#41; 경기 당 평균 출전시간, 득점, 리바운드, 어시스트
      </div>
      <div class="textgroup">
        <div class="text2">2. 데이터 정제</div>
        정확한 통계를 위해 출전 경기수가 일정 이하인 데이터를 분석에서 제외 합니다.<br
        />
        <div class="text3">
          &nbsp;&nbsp;&nbsp;&#60;기준 경기 수를 정하기 위한 과정&#62;
        </div>
        &nbsp;&nbsp;&nbsp;1&#41; NBA 기준 규정 경기 수 충족<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NBA 는 랭킹 집계의
        <strong>규정 경기수를 총 82경기 중 70%인 58경기</strong>로 정하고
        있습니다.<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong
          >58경기 이상 데이터는 6,381건으로 상위 49.6% 수준</strong
        >입니다.<br />
        &nbsp;&nbsp;&nbsp;2&#41; 경기 수가 적은 하위 10%를 제외<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;하위 10% 수준은 10경기 미만으로
        확인되어, <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong
          >10경기 이상 참여한 데이터는 11,655건으로 상위 90.7% 수준</strong
        >입니다.<br />
        &nbsp;&nbsp;&nbsp;3&#41; 주전 선수들만이 아닌 다양한 선수들의 능력치를 예측하기
        위해서는 <strong>2&#41;번의 방식이 적합하다고 판단</strong>했습니다.
      </div>
      <div class="textgroup">
        <div class="text2">3. 통계적 분석</div>
        현재 시즌과 다음 시즌의 명확한 차이는 <strong>나이</strong> 입니다.<br />
        스포츠 분야에서는 <strong>"에이징 커브"</strong>를 중요한 지표중 하나로
        판단하고 있습니다.<br />
        그래서 나이를 기준으로 정제된 데이터들의 능력치 별 평균값을 계산하였습니다.<br
        />
        <strong
          >계산된 최고 평균값을 1로 변환하고 나머지 값들을 비율에 맞게 변환한 뒤
          그래프</strong
        >를 만들었습니다.
      </div>
      <div class="textgroup">
        <div class="text2">4. 예측</div>
        현재 시즌의 나이와 다음 시즌의 나이에 따른 능력치별 평균값 차이로 예측값을
        계산합니다.<br />
        <div class="text3">&#60;예시&#62;</div>
        최고값을 1로 정하여 계산된 상대값들<br />
        19세 : &#123;득점: 0.722, 어시스트: 0.622, 리바운드: 0.834, 출전시간: 0.769&#125;,<br
        />
        20세 : &#123;득점: <strong>0.798</strong>, 어시스트: 0.74, 리바운드:
        0.842, 출전시간: 0.813&#125;,<br />
        21세 : &#123;득점: <strong>0.844</strong>, 어시스트: 0.774, 리바운드:
        0.886, 출전시간: 0.849&#125;,<br />
        <br />
        2022-23시즌 A선수 : <strong>20세, 평균득점 27.5</strong><br />
        &#187; 2023-24시즌 평균득점 예측 방식 :
        <strong>27.5 * 0.844 / 0.798 = 29.08</strong><br />
        <strong>21세에는 평균득점이 약 1.58 오른 29.08 로 예측됩니다.</strong
        ><br />
      </div>
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
      <div class="tabletitle">
        {tablename}&nbsp;&nbsp;<span class="fontsize_name">{tablename2}</span
        >&nbsp;&nbsp;선수들
      </div>
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
      <div class="tabletitle">
        {MainplayerSeason}년도&nbsp;&nbsp;<span class="fontsize_name"
          >{Mainplayer[1]}</span
        >
      </div>
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
          <th>평균 출전 시간(분)</th>
        </tr>
        <tr>
          <td>{Mainplayerage}세</td>
          <td
            >{Mainplayer_displaystats[2] !== undefined
              ? Mainplayer_displaystats[2].toFixed(1)
              : "--"}</td
          >
          <td
            >{Mainplayer_displaystats[3] !== undefined
              ? Mainplayer_displaystats[3].toFixed(1)
              : "--"}</td
          >
          <td
            >{Mainplayer_displaystats[4] !== undefined
              ? Mainplayer_displaystats[4].toFixed(1)
              : "--"}</td
          >
          <td
            >{Mainplayer_displaystats[1] !== undefined
              ? Mainplayer_displaystats[1].toFixed(1)
              : "--"}</td
          >
        </tr>
      </table>

      <img src="/Arrow/Arrow.png" alt="Arrow" class="arrow" />

      <div class="name2">
        <div class="tabletitle">
          {GetNextSeason(SaveSelectedSeason)}년도&nbsp;&nbsp;<span
            class="fontsize_name">{Mainplayer[1]}</span
          >&nbsp;&nbsp;기록 예측
        </div>
      </div>
      <table class="table2">
        <tr>
          <th>나이</th>
          <th>평균 득점</th>
          <th>평균 리바운드</th>
          <th>평균 어시스트</th>
          <th>평균 출전 시간(분)</th>
        </tr>
        <tr>
          <td>{Mainplayerage + 1}세</td>
          {#if Mainplayerage >= 19 && Mainplayerage <= 38}
          <td
            >{Prediction_displaystats[2] !== undefined
              ? Prediction_displaystats[2].toFixed(1)
              : "--"}</td
          >
          <td
            >{Prediction_displaystats[3] !== undefined
              ? Prediction_displaystats[3].toFixed(1)
              : "--"}</td
          >
          <td
            >{Prediction_displaystats[4] !== undefined
              ? Prediction_displaystats[4].toFixed(1)
              : "--"}</td
          >
          <td
            >{Prediction_displaystats[1] !== undefined
              ? Prediction_displaystats[1].toFixed(1)
              : "--"}</td
          >
          {:else}
          <td colspan="4">19세 ~ 38세 선수만 예측 가능합니다.</td>
          {/if}
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

    font-style: italic;
  }
  .BMW_BMW {
    padding-left: 5px;
    font-size: 30px;
    font-weight: bold;
    color: rgb(255, 201, 14);

    font-style: italic;
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

  .explain {
    width: 90%;
    margin: 20px auto;
  }

  .textgroup {
    margin: 20px 0px;
  }
  .text1 {
    font-size: 24px;
    font-weight: bold;
    margin: 10px 0px;
  }
  .text2 {
    font-size: 20px;
    font-weight: bold;
    margin: 10px 0px;
  }
  .text3 {
    font-size: 16px;
    font-weight: bold;
    margin: 10px 0px;
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

  table {
    border-collapse: collapse;
    border: 1px solid black;
  }

  th,
  td {
    border: 1px solid black;
  }

  table.table1,
  table.table2 {
    width: calc(100% - 40px);
    margin: 30px auto;
    line-height: 40px;
  }

  table.table1 th,
  table.table2 th {
    min-width: 150px;
    font-weight: bold;
    font-size: 18px;
    background-color: rgb(255, 201, 14);
  }

  table.table1 td,
  table.table2 td {
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

  table.avgtable th {
    font-weight: bold;
    font-size: 17px;
    background-color: rgb(255, 201, 14);
  }

  table.avgtable td {
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
    height: 899px;
  }

  .arrow {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    margin-bottom: 10px;
  }
</style>
