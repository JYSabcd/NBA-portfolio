<script lang="ts">

</script>

<body class="body">
    <div>
        <div class="title">오늘의 경기</div>
        <div class="title">MM/DD</div>
        <div class="imagecenter">
            <img src="/TeamLogo/1610612737.svg" alt="DEN.svg" class="image">
            <div class="title inlineblock">A 팀 VS B 팀</div>
            <img src="/TeamLogo/1610612738.svg" alt="LAL.svg" class="image">
        </div>
        <img src="/basketballcourt.jpg" alt="basketballcourt.jpg" class="court">
    </div>

    <input class="center" type="range" min="0" max="48" list="tickmarks">
    <datalist id="tickmarks">
        <option value="0">시작</option>
        <option value="12">1Q 끝</option>
        <option value="24">2Q 끝</option>
        <option value="36">3Q 끝</option>
        <option value="48">4Q 끝</option>
    </datalist>

    <div class="tposition">
        <div class="title">A 팀</div>
        <table>
            <tr>
                <th>
                    선수 이름
                </th>
                <th>
                    출전시간
                </th>
                <th>
                    득점
                </th>
                <th>
                    리바운드
                </th>
                <th>
                    어시스트
                </th>
                <th>
                    스틸
                </th>
                <th>
                    블록
                </th>
                <th>
                    야투율
                </th>
                <th>
                    3점 성공률
                </th>
            </tr>
            <tr>
                <td>aaaa</td>
                <td>1111</td>
                <td>2222</td>
                <td>3333</td>
                <td>4444</td>
                <td>5555</td>
                <td>6666</td>
                <td>7777</td>
                <td>8888</td>
            </tr>
            <tr>
                <td>bbbb</td>
                <td>1111</td>
                <td>2222</td>
                <td>3333</td>
                <td>4444</td>
                <td>5555</td>
                <td>6666</td>
                <td>7777</td>
                <td>8888</td>
            </tr>
            <tr>
                <td>cccc</td>
                <td>1111</td>
                <td>2222</td>
                <td>3333</td>
                <td>4444</td>
                <td>5555</td>
                <td>6666</td>
                <td>7777</td>
                <td>8888</td>
            </tr>
            <tr>
                <td>dddd</td>
                <td>1111</td>
                <td>2222</td>
                <td>3333</td>
                <td>4444</td>
                <td>5555</td>
                <td>6666</td>
                <td>7777</td>
                <td>8888</td>
            </tr>
            <tr>
                <td>eeee</td>
                <td>1111</td>
                <td>2222</td>
                <td>3333</td>
                <td>4444</td>
                <td>5555</td>
                <td>6666</td>
                <td>7777</td>
                <td>8888</td>
            </tr>
        </table>
    </div>
    <div class="tposition">
        <div class="title">B 팀</div>
        <table>
            <tr>
                <th>
                    선수 이름
                </th>
                <th>
                    출전시간
                </th>
                <th>
                    득점
                </th>
                <th>
                    리바운드
                </th>
                <th>
                    어시스트
                </th>
                <th>
                    스틸
                </th>
                <th>
                    블록
                </th>
                <th>
                    야투율
                </th>
                <th>
                    3점 성공률
                </th>
            </tr>
            <tr>
                <td>aaaa</td>
                <td>1111</td>
                <td>2222</td>
                <td>3333</td>
                <td>4444</td>
                <td>5555</td>
                <td>6666</td>
                <td>7777</td>
                <td>8888</td>
            </tr>
            <tr>
                <td>bbbb</td>
                <td>1111</td>
                <td>2222</td>
                <td>3333</td>
                <td>4444</td>
                <td>5555</td>
                <td>6666</td>
                <td>7777</td>
                <td>8888</td>
            </tr>
            <tr>
                <td>cccc</td>
                <td>1111</td>
                <td>2222</td>
                <td>3333</td>
                <td>4444</td>
                <td>5555</td>
                <td>6666</td>
                <td>7777</td>
                <td>8888</td>
            </tr>
            <tr>
                <td>dddd</td>
                <td>1111</td>
                <td>2222</td>
                <td>3333</td>
                <td>4444</td>
                <td>5555</td>
                <td>6666</td>
                <td>7777</td>
                <td>8888</td>
            </tr>
            <tr>
                <td>eeee</td>
                <td>1111</td>
                <td>2222</td>
                <td>3333</td>
                <td>4444</td>
                <td>5555</td>
                <td>6666</td>
                <td>7777</td>
                <td>8888</td>
            </tr>
        </table>
    </div>
</body>

<style>
    datalist{
        display: grid;
        grid-auto-flow: column;
        width:100%;
        text-align: center;
        }

    .title{
        font-weight: bold;
        font-size: 20px;
    }

    .center{
        margin: 0 auto;
        width: 100%;
    }

    .imagecenter{
        display: inline-block;
        margin-left: 480px;
    }

    .title{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-top: 20px;
    }

    .inlineblock{
        display: inline-block;
    }

    .court{
        display: inline-block;
        width: 70%;
        height: 10%;
        margin-left: 200px;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .center{
        display: flex;
        left: 50%;
        width: 90%;
    }

    table{
        min-width: 70%;
        padding-left: 5px;
        padding-right: 5px;
        border: 1px solid black;
        border-collapse: collapse;
        margin: 20px auto;
    }
    .tposition{
        margin: 50px auto;
    }

    .image{
        display: inline-block;
        width: 100px;
        height: 100px;
    }

    .body{
        overflow: auto;
        height: calc(100vh - 50px);
    }

    tr{
        transition: 0.3s;
    }

    tr:hover{
        background-color: #D0E3ED;
        cursor:pointer;
    }

    th{
        background-color: rgb(229,231,235);
    }

    td{
        text-align: center;
    }

    td,th{
        border: 1px solid black;
        min-width: 100px;
    }

    th:hover{
        background-color: #D0E3ED;
    }
</style>