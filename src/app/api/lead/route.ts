import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const apiKey = process.env.KIT_API_KEY;
    const formId = process.env.KIT_FORM_ID;

    console.log("DEBUG: KIT_API_KEY exists?", !!apiKey);
    console.log("DEBUG: KIT_FORM_ID value:", formId);

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    if (!apiKey || !formId) {
      return NextResponse.json(
        {
          error: "Missing KIT_API_KEY or KIT_FORM_ID in environment variables.",
        },
        { status: 500 },
      );
    }

    // Step 1: Create or update the subscriber.
    // Kit V4 treats this as an upsert.
    const subscriberResponse = await fetch(
      "https://api.kit.com/v4/subscribers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": apiKey,
        },
        body: JSON.stringify({
          email_address: email,
        }),
      },
    );

    const subscriberData = await subscriberResponse.json();

    if (!subscriberResponse.ok) {
      console.error("Kit subscriber API error:", subscriberData);

      return NextResponse.json(
        {
          error:
            subscriberData.message ||
            subscriberData.errors?.join(", ") ||
            "Failed to create subscriber.",
        },
        { status: subscriberResponse.status },
      );
    }
    console.log(
      "KIT SUBSCRIBER RESPONSE:",
      JSON.stringify(subscriberData, null, 2),
    );
    const subscriberId = subscriberData.subscriber?.id;

    if (!subscriberId) {
      console.error(
        "Kit response did not include subscriber ID:",
        subscriberData,
      );

      return NextResponse.json(
        { error: "Kit did not return a subscriber ID." },
        { status: 500 },
      );
    }

    // Step 2: Add the subscriber to the specified form.
    const formResponse = await fetch(
      `https://api.kit.com/v4/forms/${formId}/subscribers/${subscriberId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Kit-Api-Key": apiKey,
        },
        body: JSON.stringify({}),
      },
    );

    const formData = await formResponse.json();

    if (!formResponse.ok) {
      console.error("Kit form subscription error:", formData);

      return NextResponse.json(
        {
          error:
            formData.message ||
            formData.errors?.join(", ") ||
            "Failed to add subscriber to form.",
        },
        { status: formResponse.status },
      );
    }

    console.log("Kit subscriber successfully added:", subscriberId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Lead submission error:", error);

    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
