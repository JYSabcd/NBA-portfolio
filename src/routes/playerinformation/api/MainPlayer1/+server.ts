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
    let URL = "https://stats.nba.com/stats/commonplayerinfo?"
    +"PlayerID="+url.searchParams.get('PlayerID');

    const res = await fetch(URL, options);
    const ResJson = await res.json();

    //console.log(ResJson);
    //console.log(ResJson.resultSets[0].headers);
    // console.log(ResJson.resultSets[0].rowSet);

    /** @type {(number|string)[][]} */
    let rowSet = ResJson.resultSets[0].rowSet;

    /** @type {(number|string)[][]} */
    let ReturnData: (number|string)[] = [];

    //  rowSet 에서 첫 배열 값만 사용한다. api 호출이 정상이라면 값은 한 개 다.
    ReturnData.push(rowSet[0][0]); //  PERSON_ID (PlayerID)
    ReturnData.push(rowSet[0][3]); //  DISPLAY_FIRST_LAST
    ReturnData.push(rowSet[0][11]); // HEIGHT
    ReturnData.push(rowSet[0][12]); // WEIGHT
    ReturnData.push(rowSet[0][7]); // BIRTHDATE
    ReturnData.push(rowSet[0][9]); // COUNTRY
    ReturnData.push(rowSet[0][14]); // JERSEY 등번호
    ReturnData.push(rowSet[0][15]); // POSITION
    ReturnData.push(rowSet[0][13]); // SEASON_EXP
    return json(ReturnData);
}
