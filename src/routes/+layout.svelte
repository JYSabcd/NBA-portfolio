<script lang="ts">
  import "../app.postcss";
  import { Button, Dropdown, DropdownItem, Chevron } from 'flowbite-svelte'
</script>

<header>
    <a class="menu" href="/home"><img src="/logo-nba.svg" alt="logo-nba.svg" /></a>
    <a class="menu" href="/home">&#xd648;</a>
    <div class="menu">
        <Button class="menu"><Chevron><p class="fontsize">순위</p></Chevron></Button>
        <Dropdown headerClass = "line">
            <a href="teamranking">
                <DropdownItem>팀순위</DropdownItem>
            </a>
            <a href="playerranking">
                <DropdownItem>개인순위</DropdownItem>
            </a>
        </Dropdown>
    </div>
    <div class="menu">
        <Button class="menu"><Chevron><p class="fontsize">선수 정보</p></Chevron></Button>
        <Dropdown >
            <a href="playerinformation">
                <DropdownItem>선수 세부 정보</DropdownItem>
            </a>
            <a href="compareplayer">
                <DropdownItem>선수 비교하기</DropdownItem>
            </a>
        </Dropdown>
    </div>
    <div class="menu">
        <Button class="menu"><Chevron><p class="fontsize">선수 분석</p></Chevron></Button>
        <Dropdown >
            <a href="playerprediction">
                <DropdownItem>다음 시즌 예측하기</DropdownItem>
            </a>
            <a href="showsimilarplayers">
                <DropdownItem>비슷한 선수 보여주기</DropdownItem>
            </a>
        </Dropdown>
    </div>
    <a class="menu" href="/timeformatch">경기 기록보기</a>
  </header>
<main>
  <div id="container">
    <slot />
  </div>
</main>

<style>
  header {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 0px calc((100vw - 1300px) / 2);
    background-color: black;
  }
  .menu {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    flex-grow: 1;
    color: white;
    background-color: black;
    text-align: center;
    font-size: 18px;
    transition: 0.3s;
  }
  a {
    text-decoration: none;
  }
  main {
    overflow: auto;
    width: 100vw;
    /* background-color: rgba(197, 253, 253, 0.61); */
    background-color: white;
  }
  #container {
    margin: auto;
    width: 100%;
    max-width: 1300px;
    height: calc(100vh - 50px);
    background-color: white;
  }
  .menu:hover {
    cursor: pointer;
  }

  .fontsize{
    font-size: 18px;
  }
</style>
