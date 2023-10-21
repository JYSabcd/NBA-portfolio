// import { json } from '@sveltejs/kit';

// const headersList = {
//     'Host': 'stats.nba.com',
//     'Referer': 'https://www.nba.com',
//     'Origin': 'https://stats.nba.com/',
//     'x-nba-stats-origin': 'stats',
//     'x-nba-stats-token': 'true',
//     'Cache-Control': 'max-age=0',
//     'Upgrade-Insecure-Requests': '1',
//     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
//     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8,application/signed-exchange;v=b3',
//     'Accept-Encoding': 'gzip, deflate, br',
//     'Accept-Language': 'en-US,en;q=0.9',
//     };

// const options = {
//     method: 'GET',
//     headers: headersList
// };

// /** @type {import('./$types').RequestHandler} */
// export async function GET({url}) {
//     let URL = "https://stats.nba.com/stats/playerdashboardbygeneralsplits?LastNGames=0&LeagueID=00&MeasureType=Base&Month=0&OpponentTeamID=0&PaceAdjust=N&Period=0&PerMode=PerGame&PlusMinus=N&PORound=0&Rank=N&Split=general&SeasonType=Regular+Season"
//         + "&Season=" + url.searchParams.get('Season')
//         + "&PlayerID=" + url.searchParams.get('PlayerID');

//     const res = await fetch(URL, options);
//     const ResJson = await res.json();

//     //console.log(ResJson);
//     //console.log(ResJson.resultSets[0].headers);
//     // console.log(ResJson.resultSets[0].rowSet);

//     /** @type {(number|string)[][]} */
//     let rowSet = ResJson.resultSets[0].rowSet;

//     /** @type {(number|string)[][]} */
//     let ReturnData: (number|string)[] = [];

//     //  rowSet 에서 첫 배열 값만 사용한다. api 호출이 정상이라면 값은 한 개 다.
//     ReturnData.push(rowSet[0][6]); //  MIN
//     ReturnData.push(rowSet[0][26]); // PTS
//     ReturnData.push(rowSet[0][18]); // REB
//     ReturnData.push(rowSet[0][19]); // AST
//     ReturnData.push(rowSet[0][21]); // STL
//     ReturnData.push(rowSet[0][22]); // BLK

//     return json(ReturnData);
// }
import { Hono } from 'hono'
import { headersOption } from './setting'

const api = new Hono()

api.get('/api/playerstats', async c => {
    const reqUrl = new URL(c.req.url)
    const url = new URL("https://stats.nba.com/stats/playerdashboardbygeneralsplits?LastNGames=0&LeagueID=00&MeasureType=Base&Month=0&OpponentTeamID=0&PaceAdjust=N&Period=0&PerMode=PerGame&PlusMinus=N&PORound=0&Rank=N&Split=general&SeasonType=Regular+Season")
    url.searchParams.append('Season', reqUrl.searchParams.get('Season') ?? '')
    url.searchParams.append('PlayerID', reqUrl.searchParams.get('PlayerID') ?? '')

    const res = await fetch(url, headersOption);
    const ResJson = await res.json();

    //console.log(ResJson);
    //console.log(ResJson.resultSets[0].headers);
    // console.log(ResJson.resultSets[0].rowSet);

    const rowSet:(number|string)[][] = ResJson.resultSets[0].rowSet;
    const ReturnData: (number|string)[] = [];

    //  rowSet 에서 첫 배열 값만 사용한다. api 호출이 정상이라면 값은 한 개 다.
    // MIN, PTS, REB, AST, STL, BLK
    for(const i of [6, 26, 18, 19, 21, 22]){
        ReturnData.push(rowSet[0][i])
    }

    return c.json(ReturnData);
})

export default api