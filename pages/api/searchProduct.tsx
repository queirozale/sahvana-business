import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';
import { ObjectID } from 'mongodb';

interface ErrorResponseType {
  error: string;
}


export default async (
  req: NextApiRequest, 
  res: NextApiResponse<ErrorResponseType | object[]>
  ): Promise<void> => {
    if (req.method === "GET") {
      // const { _id } = req.body;

      // if (!_id) {
      //   res.status(400).json({ error: "Missing _id on request body"});
      //   return;
      // }

      const { db } = await connect();
      const response = await db.collection('products').findOne({ _id: new ObjectID("605388dde69dd28150c87fe6") });

      if (response.length === 0) {
        res.status(200).json({ error: "Product not found" });
        return;
      }

      res.status(200).json(response)
    } else {
      res.status(400).json({ error: "Wrong request method" })
    }


};