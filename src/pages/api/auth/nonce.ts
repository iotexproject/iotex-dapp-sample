import type { NextApiRequest, NextApiResponse } from 'next';
import { generateNonce } from 'siwe';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.status(200).json({
      nonce: generateNonce()
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
