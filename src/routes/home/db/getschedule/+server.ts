import { json } from '@sveltejs/kit';
import pg from "pg";
const { Pool } = pg;

//import { native as pg } from 'pg';

// const config = {
//     host: 'localhost',
//     // Do not hard code your username and password.
//     // Consider using Node environment variables.
//     user: 'postgres',
//     password: 'sqlpass1!',
//     database: 'NBADB',
//     port: 5432,
//     ssl: false
// };

// const config = {
//     host: 'nba-project.kro.kr',
//     // Do not hard code your username and password.
//     // Consider using Node environment variables.
//     user: 'jys0521',
//     password: 'abcdxyz',
//     database: 'nbadb',
//     port: 5432,
//     ssl: false
// };

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

    let query = "select * from public.game_schedule where game_date = '" + url.searchParams.get("SelectedDate") + "';";

    const res = await connectToDB.query(query);

    connectToDB.release();
    
    return json(res.rows);
}