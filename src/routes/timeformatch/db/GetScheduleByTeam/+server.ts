import { json } from '@sveltejs/kit';
import pg from "pg";
const { Pool } = pg;
//import { native as pg } from 'pg';

const config = {
    host: 'localhost',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: 'postgres',
    password: 'sqlpass1!',
    database: 'NBADB',
    port: 5432,
    ssl: false
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {

    const pool = new Pool(config);

    const connectToDB = await pool.connect();

    const teamid = url.searchParams.get("TeamID");

    let query = "select * from public.game_schedule "
    +"where to_char(game_date, 'yyyy-mm') = '" + url.searchParams.get("ScheduleYYYYMM") + "' " 
    +"and (home_teamid = " + teamid + " or away_teamid = " + teamid + ") "
    +"order by game_date;";

    const res = await connectToDB.query(query)
    
    return json(res.rows);
}
