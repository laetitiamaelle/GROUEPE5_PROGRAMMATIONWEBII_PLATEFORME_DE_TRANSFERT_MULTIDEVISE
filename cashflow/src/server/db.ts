import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
export const DB_PATH = path.join(DATA_DIR, "cashflow.json");

export type DbStore = {
  users: Array<{
    id: string;
    full_name: string;
    email: string;
    password_hash: string;
    currency: string;
    balance_eur: number;
    created_at: string;
  }>;
  sessions: Array<{ token: string; user_id: string; expires_at: string }>;
  contacts: Array<{
    id: string;
    user_id: string;
    name: string;
    email: string;
    currency: string;
    avatar_seed: string;
    created_at: string;
  }>;
  transactions: Array<{
    id: string;
    user_id: string;
    reference: string;
    type: string;
    counterparty: string;
    contact_id: string | null;
    origin_amount: number;
    origin_currency: string;
    converted_amount: number;
    converted_currency: string;
    fee_eur: number;
    status: string;
    created_at: string;
  }>;
};

const EMPTY_STORE: DbStore = {
  users: [],
  sessions: [],
  contacts: [],
  transactions: [],
};

let cache: DbStore | null = null;

function ensureDataDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function loadStore(): DbStore {
  if (cache) return cache;
  ensureDataDir();
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(EMPTY_STORE, null, 2), "utf8");
    if (process.env.NODE_ENV !== "production") {
      console.log(`[cashflow] Base de données créée : ${DB_PATH}`);
    }
  }
  const raw = fs.readFileSync(DB_PATH, "utf8");
  cache = JSON.parse(raw) as DbStore;
  return cache;
}

export function saveStore(store: DbStore) {
  ensureDataDir();
  fs.writeFileSync(DB_PATH, JSON.stringify(store, null, 2), "utf8");
  cache = store;
}

export function mutateStore(mutator: (store: DbStore) => void) {
  const store = loadStore();
  mutator(store);
  saveStore(store);
  return store;
}

/** Réinitialise le cache (tests / rechargement fichier). */
export function resetStoreCache() {
  cache = null;
}
