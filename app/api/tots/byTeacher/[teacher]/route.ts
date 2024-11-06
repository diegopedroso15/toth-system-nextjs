import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { teacher: number } }) {
  const teacher_id = params.teacher;

  const connection = await pool.connect();
  try {
    const result = await connection.query(
      `SELECT * FROM tots WHERE teacher_id = $1`,
      [teacher_id]
    );

    return NextResponse.json(result.rows);
  } finally {
    connection.release();
  }
}
