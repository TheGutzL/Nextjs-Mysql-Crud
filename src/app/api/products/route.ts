import cloudinary from "@/libs/cloudinary";
import { conn } from "@/libs/db";
import { processImage } from "@/libs/processImage";
import { unlink } from "fs/promises";
import Error from "next/error";
import { NextResponse } from "next/server";

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

    const filePath = await processImage(image);

    const res = await cloudinary.uploader.upload(filePath);
    console.log(res);

    if (res) {
      await unlink(filePath);
    }

    const result: any = await conn.query("INSERT INTO product SET ?", {
      name: data.get("name"),
      description: data.get("description"),
      price: data.get("price"),
      image: res.secure_url,
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
