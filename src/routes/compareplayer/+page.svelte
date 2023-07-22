<script lang="ts">
</script>

<div class="body">
    <div class="white">

        <div class="button">
            <div class="NBAavarage" on:click={() => alert("이 선수를 NBA 평균과 비교하시겠습니까?")}>NBA 평균</div>
            <div class="reset" on:click={() => alert("정말 선수들을 초기화하시겠습니까?")}>선수 초기화</div>
        </div>

        <div class="flex">
            <div class="sun-container">
                <div class="text">선수1 이름 : Stephen Curry</div>
                <div>
                    <div class="comparebox" on:click={() => alert("팀, 연도, 선수를 선택해주세요")}>+</div>
                    <!-- <div class="image"><img src="https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png" alt="Player Headshot"></div> -->
                </div>
            </div>
    
            <div>
                <table class="table">
                    <tbody class="font">
                        <tr>
                            <td class="bigger">34.7</td>
                            <td>평균 출전 시간</td>
                            <td>34.6</td>
                        </tr>
                        <tr>
                            <td class="bigger">29.4</td>
                            <td>평균 득점</td>
                            <td>27.8</td>
                        </tr>
                        <tr>
                            <td class="bigger">6.1</td>
                            <td>평균 리바운드</td>
                            <td>4.5</td>
                        </tr>
                        <tr>
                            <td class="bigger">6.3</td>
                            <td>평균 어시스트</td>
                            <td>5.5</td>
                        </tr>
                        <tr>
                            <td>0.9</td>
                            <td>평균 스틸</td>
                            <td class="bigger">1.0</td>
                        </tr>
                        <tr>
                            <td class="bigger">0.4</td>
                            <td>평균 블록</td>
                            <td>0.3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="sun-container">
                <div class="text">선수2 이름 : Devin Booker</div>
                <div>
                    <div class="comparebox" on:click={() => alert("팀, 연도, 선수를 선택해주세요")}>+</div>
                    <!-- <div class="image"><img src="https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png" alt="Player Headshot"></div> -->
                </div>
            </div>
        </div>

    </div>
</div>
<style>
    .body {
        overflow: auto;
        height: calc(100vh - 50px);
        background-color: rgb(246, 246, 246);
    }

    .white {
        margin: 30px auto;
        padding: 20px 20px;
        width: 90%;
        justify-content: center;
        background-color: white;
        padding-bottom: 170px;
        border-radius: 20px;
    }

    .button{
        margin-left: 70%;
    }

    .text {
        text-align: center;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .table{
        width: 450px;
        margin: 150px auto;
    }

    .flex {
        display:flex;
        margin-top: 70px;
    }

    .sun-container{
        flex-grow: 1;
    }

    .comparebox {
        display: flex;
        background-color: rgb(206, 206, 206);
        font-size: 200px;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 20%;
        aspect-ratio: 1 / 1.3;
        transition: 0.3s;
    }

    .comparebox:hover {
        color: white;
        background-color: black;
        cursor: pointer;
    }

    .comparebox:active {
        color: blue;
        background-color: gray;
    }

    .reset {
        display: inline-flex;
        justify-content: center;
        width: 130px;
        height: 50px;
        line-height: 50px;
        top: 200px;
        background: #DB4455;
        border-radius: 50px;
        border: 1px solid black;
    }

    .reset:hover {
        cursor: pointer;
    }

    .reset:active {
        cursor: wait;
    }

    .NBAavarage {
        display: inline-flex;
        justify-content: center;
        width: 130px;
        height: 50px;
        line-height: 50px;
        top: 200px;
        background-color: #57bd85;
        border-radius: 50px;
        margin: 20px 30px;
        border: 1px solid black;
    }

    .NBAavarage:hover {
        cursor: pointer;
    }

    .NBAavarage:active {
        cursor: wait;
    }

    .font {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }

    .bigger {
        color: #DB4455;
    }

    td {
        width: 150px;
    }

    /* .image {
        width: 300px;
        background-color: rgb(233, 196, 240);
        padding-top: 30px;
        padding-bottom: 30px;
        margin-top: 30px;
        margin-left: 100px;
    } */
</style>
