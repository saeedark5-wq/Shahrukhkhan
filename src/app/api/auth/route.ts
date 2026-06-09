import { NextResponse } from "next/server";
import crypto from "node:crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
  try {
    if (!ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Server misconfigured" },
        { status: 500 }
      );
    }

    const { password } = await request.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    const payload = JSON.stringify({
      authenticated: true,
      timestamp: Date.now(),
      exp: Date.now() + 24 * 60 * 60 * 1000,
    });

    const signature = crypto
      .createHmac("sha256", ADMIN_PASSWORD)
      .update(payload)
      .digest("hex");

    const token = Buffer.from(payload).toString("base64") + "." + signature;

    return NextResponse.json({ success: true, token });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}
