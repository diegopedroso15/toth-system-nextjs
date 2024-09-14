import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const connection = await pool.connect();
    try {
      const result = await connection.query(`SELECT * FROM students`);

      return NextResponse.json(result.rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar os estudantes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  try {
    const connection = await pool.connect();
    try {
      const result = await connection.query(
        `INSERT INTO students (name) VALUES ($1) RETURNING *`,
        [name]
      );

      const user = await connection.query(
        `INSERT INTO users (email, password, role, student_id) VALUES ($1, $2, $3, $4) RETURNING *`,
        [email, password, "student", result.rows[0].id]
      );

      return NextResponse.json(user.rows[0], { status: 201 });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar o estudante" },
      { status: 500 }
    );
  }
}
