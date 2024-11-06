import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { teacher_id: number } }) {
  const teacher_id = params.teacher_id;

  const connection = await pool.connect();
  try {
    const result = await connection.query(
      `SELECT * FROM exercises WHERE teacher_id = $1`,
      [teacher_id]
    );

    return NextResponse.json(result.rows);
  } finally {
    connection.release();
  }
}