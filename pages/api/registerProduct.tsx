import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database'

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
      const { description, size, color, inventory, original_price, promotional_price, tags } = req.body;
        
      if (!description || !size || !color || !inventory || !original_price || !promotional_price || !tags) {
        res.status(400).json({ error: "Missing body parameter" });
        return;
      }
      
      const { db } = await connect();

      const response = await db.collection('products').insertOne({
        description,
        size,
        color,
        inventory,
        original_price,
        promotional_price,
        tags
    });

      res.status(200).json({ message: "Registered product" });
    } else {
      res.status(400).json({ error: "Wrong request method" })
    }
};