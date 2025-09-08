import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullname, email, phone, password } = body;

    // path ke users.json
    const filePath = path.join(process.cwd(), "database", "users.json");

    // baca file users.json
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);

    // cek kalau email sudah terdaftar
    if (users.find((u) => u.email === email)) {
      return new Response(JSON.stringify({ error: "Email sudah digunakan" }), {
        status: 400,
      });
    }

    // tambahkan user baru
    users.push({ fullname, email, phone, password });

    // tulis ulang ke file
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
