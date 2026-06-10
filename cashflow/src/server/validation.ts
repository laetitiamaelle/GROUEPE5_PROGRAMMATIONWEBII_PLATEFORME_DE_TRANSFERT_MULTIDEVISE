import { z } from "zod";

const MAX_TRANSFER_EUR = 1_000_000;

export const paginationQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(8),
});

export const transactionsQuery = paginationQuery.extend({
  q: z.string().optional(),
  status: z.enum(["all", "complete", "pending", "failed"]).default("all"),
  currency: z.enum(["all", "EUR", "XAF", "USD"]).default("all"),
});

export const snapshotsQuery = paginationQuery.extend({
  pair: z.string().optional(),
  source: z.string().optional(),
});

export const transferPreviewBody = z.object({
  amountEur: z.number().positive().max(MAX_TRANSFER_EUR),
  contactId: z.string().min(1),
});

export const loginBody = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember: z.boolean().optional(),
});

export const signupBody = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirm: z.string().min(8),
  currency: z.enum(["XAF", "EUR", "USD"]),
});

export const contactBody = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  currency: z.enum(["XAF", "EUR", "USD"]),
});

export const transferConfirmBody = z.object({
  amountEur: z.number().positive().max(MAX_TRANSFER_EUR),
  contactId: z.string().min(1),
  reference: z.string().min(1).optional(),
});
