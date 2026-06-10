import { NextResponse } from "next/server";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true as const, data }, init);
}

export function jsonErr(status: number, message: string) {
  return NextResponse.json({ ok: false as const, error: message }, { status });
}
