import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result: { 'NOW()': string }[] = await conn.query("SELECT NOW()");
  console.log(result)
  return NextResponse.json({ message: result[0]['NOW()'] });
}

export function POST() {
  return NextResponse.json('Creating a new product');
}