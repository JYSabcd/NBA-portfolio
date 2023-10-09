import { json } from '@sveltejs/kit';
import pg from "pg";
const { Pool } = pg;
//import { native as pg } from 'pg';

import {env} from '$env/dynamic/private';
const {
    DBconfig_host,
    DBconfig_user,
    DBconfig_password,
    DBconfig_database,
    DBconfig_port
} = env;


const config = {
    host: DBconfig_host,
    user: DBconfig_user,
    password: DBconfig_password,
    database: DBconfig_database,
    port: DBconfig_port,
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

    const res = await connectToDB.query(query);

    connectToDB.release();
    
    return json(res.rows);
}
