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
      const { store, email, address, city, state, description, storePickup, expressDelivery, weight } = req.body;
        
      if ( !store ||!email || !address || !city || !state  || !description || !storePickup  || !expressDelivery || !weight ) {
        res.status(400).json({ error: "Missing body parameter" });
        return;
      }
      
      const { db } = await connect();

      const response = await db.collection('users').insertOne({
        store, email, address, city, state, description, storePickup, expressDelivery, weight
    });

      res.status(200).json({ message: "Registered user" });
    } else {
      res.status(400).json({ error: "Wrong request method" })
    }
};