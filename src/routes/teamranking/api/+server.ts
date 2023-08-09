import { json } from '@sveltejs/kit';
import { ALL } from 'dns';

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
// ['TEAM_ID','TEAM_NAME','GP','W','L','W_PCT','MIN','FGM','FGA','FG_PCT','FG3M','FG3A','FG3_PCT'
// ,'FTM','FTA','FT_PCT','OREB','DREB','REB','AST','TOV','STL','BLK','BLKA','PF','PFD','PTS'
// ,'PLUS_MINUS','GP_RANK','W_RANK','L_RANK','W_PCT_RANK','MIN_RANK','FGM_RANK','FGA_RANK','FG_PCT_RANK'
// ,'FG3M_RANK','FG3A_RANK','FG3_PCT_RANK','FTM_RANK','FTA_RANK','FT_PCT_RANK','OREB_RANK','DREB_RANK','REB_RANK'
// ,'AST_RANK','TOV_RANK','STL_RANK','BLK_RANK','BLKA_RANK','PF_RANK','PFD_RANK','PTS_RANK','PLUS_MINUS_RANK']

/** @type {string[]} */
const arrHeader = ['TEAM_NAME','GP','W','L','W_PCT','FG_PCT','FG3_PCT','FT_PCT','TEAM_ID']; //  'TEAM_ID'는 로고에만 참조하고 한 컬럼을 차지하지는 않는다.

export interface Main {
    resource:   string;
    parameters: Parameters;
    resultSets: ResultSet[];
}

export interface Parameters {
    MeasureType:      string;
    PerMode:          null;
    PlusMinus:        string;
    PaceAdjust:       string;
    Rank:             string;
    LeagueID:         string;
    Season:           string;
    SeasonType:       string;
    PORound:          number;
    Outcome:          null;
    Location:         null;
    Month:            number;
    SeasonSegment:    null;
    DateFrom:         null;
    DateTo:           null;
    OpponentTeamID:   number;
    VsConference:     null;
    VsDivision:       null;
    TeamID:           null;
    Conference:       string;
    Division:         null;
    GameSegment:      null;
    Period:           number;
    ShotClockRange:   null;
    LastNGames:       number;
    GameScope:        null;
    PlayerExperience: null;
    PlayerPosition:   null;
    StarterBench:     null;
    TwoWay:           null;
    GameSubtype:      null;
}

export interface ResultSet {
    name:    string;
    headers: string[];
    rowSet:  Array<Array<number | string>>;
}

/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {
	
    //console.log(url);
    //console.log(url.searchParams.get('Conference'));

    let URL = "https://stats.nba.com/stats/leaguedashteamstats?LastNGames=0&LeagueID=00&MeasureType=Base&Month=0&OpponentTeamID=0&PaceAdjust=N&Period=0&PlusMinus=N&PORound=0&Rank=N"
        + "&Season=" + url.searchParams.get('Season')
        + "&SeasonType=" + url.searchParams.get('SeasonType');


    if(url.searchParams.get('Conference') !== "All"){
        URL+= "&Conference=" + url.searchParams.get('Conference')
    }
    const res = await fetch(URL, options);
    const ResJson = await res.json();

    //console.log(ResJson);
    //console.log(ResJson.resultSets[0].headers);
    // console.log(ResJson.resultSets[0].rowSet);

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

    //console.log(arrHeaderIndex);

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

    //console.log(TableData);

    //return json({"TableData" : TableData});
    return json(TableData);
}
