<script lang="ts">

</script>

<body class="backgroundimage">
    <div>
        <div class="title">오늘의 경기</div>
        <div class="title">MM/DD</div>
        <div><img src="/DEN.svg" alt="DEN.svg"><div class="title">A 팀 VS B 팀</div><img src="/LAL.svg" alt="LAL.svg"></div>
    </div>
    <div>
        <input class="center" type="range" min="1" max="48" step="1">
    </div>
    <div class="tposition">
        A 팀
        <table>
            <tr>
                <td class="table">
                    선수 이름
                </td>
                <td class="table">
                    출전시간
                </td>
                <td class="table">
                    득점
                </td>
                <td class="table">
                    리바운드
                </td>
                <td class="table">
                    어시스트
                </td>
                <td class="table">
                    스틸
                </td>
                <td class="table">
                    블록
                </td>
                <td class="table">
                    야투율
                </td>
                <td class="table">
                    3점 성공률
                </td>
            </tr>
            <tr>
                <td class="table">aaaa</td>
                <td class="table">1111</td>
                <td class="table">2222</td>
                <td class="table">3333</td>
                <td class="table">4444</td>
                <td class="table">5555</td>
                <td class="table">6666</td>
                <td class="table">7777</td>
                <td class="table">8888</td>
            </tr>
            <tr>
                <td class="table">bbbb</td>
                <td class="table">1111</td>
                <td class="table">2222</td>
                <td class="table">3333</td>
                <td class="table">4444</td>
                <td class="table">5555</td>
                <td class="table">6666</td>
                <td class="table">7777</td>
                <td class="table">8888</td>
            </tr>
            <tr>
                <td class="table">cccc</td>
                <td class="table">1111</td>
                <td class="table">2222</td>
                <td class="table">3333</td>
                <td class="table">4444</td>
                <td class="table">5555</td>
                <td class="table">6666</td>
                <td class="table">7777</td>
                <td class="table">8888</td>
            </tr>
            <tr>
                <td class="table">dddd</td>
                <td class="table">1111</td>
                <td class="table">2222</td>
                <td class="table">3333</td>
                <td class="table">4444</td>
                <td class="table">5555</td>
                <td class="table">6666</td>
                <td class="table">7777</td>
                <td class="table">8888</td>
            </tr>
            <tr>
                <td class="table">eeee</td>
                <td class="table">1111</td>
                <td class="table">2222</td>
                <td class="table">3333</td>
                <td class="table">4444</td>
                <td class="table">5555</td>
                <td class="table">6666</td>
                <td class="table">7777</td>
                <td class="table">8888</td>
            </tr>
        </table>
    </div>
    <div class="tposition">
        B 팀
        <table>
            <tr>
                <td class="table">
                    선수 이름
                </td>
                <td class="table">
                    출전시간
                </td>
                <td class="table">
                    득점
                </td>
                <td class="table">
                    리바운드
                </td>
                <td class="table">
                    어시스트
                </td>
                <td class="table">
                    스틸
                </td>
                <td class="table">
                    블록
                </td>
                <td class="table">
                    야투율
                </td>
                <td class="table">
                    3점 성공률
                </td>
            </tr>
            <tr>
                <td class="table">aaaa</td>
                <td class="table">1111</td>
                <td class="table">2222</td>
                <td class="table">3333</td>
                <td class="table">4444</td>
                <td class="table">5555</td>
                <td class="table">6666</td>
                <td class="table">7777</td>
                <td class="table">8888</td>
            </tr>
            <tr>
                <td class="table">bbbb</td>
                <td class="table">1111</td>
                <td class="table">2222</td>
                <td class="table">3333</td>
                <td class="table">4444</td>
                <td class="table">5555</td>
                <td class="table">6666</td>
                <td class="table">7777</td>
                <td class="table">8888</td>
            </tr>
            <tr>
                <td class="table">cccc</td>
                <td class="table">1111</td>
                <td class="table">2222</td>
                <td class="table">3333</td>
                <td class="table">4444</td>
                <td class="table">5555</td>
                <td class="table">6666</td>
                <td class="table">7777</td>
                <td class="table">8888</td>
            </tr>
            <tr>
                <td class="table">dddd</td>
                <td class="table">1111</td>
                <td class="table">2222</td>
                <td class="table">3333</td>
                <td class="table">4444</td>
                <td class="table">5555</td>
                <td class="table">6666</td>
                <td class="table">7777</td>
                <td class="table">8888</td>
            </tr>
            <tr>
                <td class="table">eeee</td>
                <td class="table">1111</td>
                <td class="table">2222</td>
                <td class="table">3333</td>
                <td class="table">4444</td>
                <td class="table">5555</td>
                <td class="table">6666</td>
                <td class="table">7777</td>
                <td class="table">8888</td>
            </tr>
        </table>
    </div>
</body>

<style>
    .title{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-top: 20px;
    }

    .backgroundimage{
        background-image: url(https://img.freepik.com/premium-vector/basketball-court-floor-wi-line-on-wood-texture-background_64749-2679.jpg);
        background-position: center;
        height: 35%;
        width: 90%;        
    }

    .center{
        display: flex;
        left: 50%;
        width: 90%;
    }

    .table{
        display: inline-flex;
        padding-left: 5px;
        padding-right: 5px;
        width: 95px;
        justify-content: center;
        border: 1px solid black;
        border-collapse: collapse;
    }
    .tposition{
        margin-top: 200px;
    }
</style>