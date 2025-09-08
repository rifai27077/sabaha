import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // path ke users.json
    const filePath = path.join(process.cwd(), "database", "users.json");

    // baca file
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);

    // cari user sesuai email & password
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Email atau password salah" }),
        { status: 401 }
      );
    }

    // kalau valid → balikin success
    return new Response(JSON.stringify({ success: true, user }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
