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

      const { store, email, address, city, state, description, storePickup, expressDelivery } = req.body;


      if ( !store ||!email || !address || !city || !state  || !description || !storePickup  || !expressDelivery ) {
        res.status(400).json({ error: "Missing body parameter" });
        return;
      }

      const { db } = await connect();
      const query = { "email": email };
      const update = {
        "$set": {
          "store": store,
          "email": email,
          "address": address,
          "city": city,
          "state": state,
          "description": description,
          "storePickup": storePickup,
          "expressDelivery": expressDelivery
        }
      };

      const userExists = await db.collection('users').findOne(query)

      if (!userExists) {
        res.status(200).json({ error: `User ${store} with email ${email} does not exist` });
        return;
      }


      await db.collection('users').updateOne(query, update);


      res.status(200).json({ message: "Successfully updated" });
    } else {
      res.status(400).json({ error: "Wrong request method" });
    }


};