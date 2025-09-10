// src/app/api/login/route.js
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const q = query(collection(db, "users"), where("email", "==", email));
    const snap = await getDocs(q);

    if (snap.empty) {
      return new Response(JSON.stringify({ error: "User tidak ditemukan" }), { status: 404 });
    }

    const user = snap.docs[0].data();

    if (user.password !== password) {
      return new Response(JSON.stringify({ error: "Password salah" }), { status: 401 });
    }

    return new Response(JSON.stringify({ success: true, user }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
