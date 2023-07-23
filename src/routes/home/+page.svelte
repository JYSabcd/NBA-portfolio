<script lang="ts">
    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let day = today.getDay();  // 요일
</script>

<div>
    <h1 class="date">{year + '년 ' + month + '월 ' + date + '일'}</h1>

    <div>
        <table class="week">
            <tr class="border">
                <td class="day sunday">일</td>
                <td class="day">월</td>
                <td class="day">화</td>
                <td class="day">수</td>
                <td class="day">목</td>
                <td class="day">금</td>
                <td class="day saturday">토</td>
            </tr>
        </table>
    </div>
    
    <div class="mvptitle">오늘의 MVP</div>

    <div class="line">
        <div class="box mvpPT">
            <div class="title">득점</div>
            <div>1. Nikola Jokic DEN 28</div>
            <div>2. JImmy Butler MIA 21</div>
            <div>3. Bam Adebayo MIA 20</div>
            <div>4. Michael Porter Jr. DEN 16</div>
            <div>5. Jamal Murray  DEN 14</div>
        </div>
        <div class="box mvpREB">
            <div class="title">리바운드</div>
            <div>1. Nikola Jokic DEN 28</div>
            <div>2. JImmy Butler MIA 21</div>
            <div>3. Bam Adebayo MIA 20</div>
            <div>4. Michael Porter Jr. DEN 16</div>
            <div>5. Jamal Murray  DEN 14</div>
        </div>
        <div class="box mvpAST">
            <div class="title">어시스트</div>
            <div>1. Nikola Jokic DEN 28</div>
            <div>2. JImmy Butler MIA 21</div>
            <div>3. Bam Adebayo MIA 20</div>
            <div>4. Michael Porter Jr. DEN 16</div>
            <div>5. Jamal Murray  DEN 14</div>
        </div>
    </div>
    
    <div class="line">
        <div class="box mvpBLK">
            <div class="title">블록</div>
            <div>1. Nikola Jokic DEN 28</div>
            <div>2. JImmy Butler MIA 21</div>
            <div>3. Bam Adebayo MIA 20</div>
            <div>4. Michael Porter Jr. DEN 16</div>
            <div>5. Jamal Murray  DEN 14</div>
        </div>
        <div class="box mvpSTL">
            <div class="title">스틸</div>
            <div>1. Nikola Jokic DEN 28</div>
            <div>2. JImmy Butler MIA 21</div>
            <div>3. Bam Adebayo MIA 20</div>
            <div>4. Michael Porter Jr. DEN 16</div>
            <div>5. Jamal Murray  DEN 14</div>
        </div>
        <div class="box mvpFTP">
            <div class="title">판타지 포인트</div>
            <div>1. Nikola Jokic DEN 28</div>
            <div>2. JImmy Butler MIA 21</div>
            <div>3. Bam Adebayo MIA 20</div>
            <div>4. Michael Porter Jr. DEN 16</div>
            <div>5. Jamal Murray  DEN 14</div>
        </div> 
    </div>
</div>
    
<style>
    .date{
        display: inline-flex;
        width: 150px;
        height: 60px;
        background-color: skyblue;
        line-height: 60px;
        justify-content: center;
        font-weight: 18px;
        font-size: 15px;
        margin: 30px;
        border-radius: 10px;
    }

    .week{
        margin: 30px auto;
        text-align: center;
    }
    
    .line{
        display: flex;
    }

    .title{
        font-size: 20px;
        font-weight: bold;
    }

    .box{
        width: 300px;
        height: 180px;
        margin: 30px auto;
        text-align: center;
        border-radius: 30px;
    }

    .day{
        display: inline-flex;
        width: 70px;
        height: 60px;
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        line-height: 60px;
        justify-content: center;
    }

    tr{
        border: 1px solid black;
    }

    .sunday{
        color: red;
    }

    .saturday{
        color: blue;
    }

    .mvptitle{
        margin: 20px auto;
        width: 200px;
        height: 100px;
        line-height: 100px;
        font-family: 'Inter';
        font-weight: bold;
        text-align: center;
        justify-content: center;
        font-size: 25px;
        background-color: #FCCEE2;
        border-radius: 20px;
    }

    .mvpPT{
        text-align: center;
        background: #FDB7BA;
        border-radius: 50px;
    }

    .mvpREB{
        text-align: center;
        background: #F3CDAD;
        border-radius: 50px;
    }

    .mvpAST{
        text-align: center;
        background: #FCFFB0;
        border-radius: 50px;
    }

    .mvpBLK{
        text-align: center;
        background: #AFFFBA;
        border-radius: 50px;
    }
    
    .mvpSTL{
        text-align: center;
        background: #98BBEB;
        border-radius: 50px;
    }

    .mvpFTP{
        text-align: center;
        background: #E2B9FF;
        border-radius: 50px;
    }

    .day:hover{
        background-color: rgb(224, 202, 202);
        cursor: pointer;
    }
    .sunday:hover{
        background-color: rgb(224, 202, 202);
        cursor: pointer;
    }
    .saturday:hover{
        background-color: rgb(224, 202, 202);
        cursor: pointer;
    }

    .day:active{
        background-color: rgb(145, 172, 223);
        cursor: pointer;
    }
    .sunday:active{
        background-color: rgb(145, 172, 223);
        cursor: pointer;
    }
    .saturday:active{
        background-color: rgb(145, 172, 223);
        cursor: pointer;
    }
</style>