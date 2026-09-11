import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature");
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    // Ensure headers and secrets are present
    if (!signature || !secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the HMAC SHA-256 signature
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signatureBuffer = Buffer.from(signature, "utf8");

    if (
      signatureBuffer.length !== digest.length ||
      !crypto.timingSafeEqual(digest, signatureBuffer)
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const eventName = payload.meta?.event_name;

    // Process successful orders
    if (eventName === "order_created") {
      const attributes = payload.data?.attributes;
      const customerEmail = attributes?.user_email;
      const customerName = attributes?.user_name;

      console.log(
        `[Lemon Squeezy] Order received: ${customerEmail} ($39 Blueprint)`,
      );

      // Tag customer in Kit as a paid buyer (Using API v3 endpoint)
      if (
        process.env.KIT_API_KEY &&
        process.env.KIT_BUYER_TAG_ID &&
        customerEmail
      ) {
        await fetch(
          `https://api.kit.com/v3/tags/${process.env.KIT_BUYER_TAG_ID}/subscribe`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: process.env.KIT_API_KEY,
              email: customerEmail,
              first_name: customerName,
            }),
          },
        );
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("[Lemon Squeezy Webhook Error]:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
