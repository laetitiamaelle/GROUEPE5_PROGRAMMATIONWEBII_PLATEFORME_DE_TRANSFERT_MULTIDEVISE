import { requireUser } from "@/server/auth";
import { createContact, listContacts } from "@/server/data";
import { jsonErr, jsonOk } from "@/server/http";
import { contactBody } from "@/server/validation";

export async function GET() {
  try {
    const user = await requireUser();
    return jsonOk(listContacts(user.id));
  } catch {
    return jsonErr(401, "Connectez-vous pour voir vos contacts");
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonErr(400, "Corps JSON invalide");
  }

  const parsed = contactBody.safeParse(body);
  if (!parsed.success) {
    return jsonErr(400, parsed.error.flatten().formErrors.join(", "));
  }

  try {
    const user = await requireUser();
    const contact = createContact(user.id, parsed.data);
    return jsonOk(contact);
  } catch (e) {
    if (e instanceof Error && e.message === "UNAUTHORIZED") {
      return jsonErr(401, "Connectez-vous pour ajouter un contact");
    }
    return jsonErr(500, "Impossible d'ajouter le contact");
  }
}
