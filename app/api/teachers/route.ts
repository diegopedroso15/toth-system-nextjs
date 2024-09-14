import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const connection = await pool.connect();
    try {
      const result = await connection.query(`SELECT * FROM teachers`);

      return NextResponse.json(result.rows);
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

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password, fullName, cpf, birthDate, subjectArea } = body;

  try {
    const connection = await pool.connect();
    try {
      const result = await connection.query(
        `INSERT INTO teachers (name, document, birth_date, subjects) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, cpf, birthDate, subjectArea]
      );

      const user = await connection.query(
        `INSERT INTO users (email, password, role, teacher_id) VALUES ($1, $2, $3, $4) RETURNING *`,
        [email, password, "teacher", result.rows[0].id]
      );

      return NextResponse.json(user.rows[0], { status: 201 });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar o professor" },
      { status: 500 }
    );
  }
}
