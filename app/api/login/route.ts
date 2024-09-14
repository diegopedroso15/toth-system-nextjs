import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  try {
    const connection = await pool.connect();
    try {
      const user = await connection.query(
        `SELECT * FROM users WHERE email = $1 AND password = $2`,
        [email, password]
      );

      if (user.rows.length === 0) {
        return NextResponse.json(
          { error: "Usuário ou senha inválidos" },
          { status: 401 }
        );
      }


      return NextResponse.json(user.rows[0], { status: 200 });
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