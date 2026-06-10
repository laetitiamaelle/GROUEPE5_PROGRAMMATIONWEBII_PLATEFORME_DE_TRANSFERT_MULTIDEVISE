import { listAdminUsers } from "@/server/data";
import { jsonOk } from "@/server/http";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? undefined;
  return jsonOk(listAdminUsers(q));
}
