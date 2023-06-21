<header>
    <a class="menu" href="/"><img src="/logo-nba.svg" alt="logo-nba.svg"></a>
    <a class="menu" href="/home">홈</a>
    <a class="menu" href="/teamranking">순위</a>
    <a class="menu" href="/home">선수 정보</a>
    <a class="menu" href="/home">예측 & 비슷한 선수 보여주기</a>
    <a class="menu" href="/home">경기 시간별로 보여주기</a>
</header>
<main>
    <div id="container">
        <slot />
    </div>
</main>

<style>
    header{
        display: flex;
        justify-content: space-between;
        gap:10px;
        padding: 0px calc((100vw - 1300px)/2);
        background-color: black;
    }
    .menu{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        flex-grow: 1;
        color: white;
        background-color: black;
        text-align: center;
        font-size: 20px;
    }
    a{
        text-decoration: none;
    }
    main{
        width:100%;
        background-color: rgba(197, 253, 253, 0.61);
    }
    #container{
        overflow:hidden;
        margin:auto;
        width:100%;
        max-width: 1300px;
        height:calc(100vh - 50px);
        background-color: white;
    }
    .menu:hover{
        background-color: lightyellow;
        color: black;
        cursor: pointer;
    }
</style>