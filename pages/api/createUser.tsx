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
      const { name, surname, email, store, password } = req.body;
        
      if (!name || !surname || !email || !store || !password) {
        res.status(400).json({ error: "Missing body parameter" });
        return;
      }
      
      const { db } = await connect();

      const response = await db.collection('users').insertOne({
        name,
        surname,
        email,
        store,
        password
    });

      res.status(200).json({ message: "Registered user" });
    } else if (req.method === "GET") {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Missing email on request body"});
        return;
      }

      const { db } = await connect();
      const response = await db.collection('users').findOne({ email, password })

      if (!response) {
        res.status(200).json({ error: "User with this email not found" });
        return;
      }

      res.status(200).json(response)
    } else {
      res.status(400).json({ error: "Wrong request method" })
    }
};