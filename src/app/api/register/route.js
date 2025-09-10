// src/app/api/register/route.js
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export async function POST(req) {
  try {
    const { fullname, email, phone, password } = await req.json();

    // ✅ cek apakah email sudah ada
    const q = query(collection(db, "users"), where("email", "==", email));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return new Response(JSON.stringify({ error: "Email sudah digunakan" }), { status: 400 });
    }

    // ✅ simpan user baru
    await addDoc(collection(db, "users"), {
      fullname,
      email,
      phone,
      password, // ⚠️ sebaiknya di-hash (misalnya pakai bcrypt di server)
      createdAt: Date.now(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
