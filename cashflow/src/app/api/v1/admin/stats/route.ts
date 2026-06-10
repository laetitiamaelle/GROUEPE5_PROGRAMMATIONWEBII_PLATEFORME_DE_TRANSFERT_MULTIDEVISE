import { getAdminStats } from "@/server/data";
import { jsonOk } from "@/server/http";

export async function GET() {
  return jsonOk(getAdminStats());
}
