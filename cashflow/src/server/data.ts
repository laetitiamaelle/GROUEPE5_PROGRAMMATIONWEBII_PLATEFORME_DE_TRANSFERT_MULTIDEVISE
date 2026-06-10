import type { TxStatus, TxType } from "./seed";
import { TRANSFER_CONTEXT } from "./seed";
import { hashPassword, newId, type DbUser } from "./auth";
import { loadStore, mutateStore } from "./db";

export type ContactRow = {
  id: string;
  name: string;
  email: string;
  currency: string;
  avatarSeed: string;
};

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

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  currency: string;
  balanceLabel: string;
  status: "active" | "verification" | "suspended";
};

const fmtAmount = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtInt = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

function formatTxDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function formatAmount(value: number, currency: string) {
  return currency === "XAF" ? fmtInt.format(value) : fmtAmount.format(value);
}

function balanceLabel(balance: number, currency: string) {
  if (currency === "EUR") return `${fmtAmount.format(balance)} €`;
  if (currency === "USD") return `${fmtAmount.format(balance)} $`;
  return `${fmtInt.format(balance * TRANSFER_CONTEXT.rate.eurToXaf)} FCFA`;
}

function mapContact(row: {
  id: string;
  name: string;
  email: string;
  currency: string;
  avatar_seed: string;
}): ContactRow {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    currency: row.currency,
    avatarSeed: row.avatar_seed,
  };
}

export function createUser(input: {
  fullName: string;
  email: string;
  password: string;
  currency: string;
}): DbUser {
  const id = newId("usr");
  const now = new Date().toISOString();
  const user = {
    id,
    full_name: input.fullName,
    email: input.email.toLowerCase(),
    password_hash: hashPassword(input.password),
    currency: input.currency,
    balance_eur: 4250,
    created_at: now,
  };
  mutateStore((store) => {
    store.users.push(user);
  });
  return {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    currency: user.currency,
    balance_eur: user.balance_eur,
    created_at: user.created_at,
  };
}

export function findUserByEmail(email: string): (DbUser & { password_hash: string }) | null {
  const store = loadStore();
  const user = store.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;
  return {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
    currency: user.currency,
    balance_eur: user.balance_eur,
    created_at: user.created_at,
    password_hash: user.password_hash,
  };
}

export function listContacts(userId: string): ContactRow[] {
  const store = loadStore();
  return store.contacts
    .filter((c) => c.user_id === userId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map(mapContact);
}

export function createContact(
  userId: string,
  input: { name: string; email: string; currency: string },
): ContactRow {
  const id = newId("ctc");
  const now = new Date().toISOString();
  const avatarSeed = input.name.trim().slice(0, 2) || input.email.slice(0, 2);
  const row = {
    id,
    user_id: userId,
    name: input.name.trim(),
    email: input.email.toLowerCase().trim(),
    currency: input.currency,
    avatar_seed: avatarSeed,
    created_at: now,
  };
  mutateStore((store) => {
    store.contacts.push(row);
  });
  return mapContact(row);
}

export function findContactForUser(userId: string, contactId: string): ContactRow | null {
  const store = loadStore();
  const row = store.contacts.find((c) => c.id === contactId && c.user_id === userId);
  return row ? mapContact(row) : null;
}

export function getUserBalance(userId: string): number {
  const store = loadStore();
  return store.users.find((u) => u.id === userId)?.balance_eur ?? 0;
}

export function listTransactions(
  userId: string,
  filters: { q?: string; status?: string; currency?: string; page: number; pageSize: number },
) {
  const store = loadStore();
  let rows = store.transactions.filter((t) => t.user_id === userId);

  if (filters.status && filters.status !== "all") {
    rows = rows.filter((r) => r.status === filters.status);
  }
  if (filters.currency && filters.currency !== "all") {
    rows = rows.filter(
      (r) => r.origin_currency === filters.currency || r.converted_currency === filters.currency,
    );
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    rows = rows.filter(
      (r) => r.counterparty.toLowerCase().includes(q) || r.reference.toLowerCase().includes(q),
    );
  }

  rows.sort((a, b) => b.created_at.localeCompare(a.created_at));
  const total = rows.length;
  const start = (filters.page - 1) * filters.pageSize;
  const slice = rows.slice(start, start + filters.pageSize);

  const mapped: TransactionRow[] = slice.map((t) => ({
    id: t.id,
    date: formatTxDate(t.created_at),
    reference: t.reference,
    type: t.type as TxType,
    counterparty: t.counterparty,
    originAmount: formatAmount(t.origin_amount, t.origin_currency),
    originCurrency: t.origin_currency,
    convertedAmount: formatAmount(t.converted_amount, t.converted_currency),
    convertedCurrency: t.converted_currency,
    status: t.status as TxStatus,
  }));

  return { rows: mapped, total };
}

export function executeTransfer(
  userId: string,
  input: { amountEur: number; contactId: string; reference?: string },
) {
  const contact = findContactForUser(userId, input.contactId);
  if (!contact) throw new Error("Destinataire inconnu");

  const { eurToXaf, feePct } = TRANSFER_CONTEXT.rate;
  const rates: Record<string, number> = { XAF: eurToXaf, USD: 1.0842, EUR: 1 };
  const rate = rates[contact.currency] ?? eurToXaf;
  const fee = (input.amountEur * feePct) / 100;
  const totalDebit = input.amountEur + fee;
  const receiveAmount = input.amountEur * rate;

  const balance = getUserBalance(userId);
  if (totalDebit > balance) {
    throw new Error("Solde insuffisant pour effectuer ce transfert");
  }

  const txId = newId("tx");
  const reference =
    input.reference ?? `CF-${new Date().toISOString().slice(0, 10)}-${Math.floor(10000 + Math.random() * 89999)}`;
  const now = new Date().toISOString();

  mutateStore((store) => {
    const user = store.users.find((u) => u.id === userId);
    if (!user) throw new Error("Utilisateur introuvable");
    if (totalDebit > user.balance_eur) throw new Error("Solde insuffisant pour effectuer ce transfert");

    user.balance_eur = parseFloat((user.balance_eur - totalDebit).toFixed(2));
    store.transactions.push({
      id: txId,
      user_id: userId,
      reference,
      type: "envoi",
      counterparty: contact.name,
      contact_id: contact.id,
      origin_amount: input.amountEur,
      origin_currency: "EUR",
      converted_amount: receiveAmount,
      converted_currency: contact.currency,
      fee_eur: fee,
      status: "complete",
      created_at: now,
    });
  });

  return {
    transactionId: txId,
    reference,
    contact,
    amountEur: input.amountEur,
    feeEur: parseFloat(fee.toFixed(2)),
    totalDebitEur: parseFloat(totalDebit.toFixed(2)),
    receiveXaf: parseFloat(receiveAmount.toFixed(contact.currency === "XAF" ? 0 : 2)),
    eurToXaf: rate,
    feePct,
    updatedAt: TRANSFER_CONTEXT.rate.updatedAt,
    sourceLabel: TRANSFER_CONTEXT.rate.sourceLabel,
  };
}

export function previewTransfer(userId: string, amountEur: number, contactId: string) {
  const contact = findContactForUser(userId, contactId);
  if (!contact) throw new Error("Destinataire inconnu");

  const { eurToXaf, feePct } = TRANSFER_CONTEXT.rate;
  const rates: Record<string, number> = { XAF: eurToXaf, USD: 1.0842, EUR: 1 };
  const rate = rates[contact.currency] ?? eurToXaf;
  const fee = (amountEur * feePct) / 100;
  const totalDebit = amountEur + fee;
  const receiveAmount = amountEur * rate;

  return {
    contact,
    amountEur,
    feeEur: parseFloat(fee.toFixed(2)),
    totalDebitEur: parseFloat(totalDebit.toFixed(2)),
    receiveXaf: parseFloat(receiveAmount.toFixed(contact.currency === "XAF" ? 0 : 2)),
    eurToXaf: rate,
    feePct,
    updatedAt: TRANSFER_CONTEXT.rate.updatedAt,
    sourceLabel: TRANSFER_CONTEXT.rate.sourceLabel,
  };
}

export function getTransferContext(userId: string) {
  return {
    source: {
      label: "Compte Euro (EUR)",
      balance: getUserBalance(userId),
      currency: "EUR",
      default: true,
    },
    rate: TRANSFER_CONTEXT.rate,
    contacts: listContacts(userId),
  };
}

export function listAdminUsers(q?: string): AdminUserRow[] {
  const store = loadStore();
  let users = [...store.users];
  if (q) {
    const s = q.toLowerCase();
    users = users.filter((u) => u.full_name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
  }
  users.sort((a, b) => b.created_at.localeCompare(a.created_at));
  return users.map((u) => ({
    id: u.id,
    name: u.full_name,
    email: u.email,
    currency: u.currency,
    balanceLabel: balanceLabel(u.balance_eur, u.currency),
    status: "active" as const,
  }));
}

export function getAdminStats() {
  const store = loadStore();
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const dayAgo = now - 24 * 60 * 60 * 1000;

  const totalUsers = store.users.length;
  const newUsersWeek = store.users.filter((u) => new Date(u.created_at).getTime() >= weekAgo).length;
  const volume24h = store.transactions
    .filter((t) => new Date(t.created_at).getTime() >= dayAgo && t.status === "complete")
    .reduce((sum, t) => sum + t.origin_amount, 0);
  const activeTransactions = store.transactions.filter((t) => t.status === "pending").length;
  const platformReserve = store.users.reduce((sum, u) => sum + u.balance_eur, 0);

  return {
    totalUsers,
    newUsersWeek,
    volume24hXaf: Math.round(volume24h * TRANSFER_CONTEXT.rate.eurToXaf),
    activeTransactions,
    platformReserveEur: platformReserve,
  };
}
