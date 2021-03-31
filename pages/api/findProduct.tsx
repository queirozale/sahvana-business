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
    if (req.method === "GET") {
      const { db } = await connect();
      const response = await db.collection('products').find().toArray();

      if (!response) {
        res.status(200).json({ error: "Product with this description not found" });
        return;
      }

      res.status(200).json({ message: "Product found" });

    } else {
      res.status(400).json({ error: "Wrong request method" });
    }
};