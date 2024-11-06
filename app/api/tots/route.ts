import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, subject, topic, subtopic, lines, teacher_id } = body;

  try {
    const connection = await pool.connect();
    try {
      const result = await pool.query(
        `
        INSERT INTO tots (title, subject, topic, subtopic, teacher_id) VALUES ($1, $2, $3, $4, $5) RETURNING id;`,
        [title, subject, topic, subtopic, teacher_id]
      );

      const linesResult = await Promise.all(
        lines.map((line: { content: string; type: string, position: number}, index: number) =>
          pool.query(
            `INSERT INTO tot_lines (content, line_type, position, tot_id) VALUES ($1, $2, $3, $4) RETURNING *`,
            [line.content, line.type, line.position, result.rows[0].id]
          )
        )
      );

      return NextResponse.json({ status: 201 });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar o tot" }, { status: 500 });
  }
}
