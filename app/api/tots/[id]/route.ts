import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const { title, subject, topic, subtopic, lines, teacher_id } = body;

  if (!id) {
    return NextResponse.json({ error: "ID do TOT é necessário" }, { status: 400 });
  }

  try {
    const connection = await pool.connect();
    try {
      const result = await pool.query(
        `
        UPDATE tots 
        SET title = $1, subject = $2, topic = $3, subtopic = $4, teacher_id = $5
        WHERE id = $6
        RETURNING id;
      `,
        [title, subject, topic, subtopic, teacher_id, id]
      );

      if (result.rows.length === 0) {
        return NextResponse.json({ error: "TOT não encontrado" }, { status: 404 });
      }

      await pool.query(
        `DELETE FROM tot_lines WHERE tot_id = $1`,
        [id]
      );

      const linesResult = await Promise.all(
        lines.map((line: { content: string; type: string, position: number }) =>
          pool.query(
            `INSERT INTO tot_lines (content, line_type, position, tot_id) VALUES ($1, $2, $3, $4) RETURNING *`,
            [line.content, line.type, line.position, id]
          )
        )
      );

      return NextResponse.json({ status: 200, message: "TOT atualizado com sucesso" });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao atualizar o TOT" }, { status: 500 });
  }
}
