export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = { ok: false; error: string };

async function parseApiResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  let json: ApiOk<T> | ApiErr;

  try {
    json = JSON.parse(text) as ApiOk<T> | ApiErr;
  } catch {
    throw new Error(
      res.ok
        ? "Réponse serveur invalide"
        : `Service indisponible (${res.status}). Lancez l'application avec « npm run dev » dans le dossier cashflow.`,
    );
  }

  if (!json.ok) throw new Error(json.error);
  return json.data;
}

const fetchOpts: RequestInit = { credentials: "include" };

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(path, fetchOpts);
  return parseApiResponse<T>(res);
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(path, {
    ...fetchOpts,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  return parseApiResponse<T>(res);
}
