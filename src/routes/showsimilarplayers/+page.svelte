<script lang="ts">
     import { Avatar, Dropdown, Button, DropdownItem, Chevron } from "flowbite-svelte"
</script>
<div class="body">
  <div class="inlineflex">
    <div class="overflow">
      <Button><Chevron>연도</Chevron></Button>
      <Dropdown class = "overflow">
        <DropdownItem>2022-23</DropdownItem>
        <DropdownItem>2021-22</DropdownItem>
        <DropdownItem>2020-21</DropdownItem>
        <DropdownItem>2019-20</DropdownItem>
        <DropdownItem>2018-19</DropdownItem>
        <DropdownItem>2017-18</DropdownItem>
        <DropdownItem>2016-17</DropdownItem>
        <DropdownItem>2015-16</DropdownItem>
        <DropdownItem>2014-15</DropdownItem>
        <DropdownItem>2013-14</DropdownItem>
        <DropdownItem>2012-13</DropdownItem>
        <DropdownItem>2011-12</DropdownItem>
        <DropdownItem>2010-11</DropdownItem>
        <DropdownItem>2009-10</DropdownItem>
        <DropdownItem>2008-09</DropdownItem>
        <DropdownItem>2007-08</DropdownItem>
        <DropdownItem>2006-07</DropdownItem>
        <DropdownItem>2005-06</DropdownItem>
        <DropdownItem>2004-05</DropdownItem>
        <DropdownItem>2003-04</DropdownItem>
        <DropdownItem>2002-03</DropdownItem>
        <DropdownItem>2001-02</DropdownItem>
        <DropdownItem>2000-01</DropdownItem>
        <DropdownItem>1999-00</DropdownItem>
        <DropdownItem>1998-99</DropdownItem>
        <DropdownItem>1997-98</DropdownItem>
        <DropdownItem>1996-97</DropdownItem>
      </Dropdown>
  </div>  
  
  <div class="overflow">
      <Button><Chevron>시즌 타입</Chevron></Button>
      <Dropdown class = "overflow">
        <DropdownItem>프리시즌</DropdownItem>
        <DropdownItem>정규시즌</DropdownItem>
        <DropdownItem>플레이오프</DropdownItem>
      </Dropdown>
  </div>  
  
  <div class="overflow">
      <Button><Chevron>팀이름</Chevron></Button>
      <Dropdown class = "overflow">
        <DropdownItem>골든 스테이트 워리어스</DropdownItem>
        <DropdownItem>뉴올리언스 펠리컨스</DropdownItem>
        <DropdownItem>뉴욕 닉스</DropdownItem>
        <DropdownItem>댈러스 매버릭스</DropdownItem>
        <DropdownItem>덴버 너게츠</DropdownItem>
        <DropdownItem>디트로이트 피스톤스</DropdownItem>
        <DropdownItem>마이애미 히트</DropdownItem>
        <DropdownItem>멤피스 그리즐리즈</DropdownItem>
        <DropdownItem>미네소타 팀버울브스</DropdownItem>
        <DropdownItem>밀워키 벅스</DropdownItem>
        <DropdownItem>보스턴 셀틱스</DropdownItem>
        <DropdownItem>브루클린 네츠</DropdownItem>
        <DropdownItem>새크라멘토 킹스</DropdownItem>
        <DropdownItem>샌안토니오 스퍼스</DropdownItem>
        <DropdownItem>샬럿 호네츠</DropdownItem>
        <DropdownItem>시카고 불스</DropdownItem>
        <DropdownItem>애틀랜타 호크스</DropdownItem>
        <DropdownItem>오클라호마시티 썬더</DropdownItem>
        <DropdownItem>올랜도 매직</DropdownItem>
        <DropdownItem>워싱턴 위자드</DropdownItem>
        <DropdownItem>유타 재즈</DropdownItem>
        <DropdownItem>인디애나 페이서스</DropdownItem>
        <DropdownItem>클리블랜드 캐벌리어스</DropdownItem>
        <DropdownItem>토론토 랩터스</DropdownItem>
        <DropdownItem>포틀랜드 트레일 블레이저스</DropdownItem>
        <DropdownItem>피닉스 썬즈</DropdownItem>
        <DropdownItem>필라델피아 세븐티식서스</DropdownItem>
        <DropdownItem>휴스턴 로케츠</DropdownItem>
        <DropdownItem>LA 레이커스</DropdownItem>
        <DropdownItem>LA 클리퍼스</DropdownItem>
      </Dropdown>
  </div>  
  </div>
  
  <div class="inquire">
    <button class="button" on:click={() => (alert('조회하기'))}>
      조회하기
    </button>
  </div>

  <div class="name">Abcd Efghi</div>
  
  <div class="image">
    선수 이미지가 나와요!!
  </div>
  
  <table class="table">
    <tr class="th">
      <th class="border">나이</th>
      <th class="border">경기 당 평균 득점</th>
      <th class="border">경기 당 평균 리바운드</th>
      <th class="border">경기 당 평균 어시스트</th>
      <th class="border">선수 공헌도</th> 
      <th class="border">포지션</th>
    </tr>
    <tr>
      <td class="border">31</td>
      <td class="border">25.3</td>
      <td class="border">12.5</td>
      <td class="border">10.2</td>
      <td class="border">15.8</td>
      <td class="border">포워드</td>
    </tr>
  </table>

  <div>
    <div class="text">비슷한 선수들</div>
    <table class="table">
      <tr class="th">
        <th class="border">  </th>
        <th class="border">이름</th>
        <th class="border">나이</th>
        <th class="border">경기 당 평균 득점</th>
        <th class="border">경기 당 평균 리바운드</th>
        <th class="border">경기 당 평균 어시스트</th>
        <th class="border">선수 공헌도</th>
        <th class="border">포지션</th>  
      </tr>
      <tr>
        <td class="border"><Avatar /></td>        
        <td class="border">aaaaa</td>
        <td class="border">30</td>
        <td class="border">24.6</td>
        <td class="border">10</td>
        <td class="border">11</td>
        <td class="border">14.3</td>
        <td class="border">포워드</td>
      </tr>
      <tr>
        <td class="border"><Avatar /></td>
        <td class="border">bbbbb</td>
        <td class="border">32</td>
        <td class="border">24.6</td>
        <td class="border">8.2</td>
        <td class="border">12.2</td>
        <td class="border">14.2</td>
        <td class="border">포워드</td>
      </tr>
      <tr>
        <td class="border"><Avatar /></td>
        <td class="border">ccccc</td>
        <td class="border">31</td>
        <td class="border">25.6</td>
        <td class="border">13.8</td>
        <td class="border">8.8</td>
        <td class="border">14.9</td>
        <td class="border">포워드</td>
      </tr>
    </table>
  </div>
</div>
  
  <style>  
    .name{
      font-size: 40px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }

    .overflow{
        height: 200px;
        width: 200px;
        overflow: auto;
    }
    
    .button{
      background-color: rgb(121 207 159);
      width: 130px;
      padding: 10px;
      border-radius: 10%;
    }
  
    .inlineflex{
      display: inline-flex;
      margin-top: 20px;
      margin-left: 375px;
    }
  
    .inquire{
      margin-left: 1100px;
      margin-top: -100px;
    }
  
    .image{
      width: 500px;
      height: 250px;
      background-color: rgb(225, 225, 190);
      text-align: center;
      font-size: 30px;
      line-height: 250px;
      margin: 0 auto;
    }
  
    .table{
      border: 1px solid black;
      margin-top: 30px;
      margin-left: 245px;
      width: 800px;
      height: 40px;
      line-height: 40px;
    }
  
    .border{
      border: 1px solid black;
      text-align: center;
    }
  
    .th{
      background-color: lightgray;
    }
  
    .body{
      overflow: auto;
      height: calc(100vh - 50px);
    }

    .text{
      text-align: center;
      margin-top: 20px;
      margin-bottom: 5px;
      font-weight: bold;
    }
  </style> 