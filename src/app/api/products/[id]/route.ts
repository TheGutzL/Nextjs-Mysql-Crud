import cloudinary from "@/libs/cloudinary";
import { conn } from "@/libs/db";
import { processImage } from "@/libs/processImage";
import { unlink } from "fs/promises";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result: any = await conn.query("SELECT * FROM product WHERE id = ?", [
      params.id,
    ]);

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error: Error | any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result: any = await conn.query("DELETE FROM product WHERE id = ?", [
      params.id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return new Response(null, { status: 204 });
  } catch (error: Error | any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.formData();
    const image = data.get("image") as File | null;
    const updatedData = {
      name: data.get("name"),
      price: data.get("price"),
      description: data.get("description"),
      image: null as string | null,
    };

    if (!data.get("name")) {
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
    }

    if (image) {
      const filePath = await processImage(image);

      const res = await cloudinary.uploader.upload(filePath);
      updatedData.image = res.secure_url;

      if (res) {
        await unlink(filePath);
      }
    }

    const result: any = await conn.query("UPDATE product SET ? WHERE id = ?", [
      updatedData,
      params.id,
    ]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const updatedProduct: any = await conn.query(
      "SELECT * FROM product WHERE id = ?",
      [params.id]
    );

    return NextResponse.json(updatedProduct[0]);
  } catch (error: Error | any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
