import { conn } from "@/libs/db";
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
    const { name, description, price } = await request.json();

    const result: any = await conn.query("INSERT INTO product SET ?", {
      name,
      description,
      price,
    });

    return NextResponse.json({
      name,
      description,
      price,
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
