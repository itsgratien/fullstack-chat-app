import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookies';
import { Enum } from 'utils';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const c = new cookie(req, res);
    c.set(Enum.token, `Bearer ${req.body.token}`, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
    return res.json({message: 'loggedin successfully'})
  } catch (error: any) {
    return res.status(500).json({ errors: error.message });
  }
};
