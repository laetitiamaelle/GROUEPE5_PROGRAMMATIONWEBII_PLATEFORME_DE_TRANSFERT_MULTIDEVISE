/** Données de démonstration — couche « persistance » simulée côté serveur. */

export type TxType = "envoi" | "reception" | "conversion";
export type TxStatus = "complete" | "pending" | "failed";

export type TransactionRow = {
  id: string;
  date: string;
  reference: string;
  type: TxType;
  counterparty: string;
  originAmount: string;
  originCurrency: string;
  convertedAmount: string;
  convertedCurrency: string;
  status: TxStatus;
};

export type RatePairCard = {
  id: string;
  label: string;
  source: string;
  rate: number;
  trendPct: number;
  trendUp: boolean;
  updatedMinutesAgo: number;
};

export type DataFlowRow = {
  id: string;
  name: string;
  latencyMs: number;
  status: "operational" | "unstable";
};

export type RateSnapshot = {
  id: string;
  at: string;
  pair: string;
  rate: number;
  source: string;
  status: "success" | "alert";
};

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  currency: string;
  balanceLabel: string;
  status: "active" | "verification" | "suspended";
};

export type ContactRow = {
  id: string;
  name: string;
  email: string;
  currency: string;
  avatarSeed: string;
};

export const TRANSACTIONS: TransactionRow[] = [
  {
    id: "1",
    date: "24 Mai 2024",
    reference: "TRX-8829-4410",
    type: "envoi",
    counterparty: "Marie Dubois",
    originAmount: "150,000",
    originCurrency: "XAF",
    convertedAmount: "228.67",
    convertedCurrency: "EUR",
    status: "complete",
  },
  {
    id: "2",
    date: "23 Mai 2024",
    reference: "TRX-8821-2201",
    type: "reception",
    counterparty: "Jean-Paul Kamga",
    originAmount: "500.00",
    originCurrency: "EUR",
    convertedAmount: "327 978.5",
    convertedCurrency: "XAF",
    status: "complete",
  },
  {
    id: "3",
    date: "22 Mai 2024",
    reference: "TRX-8800-1192",
    type: "conversion",
    counterparty: "Compte USD",
    originAmount: "1,200.00",
    originCurrency: "EUR",
    convertedAmount: "1,285.40",
    convertedCurrency: "USD",
    status: "pending",
  },
  {
    id: "4",
    date: "21 Mai 2024",
    reference: "TRX-8790-0081",
    type: "envoi",
    counterparty: "Sarah Johnson",
    originAmount: "2,000.00",
    originCurrency: "EUR",
    convertedAmount: "2,180.00",
    convertedCurrency: "USD",
    status: "failed",
  },
  {
    id: "5",
    date: "20 Mai 2024",
    reference: "TRX-8781-9920",
    type: "reception",
    counterparty: "ACME Corp",
    originAmount: "10,000.00",
    originCurrency: "USD",
    convertedAmount: "9,280.00",
    convertedCurrency: "EUR",
    status: "complete",
  },
];

export const RATE_PAIRS: RatePairCard[] = [
  {
    id: "eur-xaf",
    label: "XAF ↔ EUR",
    source: "Banque Centrale des États de l'Afrique de l'Ouest",
    rate: 655.957,
    trendPct: 0.12,
    trendUp: true,
    updatedMinutesAgo: 12,
  },
  {
    id: "usd-xaf",
    label: "USD ↔ XAF",
    source: "XE.com Real-time Stream",
    rate: 601.42,
    trendPct: -0.08,
    trendUp: false,
    updatedMinutesAgo: 4,
  },
  {
    id: "eur-usd",
    label: "EUR ↔ USD",
    source: "European Central Bank API",
    rate: 1.0842,
    trendPct: 0.03,
    trendUp: true,
    updatedMinutesAgo: 2,
  },
];

export const DATA_FLOWS: DataFlowRow[] = [
  { id: "beac", name: "Banque Centrale (BEAC)", latencyMs: 14, status: "operational" },
  { id: "ecb", name: "European Central Bank API", latencyMs: 42, status: "operational" },
  { id: "xe", name: "XE.com Real-time Stream", latencyMs: 118, status: "unstable" },
];

const snapshotSources = ["ECB API", "OpenExchange", "Exchangerate.host"] as const;
const snapshotPairs = ["EUR / XAF", "USD / XAF", "EUR / USD"] as const;

export const SNAPSHOTS: RateSnapshot[] = Array.from({ length: 24 }, (_, i) => {
  const d = new Date(2024, 4, 24, 12, 0, 1 - i * 3600);
  return {
    id: `ECB-MAIN-20240524-${String(i).padStart(3, "0")}`,
    at: d.toISOString(),
    pair: snapshotPairs[i % 3],
    rate: snapshotPairs[i % 3] === "EUR / USD" ? 1.0842 : snapshotPairs[i % 3] === "USD / XAF" ? 601.42 : 655.957,
    source: snapshotSources[i % 3],
    status: i % 7 === 0 ? "alert" : "success",
  };
});

export const ADMIN_USERS: AdminUserRow[] = [
  {
    id: "u1",
    name: "Alex Rivera",
    email: "a.rivera@cashflow.com",
    currency: "EUR",
    balanceLabel: "2 540,50 €",
    status: "active",
  },
  {
    id: "u2",
    name: "Marie Dubois",
    email: "marie.dubois@email.com",
    currency: "XAF",
    balanceLabel: "1 250 000 FCFA",
    status: "active",
  },
  {
    id: "u3",
    name: "Jean-Paul Kamga",
    email: "jp.kamga@email.com",
    currency: "XAF",
    balanceLabel: "890 200 FCFA",
    status: "verification",
  },
  {
    id: "u4",
    name: "Sarah Johnson",
    email: "sarah.j@corp.us",
    currency: "USD",
    balanceLabel: "12 400.00 $",
    status: "active",
  },
  {
    id: "u5",
    name: "Admin Principal",
    email: "admin@cashflow.com",
    currency: "EUR",
    balanceLabel: "248 500.00 €",
    status: "active",
  },
  {
    id: "u6",
    name: "Compte Gelé",
    email: "frozen@example.com",
    currency: "EUR",
    balanceLabel: "0,00 €",
    status: "suspended",
  },
];

export const CONTACTS: ContactRow[] = [
  { id: "c1", name: "Marie Dubois", email: "marie.dubois@email.com", currency: "XAF", avatarSeed: "Marie" },
  { id: "c2", name: "Jean-Paul Kamga", email: "jp.kamga@email.com", currency: "XAF", avatarSeed: "JP" },
  { id: "c3", name: "Sarah Johnson", email: "sarah.j@corp.us", currency: "USD", avatarSeed: "SJ" },
];

export const TRANSFER_CONTEXT = {
  sourceAccount: {
    label: "Compte Euro (EUR)",
    balance: 4250,
    currency: "EUR",
    default: true,
  },
  rate: {
    eurToXaf: 655.957,
    feePct: 1.5,
    updatedAt: "2026-04-29T11:54:00.000Z",
    sourceLabel: "Banque Centrale Européenne (BCE)",
  },
};

export const ADMIN_STATS = {
  totalUsers: 1284,
  newUsersWeek: 12,
  volume24hXaf: 45_820_000,
  activeTransactions: 86,
  platformReserveEur: 248_500,
};
