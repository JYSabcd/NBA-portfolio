<script lang="ts">
    import { Button, Dropdown, DropdownItem, Chevron } from 'flowbite-svelte'
</script>

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
      <DropdownItem>애틀랜타 호크스</DropdownItem>
      <DropdownItem>브루클린 네츠</DropdownItem>
      <DropdownItem>보스턴 셀틱스</DropdownItem>
      <DropdownItem>샬럿 호네츠</DropdownItem>
      <DropdownItem>시카고 불스</DropdownItem>
      <DropdownItem>클리블랜드 캐벌리어스</DropdownItem>
      <DropdownItem>댈러스 매버릭스</DropdownItem>
      <DropdownItem>덴버 너게츠</DropdownItem>
      <DropdownItem>디트로이트 피스톤스</DropdownItem>
      <DropdownItem>골든 스테이트 워리어스</DropdownItem>
      <DropdownItem>휴스턴 로케츠</DropdownItem>
      <DropdownItem>인디애나 페이서스</DropdownItem>
      <DropdownItem>LA 클리퍼스</DropdownItem>
      <DropdownItem>LA 레이커스</DropdownItem>
      <DropdownItem>멤피스 그리즐리즈</DropdownItem>
      <DropdownItem>마이애미 히트</DropdownItem>
      <DropdownItem>밀워키 벅스</DropdownItem>
      <DropdownItem>미네소타 팀버울브스</DropdownItem>
      <DropdownItem>뉴올리언스 펠리컨스</DropdownItem>
      <DropdownItem>뉴욕 닉스</DropdownItem>
      <DropdownItem>오클라호마시티 썬더</DropdownItem>
      <DropdownItem>올랜도 매직</DropdownItem>
      <DropdownItem>필라델피아 세븐티식서스</DropdownItem>
      <DropdownItem>피닉스 썬즈</DropdownItem>
      <DropdownItem>포틀랜드 트레일 블레이저스</DropdownItem>
      <DropdownItem>새크라멘토 킹스</DropdownItem>
      <DropdownItem>샌안토니오 스퍼스</DropdownItem>
      <DropdownItem>토론토 랩터스</DropdownItem>
      <DropdownItem>유타 재즈</DropdownItem>
      <DropdownItem>워싱턴 위자드</DropdownItem>
    </Dropdown>
</div>  
<button class="button" on:click={() => (alert('조회하기'))}>
  조회하기
</button>
  <style>
    .overflow{
        height: 200px;
        width: 200px;
        overflow: auto;
    }
    
    .button{
      background-color: yellowgreen;
      padding: 10px;
      border-radius: 10%;
    }
  </style>