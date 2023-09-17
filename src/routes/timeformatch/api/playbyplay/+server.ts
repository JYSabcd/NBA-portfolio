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

// {
//     "actionNumber": 2,
//     "clock": "PT11M44.00S",
//     "period": 1,
//     "teamId": 1610612744,
//     "teamTricode": "GSW",
//     "personId": 201142,
//     "playerName": "Durant",
//     "playerNameI": "K. Durant",
//     "xLegacy": 166,
//     "yLegacy": 100,
//     "shotDistance": 19,
//     "shotResult": "Missed",
//     "isFieldGoal": 1,
//     "scoreHome": "0",
//     "scoreAway": "0",
//     "pointsTotal": 0,
//     "location": "v",
//     "description": "MISS Durant 19' Step Back Jump Shot",
//     "actionType": "Missed Shot",
//     "subType": "Step Back Jump shot",
//     "videoAvailable": 0,
//     "actionId": 3
//   },

/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {

    let URL = "https://stats.nba.com/stats/playbyplayv3?EndPeriod=10&EndRange=55800&RangeType=2&StartPeriod=1&StartRange=0"
        + "&GameID=" + url.searchParams.get('GameID');

    const res = await fetch(URL, options);
    const ResJson = await res.json();

    /** @type {{}[]} */
    let TableData: {}[] = [];

    /** @type {{}[]} */
    let actions = ResJson.game.actions;

    let CurrentScore_Home =  0;
    let CurrentScore_Away =  0;

    for(let i = 0; i < actions.length; i++){
        if(actions[i]["actionType"] !== "Made Shot" 
        && actions[i]["actionType"] !== "Missed Shot"
        && actions[i]["actionType"] !== "Free Throw"
        && actions[i]["actionType"] !== "Jump Ball"
        ){
            continue;
        }
        
        if(actions[i]["pointsTotal"] === 0){
            //  미스샷일때도 scoreHome, scoreAway 값을 현재 스코어로 넣는다.
            actions[i]["scoreHome"] = CurrentScore_Home.toString();
            actions[i]["scoreAway"] = CurrentScore_Away.toString();
        } else{
            //  pointsTotal을 현재 득점한 값으로 바꾼다.
            if(actions[i]["location"] === "h"){
                actions[i]["pointsTotal"] = actions[i]["pointsTotal"] - CurrentScore_Home - CurrentScore_Away;
                CurrentScore_Home = CurrentScore_Home + actions[i]["pointsTotal"];
            }else{
                actions[i]["pointsTotal"] = actions[i]["pointsTotal"] - CurrentScore_Home - CurrentScore_Away;
                CurrentScore_Away = CurrentScore_Away + actions[i]["pointsTotal"];
            }
        }        
        
        TableData.push(actions[i]);
    }

    return json(TableData);
}
