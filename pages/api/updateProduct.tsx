import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectID } from 'mongodb';
import connect from '../../utils/database';
import { getSession } from 'next-auth/client';

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
      const session = await getSession({ req });

      // if (!session) {
      //   res.status(400).json({ error: "Please login first"});
      //   return;
      // }

      const { title, change_inventory } = req.body;

      if ( !title || !change_inventory ) {
        res.status(400).json({ error: "Missing body parameter" });
        return;
      }

      const { db } = await connect();
      const query = { "title": title };
      const update = {
        "$inc": {
          "total_inventory": change_inventory,
        }
      };

      const userExists = await db.collection('products').findOne(query)

      if (!userExists) {
        res.status(200).json({ error: `Product with title ${title} does not exist` });
        return;
      }

      await db.collection('products').updateOne(query, update);

      res.status(200).json({ message: "Successfully updated" });
    } else {
      res.status(400).json({ error: "Wrong request method" });
    }


};