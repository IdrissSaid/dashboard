import Session from "@/Model/Session";
import connectDB from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
const { v4: uuidv4 } = require('uuid');

const login = async (body: any) => {
  const session = await Session.findOne({ "user.email": body.user.email })

  if (!session) {
    return NextResponse.json("User Not Found", { status: 404 });
  }
  const passwordMatch = await bcrypt.compare(body.user.password, session.user.password);

  if (passwordMatch)
      return NextResponse.json({id_session: session.session.sessionId}, {status: 202});
  else
      return NextResponse.json({error: "Email ou Mot de passe invalide"}, {status: 401});
}

const register = async (body: any) => {
  try {
    const hashedPassword = (body.user.provider === "own") ? await bcrypt.hash(body?.user?.password, 10) : "";
    const sessionId = uuidv4();

    body.session = { ...body.session, sessionId: sessionId };
    await Session.create({
      user: {
        email: body?.user?.email,
        password: hashedPassword || "",
      },
      account: body?.account || null,
      session: body?.session,
    });

    return NextResponse.json({ id_session: sessionId }, { status: 200 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: `L'email ${body.user.email} existe déjà` }, { status: 409 });
    } else {
      return NextResponse.json({ error: "An error occurred", details: error.message }, { status: 500 });
    }
  }
};

const getSessionId = async (body: any) => {
  const session = await Session.findOne({ "user.email": body.user.email })

  if (!session)
    return await register(body)
  return NextResponse.json({ id_session: session.session.sessionId }, { status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    if (!body || !body.user || (body.user.provider == "own" && !body.user.password || !body.user.email))
      return NextResponse.json({ message: "error" }, { status: 404 });
    await connectDB();

    if (body.user.type === "login" && body.user.provider == "own") return await login(body)
    else if (body.user.type !== "login" && body.user.type !== "register") return await getSessionId(body)

    return await register(body);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}