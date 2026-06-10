import { jsonOk } from "@/server/http";
import { getRatesDashboard } from "@/server/queries";

export async function GET() {
  return jsonOk(getRatesDashboard());
}
