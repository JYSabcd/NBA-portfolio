import { json } from '@sveltejs/kit';
import { Pool } from "pg";

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


    let Season = url.searchParams.get("Season");    //  예) 2022-23
    let syear = Season?.slice(0,4); //  예) 2022

    const pool = new Pool(config);

    const connectToDB = await pool.connect();

    let query = "select * from public.fn_similarplayer(" + url.searchParams.get("PlayerID") + "," + syear + ");";

    const res = await connectToDB.query(query);
    
    return json(res.rows);
}
