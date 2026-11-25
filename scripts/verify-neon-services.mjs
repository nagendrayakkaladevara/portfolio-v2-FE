/**
 * Verifies Neon Postgres using .env.local from `neon deploy` (phase 1).
 * R2 is phase 2 and is not checked here.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env.local");
if (!existsSync(envPath)) {
  console.error("Missing .env.local — run `neon deploy` in the project root first.");
  process.exit(1);
}

function parseDotenv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 0) continue;
    let value = line.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    )
      value = value.slice(1, -1);
    out[line.slice(0, i).trim()] = value;
  }
  return out;
}

const env = parseDotenv(readFileSync(envPath, "utf8"));

if (!env.DATABASE_URL) {
  console.error("Missing DATABASE_URL in .env.local");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  ssl: { rejectUnauthorized: true },
  max: 1,
  connectionTimeoutMillis: 15000,
});
try {
  const { rows } = await pool.query("SELECT 1 AS ok");
  console.log("postgres: ok", rows[0]);
} finally {
  await pool.end();
}

console.log("Neon Postgres verified (R2 is phase 2 — configure on the API separately).");