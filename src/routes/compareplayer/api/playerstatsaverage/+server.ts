import { json } from '@sveltejs/kit';

const headersList = {
    'Host': 'stats.nba.com',
    'Referer': 'https://www.nba.com',
    'Origin': 'https://stats.nba.com/',
    'x-nba-stats-origin': 'stats',
    'x-nba-stats-token': 'true',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    };

const options = {
    method: 'GET',
    headers: headersList
};

/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {
    let URL = "https://stats.nba.com/stats/leaguedashplayerstats?LastNGames=0&LeagueID=00&MeasureType=Base&Month=0&OpponentTeamID=0&PaceAdjust=N&Period=0&PerMode=PerGame&PlusMinus=N&PORound=0&Rank=N&SeasonType=Regular+Season&TeamID=0&TwoWay=0"
    +'&Season=' + url.searchParams.get('Season')
    const res = await fetch(URL, options);
    const ResJson = await res.json();

    // console.log(ResJson);
    //console.log(ResJson.resultSets[0].headers);
    // console.log(ResJson.resultSets[0].rowSet);

    /** @type {(number|string)[][]} */
    let rowSet = ResJson.resultSets[0].rowSet;

    let PlayerCount = 0;
    let accMIN = 0;
    let accPTS = 0;
    let accREB = 0;
    let accAST = 0;
    let accSTL = 0;
    let accBLK = 0;

    for(let i = 0; i < rowSet.length; i++){
        if(rowSet[i][6] < 58){ // 58경기 미만인 선수들 버림
            continue;
        }

        accMIN += rowSet[i][10]; // MIN
        accPTS += rowSet[i][30]; // PTS
        accREB += rowSet[i][22]; // REB
        accAST += rowSet[i][23]; // AST
        accSTL += rowSet[i][25]; // STL
        accBLK += rowSet[i][26]; // BLK
        PlayerCount += 1; // 선수가 들어올 때 한명씩 더함
    }

    let ReturnData = [];

    if(PlayerCount === 0){
        ReturnData = [0,0,0,0,0,0];
    }
    else{
        ReturnData = [
            (accMIN/PlayerCount).toFixed(1),
            (accPTS/PlayerCount).toFixed(1),
            (accREB/PlayerCount).toFixed(1),
            (accAST/PlayerCount).toFixed(1),
            (accSTL/PlayerCount).toFixed(1),
            (accBLK/PlayerCount).toFixed(1)
        ]
    }

    return json(ReturnData);
}