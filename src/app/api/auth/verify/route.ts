import { NextResponse } from "next/server";
import crypto from "node:crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
  try {
    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ valid: false }, { status: 500 });
    }

    const { token } = await request.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const parts = token.split(".");
    if (parts.length !== 2) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    const [encodedPayload, signature] = parts;

    const expectedSignature = crypto
      .createHmac("sha256", ADMIN_PASSWORD)
      .update(Buffer.from(encodedPayload, "base64").toString("utf-8"))
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64").toString("utf-8")
    );

    if (Date.now() > payload.exp) {
      return NextResponse.json({ valid: false, expired: true }, { status: 401 });
    }

    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
