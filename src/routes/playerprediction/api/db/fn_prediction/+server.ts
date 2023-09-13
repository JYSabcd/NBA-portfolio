import { json } from '@sveltejs/kit';
import pkg from 'pg';
const { Pool } = pkg;

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


    let Season = url.searchParams.get("Season");    //  예) 2022-23
    let syear = Season?.slice(0,4); //  예) 2022

    const pool = new Pool(config);

    const connectToDB = await pool.connect();

    let query = "select * from public.fn_similarplayer(" + url.searchParams.get("PlayerID") + "," + syear + ");";

    const res = await connectToDB.query(query);
    
    return json(res.rows);
}
