import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { topic: string } }
) {
  const topic = params.topic;

  const decodedTopic = decodeURIComponent(topic);

  try {
    const connection = await pool.connect();
    try {
      const result = await connection.query(
        `SELECT DISTINCT subtopic FROM subjects_topics WHERE topic = $1;`,
        [decodedTopic]
      );

      const subtopics = result.rows.map((row) => row.subtopic);

      return NextResponse.json(subtopics);
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
