import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { SiweMessage } from 'siwe';

const encode = (jwtClaims: { sub: string; name: string; iat: number; exp: number }) => {
  return jwt.sign(jwtClaims, process.env.JWT_SECRET, { algorithm: 'HS256' });
};

const decode = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
};

const verify = async (message: string, signature: string) => {
  const siweMessage = new SiweMessage(message);
  try {
    await siweMessage.validate(signature);
    return siweMessage;
  } catch {
    return null;
  }
};

const generateJWT = (address: string) => {
  const iat = Date.now() / 1000;
  const exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
  const token = encode({
    sub: address,
    name: address,
    iat,
    exp
  });

  return {
    token,
    exp
  };
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message, signature } = req.body;
    if (!message || !signature) {
      res.status(400).json({ message: 'invalid request' });
      return;
    }
    const siweMessage = await verify(message, signature);
    if (!siweMessage) {
      res.status(400).json({ message: 'invalid signature' });
      return;
    }
    const jwt = generateJWT(siweMessage.address);
    res.status(200).json(jwt);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
