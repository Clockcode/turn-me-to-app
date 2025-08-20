"use server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// export const runtime = "nodejs";
const client = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData?.get("image") as File;

    if (!file)
      return NextResponse.json({ error: "No file Uploaded" }, { status: 400 });

    if (file.size > 50 * 1024 * 1024) {
      // 50MB in bytes
      return NextResponse.json(
        { error: "Please upload a smaller size image (less than 50MB)." },
        { status: 400 }
      );
    }

    const response = await client.images.edit({
      model: "gpt-image-1",
      image: file,
      prompt: "Turn this photo to studio ghibli version. Make sure to stay consistent to the character's facial features and the positions of them in the reference image.",
      size: "auto"
    });

    const image = response.data?.[0];
    if(!image) return NextResponse.json({error: "No image returned"}, {status: 500});

    return NextResponse.json({
      ok: true,
      b64: image.b64_json ?? null
    })
  } catch (e: unknown) {
    // Type guard: check if e is an instance of Error before accessing .message
    console.error(e);
    if (e instanceof Error) {
      return NextResponse.json(
        { error: e.message },
        { status: 500 }
      );
    } else {
      // e is not an Error object, so handle it generically
      return NextResponse.json(
        { error: "unexpected error" },
        { status: 500 }
      );
    }
  }
}
