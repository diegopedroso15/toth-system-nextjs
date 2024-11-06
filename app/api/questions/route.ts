import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { questions, totRef, teacher_id } = body;

  try {
    const connection = await pool.connect();
    try {
      const tot_id = totRef;
      for (const question of questions) {
        const { statement, alternatives } = question;

        const exercisesResult = await connection.query(
          `INSERT INTO exercises (tot_id, teacher_id) VALUES ($1, $2) RETURNING id`,
          [tot_id, teacher_id]
        );

        const questionResult = await connection.query(
          `INSERT INTO questions (statement, exercise_id) VALUES ($1, $2) RETURNING id`,
          [statement, exercisesResult.rows[0].id]
        );

        const question_id = questionResult.rows[0].id;

        for (const alternative of alternatives) {
          await connection.query(
            `INSERT INTO alternatives (text, question_id, is_correct) VALUES ($1, $2, $3)`,
            [alternative.text, question_id, alternative.isCorrect]
          );
        }
      }

      return NextResponse.json({ status: 201 });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar a questão" },
      { status: 500 }
    );
  }
}

