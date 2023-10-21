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
//     let URL = "https://stats.nba.com/stats/leaguedashplayerbiostats?PerMode=PerGame&SeasonType=Regular+Season"
//         + "&Season=" + url.searchParams.get('Season')
//         + "&TeamID=" + url.searchParams.get('TeamID');

//     const res = await fetch(URL, options);
//     const ResJson = await res.json();

//     //console.log(ResJson);
//     //console.log(ResJson.resultSets[0].headers);
//     // console.log(ResJson.resultSets[0].rowSet);

//     /** @type {(number|string)[][]} */
//     let rowSet = ResJson.resultSets[0].rowSet;

//     /** @type {(number|string)[][]} */
//     let ReturnData: (number|string)[][] = [];

//     for(let i = 0; i < rowSet.length; i++){
//         /** @type {(number|string)[]} */
//         let rowData = [];

//         rowData.push(rowSet[i][1]); //  PLAYER_NAME
//         rowData.push(rowSet[i][0]); //  PLAYER_ID
        
//         ReturnData.push(rowData);
//     }

//     return json(ReturnData);
// }

import { Hono } from 'hono'
import { headersOption } from './setting'

const api = new Hono()

api.get('/api/playerrosters', async c => {
    const reqUrl = new URL(c.req.url)
    const url = new URL('https://stats.nba.com/stats/leaguedashplayerbiostats?PerMode=PerGame&SeasonType=Regular+Season')
    url.searchParams.append('Season', reqUrl.searchParams.get('Season') ?? '')
    url.searchParams.append('TeamID', reqUrl.searchParams.get('TeamID') ?? '')

    const res = await fetch(url, headersOption);
    const ResJson = await res.json();

    //console.log(ResJson);
    //console.log(ResJson.resultSets[0].headers);
    // console.log(ResJson.resultSets[0].rowSet);

    const rowSet:(number|string)[][] = ResJson.resultSets[0].rowSet;

    const ReturnData: (number|string)[][] = [];

    for(let i = 0; i < rowSet.length; i++){
        let rowData:(number|string)[] = [];

        rowData.push(rowSet[i][1]); //  PLAYER_NAME
        rowData.push(rowSet[i][0]); //  PLAYER_ID
        
        ReturnData.push(rowData);
    }

    return c.json(ReturnData);
})

export default api