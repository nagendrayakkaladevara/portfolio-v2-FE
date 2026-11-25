import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const neonEnv = resolve(root, ".env.local");
const backendEnv = resolve(root, "..", "Sai-Nagendra-Portfolio-Backend", ".env");

if (!existsSync(neonEnv)) {
  console.error("Missing .env.local — run `neon deploy` first.");
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

const pull = parseDotenv(readFileSync(neonEnv, "utf8"));

const lines = [
  "NODE_ENV=development",
  "PORT=3001",
  `DATABASE_URL=${pull.DATABASE_URL}`,
  `DATABASE_DIRECT_URL=${pull.DATABASE_URL_UNPOOLED ?? pull.DATABASE_URL}`,
  "DATABASE_SSL=true",
  `RATE_LIMIT_SECRET=${randomBytes(32).toString("hex")}`,
  "ALLOWED_ORIGINS=http://localhost:5173",
  "# Phase 2: add R2_* variables manually (not pulled from Neon).",
];

writeFileSync(backendEnv, `${lines.join("\n")}\n`, "utf8");
console.log(`Wrote ${backendEnv}`);