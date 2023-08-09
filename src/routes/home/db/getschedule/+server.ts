// / lib/db.ts
// import { Pool } from "pg";

// /**
//  * Create a new connection pool to the database.
//  */
// const pool = new Pool({
//     database: import.meta.env.POSTGRES_DB || "postgres",
//     user: import.meta.env.POSTGRES_USERNAME || "postgres",
//     host: import.meta.env.POSTGRES_HOST || "localhost",
//     port: Number(import.meta.env.POSTGRES_PORT || 5432),
//   });
  
//   /**
//    * Connect to the PostgreSQL database.
//    * @returns {Promise<import("pg").Client>} A new client from the connection pool.
//    */
//   export const connectToDB = async () => await pool.connect();
//   hooks.server.ts그런 다음 이벤트에서 데이터베이스 연결을 사용할 수 있도록 파일 로 가져올 수 있습니다 .
  
//   import { connectToDB } from "$lib/db";
//   import type { Handle } from "@sveltejs/kit";
  
//   export const handle = (async ({ event, resolve }) => {
//     const dbconn = await connectToDB();
//     event.locals = { dbconn };
  
//     const response = await resolve(event);
//     dbconn.release();
  
//     return response;
//   }) satisfies Handle;


import { json } from '@sveltejs/kit';
import { Pool } from "pg";
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

    let query = "select * from public.game_schedule where game_date = '" + url.searchParams.get("SelectedDate") + "';";

    const res = await connectToDB.query(query)
    
    return json(res.rows);
}
