import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "data");
const dbPath = path.join(dataDir, "cashflow.json");

fs.mkdirSync(dataDir, { recursive: true });

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(
    dbPath,
    JSON.stringify({ users: [], sessions: [], contacts: [], transactions: [] }, null, 2),
    "utf8",
  );
}

console.log("Base de données prête :", dbPath);
