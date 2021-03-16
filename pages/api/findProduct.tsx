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
      const { description } = req.body;

      if (!description) {
        res.status(400).json({ error: "Missing description on request body"});
        return;
      }

      const { db } = await connect();
      const response = await db.collection('products').find({ description: description }).toArray();

      if (!response) {
        res.status(200).json({ error: "Product with this description not found" });
        return;
      }

      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Wrong request method" })
    }
};