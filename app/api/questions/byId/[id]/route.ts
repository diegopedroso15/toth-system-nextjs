import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const id = params.id;

  const connection = await pool.connect();
  try {

    const exercisesResult = await connection.query(
      `SELECT * FROM exercises WHERE id = $1`,
      [id]
    );

    if (exercisesResult.rowCount === 0) {
      return NextResponse.json({ error: "Exercício não encontrado" }, { status: 404 });
    }

    const result = await connection.query(
      `SELECT * FROM questions WHERE exercise_id = $1`,
      [id]
    );

    const alternativesResponse = await connection.query(
      `SELECT * FROM alternatives WHERE question_id = ANY($1)`,
      [result.rows.map((question) => question.id)]
    );

    
    const questions = result.rows;
    const alternatives = alternativesResponse.rows;
    const exercise = exercisesResult.rows[0];

    return NextResponse.json({ questions, alternatives, exercise });
  } finally {
    connection.release();
  }
}