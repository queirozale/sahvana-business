import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectID } from 'mongodb';
import connect from '../../utils/database'

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  type: boolean;
  type_var1: string[];
  type_var2: string[];
  type_var3: object;

}

export default async (
  req: NextApiRequest, 
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
  ): Promise<void> => {
    if (req.method === "GET") {
      const { id } = req.body;

      if (!id) {
        res.status(400).json({ error: "Missing type ID on request body"});
        return;
      }

      const { db } = await connect();
      const response = await db.collection('users').findOne({ "_id": new ObjectID(id) })

      if (!response) {
        res.status(200).json({ error: "Type not found" });
        return;
      }

      res.status(200).json(response)
    } else {
      res.status(400).json({ error: "Wrong request method" })
    }


};