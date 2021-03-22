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
      const { _id } = req.body;
      const response = {
        "response": _id
      }
      // const response = await db.collection('products').deleteOne( { "_id" : new ObjectID(_id[0]) } );
      // for (var i = 0; i < _id.length; i++) {
      //   var id = _id[i];
      //   const response = await db.collection('products').deleteOne( { "_id" : new ObjectID(id) } );
      // }
      // for (const id in ids) {
      // }

      if (!response) {
        res.status(200).json({ error: "Product with this id not found" });
        return;
      }

      res.status(200).json({ message: "Deu certo"});

    } else {
      res.status(400).json({ error: "Wrong request method" });
    }
};