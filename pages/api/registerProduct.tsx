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
      const { 
        title, 
        description, 
        total_inventory, 
        original_price,
        promotional_price,
        gender,
        category,
        subcategory,
        has_variant,
        variantType1,
        inputOption1,
        variantType2,
        inputOption2,
        variantType3,
        inputOption3,
        variantPrices,
        variantInventories
      } = req.body;
        
      if (
        !title || 
        !description || 
        !total_inventory || 
        !original_price || 
        !promotional_price ||
        !gender ||
        !category ||
        !subcategory ||
        !has_variant
      ) {
        res.status(400).json({ error: "Missing body parameter" });
        return;
      }
      
      const { db } = await connect();

      const response = await db.collection('products').insertOne({
        title,
        description,
        total_inventory,
        original_price, 
        promotional_price,
        gender,
        category,
        subcategory,
        has_variant,
        variantType1,
        inputOption1,
        variantType2,
        inputOption2,
        variantType3,
        inputOption3,
        variantPrices,
        variantInventories
    });

      res.status(200).json({ message: "Registered product" });
    } else {
      res.status(400).json({ error: "Wrong request method" })
    }
};