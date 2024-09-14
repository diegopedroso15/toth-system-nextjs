import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const slug = params.id;
  try {
    const connection = await pool.connect();
    try {
      const result = await connection.query(
        `SELECT * FROM students WHERE id = $1`,
        [slug]
      );

      return NextResponse.json(result.rows[0]);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar o estudante" },
      { status: 500 }
    );
  }
}

