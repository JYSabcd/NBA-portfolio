<script lang="ts">
</script>
    <h1 class="YYMMDD">2023년 6월 10일</h1>

    <div>
        <div class="day sunday">일</div>
        <div class="day">월</div>
        <div class="day">화</div>
        <div class="day">수</div>
        <div class="day">목</div>
        <div class="day">금</div>
        <div class="day saturday today">토</div>
    </div>
    
    <div>
        <div class="mvptitle">오늘의 MVP</div>
        <div class="mvpPT">
            <br>
            <strong>득점</strong><br>
            Devin Booker 33.7<br>
            Anthony Edwards 31.6<br>
            Stephen Curry 30.5<br>
            Nikola Jokic 29.9<br>   
            Trae Young 29.2</div>
        <div class="mvpREB">
            <br>
            <strong>리바운드</strong><br>
            1. Anthony Davis 14.1<br>
            2. Nikola Jokic 13.3<br>
            3. Kevon Looney 13.1<br>
            4. Rudy Gobert 12.2<br>
            5. Domantas Sabonis 11.0
        </div>
        <div class="mvpAST">
            <br>
            <strong>어시스트</strong><br>
            1. Nikola Jokic 10.3<br>
            2. Trae Young 10.2<br>
            3. James Harden 8.3<br>
            4. Jrue Holiday 8.0<br>
            5. De'Aaron Fox 7.7
        </div>
        <div class="mvpBLK">
            <br>
            <strong>블락</strong><br>
            1. Anthony Davis 3.1<br>
            2. Joel Embiid 2.8<br>
            3. Anthony Edwards 2.0<br>
            3. Jaren Jackson Jr. 2.0<br>
            5. Brook Lopez 1.8
        </div>
        <div class="mvpSTL">
            <br>
            <strong>스틸</strong><br>
            1. De'Aaron Fox 2.1<br>
            1. Jimmy Butler 2.1<br>
            3. Donovan Mitchell 2.0<br>
            3. Dejounte Murray 2.0<br>
            5. James Harden 1.8<br>  
        </div>
        <div class="mvpFTP">
            <br>
            <strong>야투율</strong><br>
            1. Nic Claxton 72.0<br>
            2. Rudy Gobert 63.0<br>
            3. Jarrett Allen 61.1<br>
            4. Clint Capela 60.5<br>
            5. Devin Booker 58.5<br>
        </div> 
    </div>
    
<style>
    .YYMMDD{
        display: inline-flex;
        width: 150px;
        height: 60px;
        background-color: skyblue;
        line-height: 60px;
        text-align: center;
        font-weight: 400;
        font-size: 15px;
        margin: 10px;
    }

    .day{
        display: inline-block;
        width: 90px;
        height: 60px;
        font-weight: 400;
        font-size: 20px;
        text-align: center;
        line-height: 60px;
        margin-top: 30px;
        border: 1px solid black;
        margin: 10px;
        justify-content: center;
    }

    .sunday{
        color: red;
    }

    .saturday{
        color: blue;
    }

    .mvptitle{
        width: 145px;
        height: 50px;
        padding: 15px;
        left: 1400px;
        top: 100px;
        left: 1300px;
        font-family: 'Inter';
        font-style: bold;
        font-weight: 700;
        font-size: 25px;
        line-height: 30px;
        display:inline-flex;
        align-items: center;
        text-align: center;
        color: #000000;
        background-color: rgba(233, 240, 140, 0.61);;
    }

    .mvpPT{
        display:inline-flex;
        text-align: center;
        width: 280px;
        height: 170px;
        left: 1000px;
        top: 200px;
        background: rgba(255, 138, 138, 0.61);
        border-radius: 50px;
        text-align: center;
    }

    .mvpREB{
        display:inline-flex;
        text-align: center;
        width: 280px;
        height: 170px;
        left: 1500px;
        top: 200px;
        background: rgba(255, 194, 138, 0.61);
        border-radius: 50px;
    }

    .mvpAST{
        display:inline-flex;
        text-align: center;
        width: 280px;
        height: 170px;
        left: 1000px;
        top: 450px;
        background: rgba(248, 231, 87, 0.6);
        border-radius: 50px;
    }

    .mvpBLK{
        display:inline-flex;
        text-align: center;
        width: 280px;
        height: 170px;
        left: 1500px;
        top: 450px;
        background: rgba(162, 255, 138, 0.61);
        border-radius: 50px;
    }
    
    .mvpSTL{
        display:inline-flex;
        text-align: center;
        width: 280px;
        height: 170px;
        left: 1000px;
        top: 700px;
        background: rgba(138, 171, 255, 0.61);
        border-radius: 50px;
    }

    .mvpFTP{
        display:inline-flex;
        text-align: center;
        width: 280px;
        height: 170px;
        left: 1500px;
        top: 700px;
        background: rgba(218, 138, 255, 0.61);
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