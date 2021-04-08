import { ObjectID } from 'mongodb';
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
      const { db } = await connect();
      const { ids } = req.body;
      const objectIds = [];
      ids.map(id => objectIds.push(new ObjectID(id)))
      const query = { "_id" : { $in :  objectIds } }
      const response = await db.collection('products').deleteMany(query);

      res.status(200).json({ message: "Products deleted" });

    } else {
      res.status(400).json({ error: "Wrong request method" });
    }
};