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

// 반환된 전체 헤더
// ["GAME_ID","TEAM_ID","TEAM_ABBREVIATION","TEAM_CITY","PLAYER_ID","PLAYER_NAME","NICKNAME","START_POSITION","COMMENT",
// "MIN","FGM","FGA","FG_PCT","FG3M","FG3A","FG3_PCT","FTM","FTA","FT_PCT","OREB","DREB","REB","AST","STL","BLK","TO",
// "PF","PTS","PLUS_MINUS"]

/** @type {string[]} */
const arrHeader = ['TEAM_ID','PLAYER_ID','PLAYER_NAME','COMMENT','MIN','PTS','REB','AST','STL','BLK','FG_PCT','FG3_PCT'];


/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {
    try{

        let URL = "https://stats.nba.com/stats/boxscoretraditionalv2"
            + "?GameID=" + url.searchParams.get('GameID');
        const res = await fetch(URL, options);
        const ResJson = await res.json();
    
        /** @type {number[]} */
        let arrHeaderIndex: number[] = [];
        /** @type {(number|string)[][]} */
        let TableData: (number|string)[][] = [];
    
        /** @type {string[]} */
        let headers = [];
        headers = ResJson.resultSets[0].headers;
    
        for(let i = 0; i < arrHeader.length; i++){
            let index = headers.indexOf(arrHeader[i]);
    
            if(index === -1){
                console.error("헤더 이름을 찾지 못했다.", arrHeader[i]);
                index = 0;  //  배열 인덱스에 -1 이 들어가면 에러가 발생하므로 0으로 바꿔주자.. 하지만 잘못된 값을 참조할것이다.
            }
    
            arrHeaderIndex[i] = index;
        }
    
        /** @type {(number|string)[][]} */
        let rowSet = ResJson.resultSets[0].rowSet;
    
        for(let i = 0; i < rowSet.length; i++){
            /** @type {(number|string)[]} */
            let rowData = [];
    
            for(let j = 0; j < arrHeaderIndex.length; j++){
                rowData.push(rowSet[i][arrHeaderIndex[j]]);
            }
            
            TableData.push(rowData);
        }
    
        return json(TableData);
    } catch(err){
        return new Response(String(err), { status:500})
    }
}
