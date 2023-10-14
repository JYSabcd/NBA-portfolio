<script lang="ts">
  import "../app.postcss";
  import { Button, Dropdown, DropdownItem, Chevron } from "flowbite-svelte";

  let el_main:HTMLElement;

  function ScrollTop() {
    el_main.scrollTop = 0;
  }
</script>

<header>
  <div class="menucontainer">
  <div class="menu">
    <Button class="text-lg font-bold py-2" href="/home" on:click={ScrollTop}>
      <img class="logoimg" src="/Logo_BMW.png" alt="Logo_BMW" />
    </Button>
  </div>
  <div class="menu">
    <Button class="text-lg font-bold py-2" href="/home" on:click={ScrollTop}
      >홈</Button
    >
  </div>
  <div class="menu">
    <Button class="text-lg font-bold py-2"><Chevron>순위</Chevron></Button>
    <Dropdown class="z-50 hover:bg-gray-100">
      <DropdownItem
        class="text-base font-bold w-50 hover:bg-gray-300"
        href="/teamranking"
        on:click={ScrollTop}>팀 순위</DropdownItem
      >
      <DropdownItem
        class="text-base font-bold w-50 hover:bg-gray-300"
        href="/playerranking"
        on:click={ScrollTop}>개인 순위</DropdownItem
      >
    </Dropdown>
  </div>
  <div class="menu">
    <Button class="text-lg font-bold py-2"><Chevron>선수 정보</Chevron></Button>
    <Dropdown class="z-50">
      <DropdownItem
        class="text-base font-bold w-50 hover:bg-gray-300"
        href="/playerinformation"
        on:click={ScrollTop}>선수 세부 정보</DropdownItem
      >
      <DropdownItem
        class="text-base font-bold w-50 hover:bg-gray-300"
        href="/compareplayer"
        on:click={ScrollTop}>선수 비교하기</DropdownItem
      >
    </Dropdown>
  </div>
  <div class="menu">
    <Button class="text-lg font-bold py-2"><Chevron>선수 분석</Chevron></Button>
    <Dropdown class="z-50">
      <DropdownItem
        class="text-base font-bold w-50 hover:bg-gray-300"
        href="/playerprediction"
        on:click={ScrollTop}>다음 시즌 예측하기</DropdownItem
      >
      <DropdownItem
        class="text-base font-bold w-50 hover:bg-gray-300"
        href="/showsimilarplayers"
        on:click={ScrollTop}>비슷한 선수 보여주기</DropdownItem
      >
    </Dropdown>
  </div>
  <div class="menu">
    <Button
      class="text-lg font-bold py-2"
      href="/timeformatch"
      on:click={ScrollTop}>경기 기록보기</Button
    >
  </div>
</div>
</header>
<main bind:this={el_main}>
  <div id="container">
    <slot />
  </div>
</main>

<style>
  header {
    width: 100vw;
    background-color: black;
  }

  .menucontainer {
    display: flex;
    justify-content: space-evenly;
    width: 1300px;
    margin: 0px auto;
    background-color: black;
  }

  .menu {
    display: inline-flex;
    height: 50px;
    background-color: black;
    flex-grow: 1;
    justify-content: center;
    padding-top: 3px;
    padding-bottom: 3px;
  }
  .logoimg {
    height: 45px;
  }
  main {
    overflow: auto;
    width: 100vw;
    min-width: 1300px;
    /* background-color: rgba(197, 253, 253, 0.61); */
    background-color: white;
  }
  #container {
    margin: auto;
    width: 100%;
    max-width: 1300px;
    height: calc(100vh - 50px);
    background-color: rgb(246, 246, 246);
  }
</style>
