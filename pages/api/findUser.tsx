import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  message: string;
}

export default async (
  req: NextApiRequest, 
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
  ): Promise<void> => {
    if (req.method === "POST") {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ error: "Missing email on request body"});
        return;
      }

      const { db } = await connect();
      const response = await db.collection('users').findOne({ email })

      if (!response) {
        res.status(404);
        return;
      }

      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Wrong request method" })
    }
};