import { Pool } from 'pg';

export const users_pool = new Pool({
    connectionString: process.env.USERS_DB_URL,
    connectionTimeoutMillis: 2000,
})

export const events_pool = new Pool({
    connectionString: process.env.EVENTS_DB_URL,
    connectionTimeoutMillis: 2000,
})

export const activities_pool = new Pool({
    connectionString: process.env.ACTIVITIES_DB_URL,
    connectionTimeoutMillis: 2000,
})

users_pool.on('error', (err) => {
  console.error('Unexpected error on idle client (users_pool)', err);
});

events_pool.on('error', (err) => {
  console.error('Unexpected error on idle client (events_pool)', err);
});

activities_pool.on('error', (err) => {
  console.error('Unexpected error on idle client (activities_pool)', err);
});