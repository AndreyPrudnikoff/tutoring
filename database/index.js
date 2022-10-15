import Pool from 'pg-pool'
import * as dotenv from 'dotenv'
dotenv.config()

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
};

export const pool = new Pool(config);

