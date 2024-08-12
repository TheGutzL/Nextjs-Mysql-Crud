import { conn } from "@/libs/db";
import Error from "next/error";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const results = await conn.query("SELECT * FROM product");

    return NextResponse.json(results);
  } catch (error: Error | any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const image: File | null = data.get("image") as File;

    if (!image) {
      return NextResponse.json(
        {
          message: "Image is required",
        },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filePath = path.join(process.cwd(), 'public', image.name)
    await writeFile(filePath, buffer);

    const result: any = await conn.query("INSERT INTO product SET ?", {
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
    });

    return NextResponse.json({
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      id: result.insertId,
    });
  } catch (error: Error | any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
