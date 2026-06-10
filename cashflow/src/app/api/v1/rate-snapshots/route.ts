import { jsonErr, jsonOk } from "@/server/http";
import { listRateSnapshots } from "@/server/queries";
import { snapshotsQuery } from "@/server/validation";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = snapshotsQuery.safeParse(Object.fromEntries(url.searchParams));
  if (!parsed.success) {
    return jsonErr(400, parsed.error.flatten().formErrors.join(", "));
  }
  const data = listRateSnapshots(parsed.data);
  return jsonOk(data);
}
