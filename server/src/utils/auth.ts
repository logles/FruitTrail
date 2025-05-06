import jwt from 'jsonwebtoken';
import { Request } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET as string;
const expiration = '2h';

interface Payload {
  _id: string;
  username: string;
}

export function signToken({ _id, username }: Payload): string {
  const payload = { _id, username };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

export async function authMiddleware({ req }: { req: Request }) {
  // Check for token in header
  let token = req.headers.authorization || '';

  // Allow token to be passed as "Bearer <token>"
  if (token.startsWith('Bearer ')) {
    token = token.slice(7).trim();
  }

  console.log(token)

  if (!token) return req;

  try {
    const { data } = jwt.verify(token, secret) as { data: Payload };
    (req as any).user = data;
    console.log(data)
  } catch {
    console.log('Invalid token');
  }

  return req;
}
