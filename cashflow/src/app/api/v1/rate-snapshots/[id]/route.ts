import { jsonErr, jsonOk } from "@/server/http";
import { getSnapshotById } from "@/server/queries";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const row = getSnapshotById(id);
  if (!row) return jsonErr(404, "Snapshot introuvable");
  return jsonOk(row);
}
