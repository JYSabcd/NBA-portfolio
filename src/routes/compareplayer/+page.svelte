<script lang="ts">
</script>
<div>
    <div class="reset" on:click={() => alert("정말 선수들을 초기화하시겠습니까?")}>선수 초기화</div>
    
    <div class="NBAavarage"  on:click={() => alert("이 선수를 NBA 평균과 비교하시겠습니까?")}>NBA 평균</div>
</div>
<div>
    <div>
        <div class="text text1">선수1 이름 : @@@</div>
        <div class="text text2">선수2 이름 : ###</div>
    </div>

    <div>
        <div class="comparebox1" on:click={() => alert("팀, 연도, 선수를 선택해주세요")}>+</div>
        <table style="display: inline-flex;">
            <tbody class="font">
                <tr>
                    <td>평균 출전 시간</td>
                </tr>
                <tr>
                    <td>평균 득점</td>
                </tr>
                <tr>
                    <td>평균 리바운드</td>
                </tr>
                <tr>
                    <td>평균 어시스트</td>
                </tr>
                <tr>
                    <td>평균 스틸</td>
                </tr>
                <tr>
                    <td>평균 블록</td>
                </tr>
            </tbody>
        </table>
        <div class="comparebox2 " on:click={() => alert("팀, 연도, 선수를 선택해주세요")}>+</div>
    </div>
</div>


<style>
    .text{
        display: inline-flex;
        text-align: center; 
        align-items: center;
        font-size: 20px;
        font-weight: bold;
    }

    .text1{
        margin-left: 200px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .text2{
        margin-left: 470px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .comparebox1{
        display: inline-flex;
        background-color: darkgray;
        font-size: 200px;
        width: 400px;
        height: 500px;
        line-height: 300px;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 20%;
        margin-left: 100px;
    }

    .comparebox2{
        display: inline-flex;
        background-color: darkgray;
        font-size: 200px;
        width: 400px;
        height: 500px;
        line-height: 300px;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 20%;
        margin-left: 100px;
    }

    .comparebox1:hover{
        color: white;
        background-color: black;
        cursor: pointer;
    }

    .comparebox1:active{
        color: red;
        background-color: lightblue;
        cursor: wait;
    }

    .comparebox2:hover{
        color: white;
        background-color: black;
        cursor: pointer;
    }

    .comparebox2:active{
        color: red;
        background-color: lightblue;
        cursor: wait;
    }

    .reset{
        display:inline-flex;
        justify-content: center;
        width: 130px;
        height: 50px;
        line-height: 50px;
        left: 1500px;
        top: 200px;
        background: red;
        border-radius: 50px;
        margin-left: 950px;
        margin-top: 40px;
    }

    .reset:hover{
        cursor: pointer;
    }

    .reset:active{
        cursor: wait;
    }

    .NBAavarage{
        display:inline-flex;
        justify-content: center;
        width: 130px;
        height: 50px;
        line-height: 50px;
        left: 1500px;
        top: 200px;
        background-color: #57BD85;
        border-radius: 50px;
        margin-left:30px;
        margin-top: 40px;
    }

    .NBAavarage:hover{
        cursor: pointer;
    }

    .NBAavarage:active{
        cursor: wait;
    }

    .font{
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }
    
</style>