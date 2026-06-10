import { getAdminStats } from "./data";
import {
  DATA_FLOWS,
  RATE_PAIRS,
  SNAPSHOTS,
  type RateSnapshot,
} from "./seed";

export {
  listContacts,
  createContact,
  listTransactions,
  executeTransfer,
  previewTransfer,
  getTransferContext,
  listAdminUsers,
  getAdminStats,
  createUser,
  findUserByEmail,
} from "./data";

export function listRateSnapshots(filters: { pair?: string; source?: string; page: number; pageSize: number }) {
  let rows = [...SNAPSHOTS];
  if (filters.pair && filters.pair !== "all") {
    rows = rows.filter((r) => r.pair === filters.pair);
  }
  if (filters.source && filters.source !== "all") {
    rows = rows.filter((r) => r.source === filters.source);
  }
  const total = 14280;
  const start = (filters.page - 1) * filters.pageSize;
  const slice = rows.slice(start, start + filters.pageSize);
  return { rows: slice, total };
}

export function getSnapshotById(id: string): RateSnapshot | undefined {
  return SNAPSHOTS.find((s) => s.id === id);
}

export function getRatesDashboard() {
  return {
    pairs: RATE_PAIRS,
    flows: DATA_FLOWS,
    stats: {
      volume24hEur: 1.2e6,
      volumeDeltaPct: 12,
      adminTx: 48,
      spreadAvgPct: 0.15,
      responseSeconds: 1.2,
      responseSource: "Source ECB",
    },
    admin: getAdminStats(),
  };
}
