import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectID } from 'mongodb';
import connect from '../../utils/database';
import { getSession } from 'next-auth/client';

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  date: string
  user_name: string
  user_id: string
  type_name: string
  type_id: string
  type_var1: string
  location: string
  appointment_link: string

}

export default async (
  req: NextApiRequest, 
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
  ): Promise<void> => {
    if (req.method === "POST") {
      const session = await getSession({ req });

      if (!session) {
        res.status(400).json({ error: "Please login first"});
        return;
      }

      const { 
        date,
        user_name,
        user_id,
        type_name,
        type_id,
        type_var1,
        location,
        appointment_link
       } = req.body;

      if (
        !date ||
        !user_name ||
        !user_id ||
        !type_name ||
        !type_id ||
        !type_var1 ||
        !location
      ) {
        res.status(400).json({ error: "Missing type ID on request body"});
        return;
      }

      const { db } = await connect();

      const userExists = await db.collection('users').findOne({ "_id": new ObjectID(user_id) })

      if (!userExists) {
        res.status(200).json({ error: `User ${user_name} with ID ${user_id} does not exist` });
        return;
      }

      const typeExists = await db.collection('users').findOne({ "_id": new ObjectID(type_id) })

      if (!typeExists) {
        res.status(200).json({ error: `Type ${type_name} with ID ${type_id} does not exist` });
        return;
      }

      const appointment = {
        date,
        user_name,
        user_id,
        type_name,
        type_id,
        type_var1,
        location,
        appointment_link: appointment_link || ''
      }

      await db.collection('users').updateOne(
        { _id: new ObjectID(user_id)}, 
        { $push: { type_var2: appointment } }
      );

      await db.collection('users').updateOne(
        { _id: new ObjectID(type_id) }, 
        { $push: { type_var2: appointment } }
      );

      res.status(200).json(appointment);
    } else {
      res.status(400).json({ error: "Wrong request method" });
    }


};