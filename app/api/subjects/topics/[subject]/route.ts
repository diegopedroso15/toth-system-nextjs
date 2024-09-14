import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { subject: string } }
) {
  const subject = params.subject;

  const decodedSubject = decodeURIComponent(subject);
  try {
    const connection = await pool.connect();
    try {
      const result = await connection.query(`SELECT DISTINCT topic FROM subjects_topics WHERE subject = $1;`,
        [decodedSubject]
      );

      const topics = result.rows.map((row) => row.topic);

      return NextResponse.json(topics);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar os professores" },
      { status: 500 }
    );
  }
}
