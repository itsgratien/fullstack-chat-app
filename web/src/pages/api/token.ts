import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookies';
import { Enum } from 'utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const c = new cookie(req, res);
    return res.json({ token: c.get(Enum.token) });
  } catch (error: any) {
      console.log('aha', error);
    return res.status(500).json({ errors: error.message });
  }
};
