import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database'

interface ErrorResponseType {
  error: string;
}

interface SuccessResponseType {
  message: string;
}

interface ProductInterface { 
  title: string;
  description: string;
  total_inventory: number;
  original_price: number;
  promotional_price: number;
  gender: string;
  category: string;
  subcategory: string;
  has_variant: boolean;
  variantType1: string;
  inputOption1: string;
  variantType2: string;
  inputOption2: string;
  variantType3: string;
  inputOption3: string;
  variantPrices: object;
  variantInventories: object;
  image: string;
}

export default async (
  req: NextApiRequest, 
  res: NextApiResponse<ErrorResponseType | SuccessResponseType | ProductInterface>
  ): Promise<void> => {
    if (req.method === "POST") {
      const product: ProductInterface = req.body;
        
      // if (
      //   !product.title || 
      //   !product.description || 
      //   !product.total_inventory || 
      //   !product.original_price || 
      //   !product.promotional_price ||
      //   !product.gender ||
      //   !product.category ||
      //   !product.subcategory ||
      //   !product.has_variant
      // ) {
      //   res.status(400).json({ error: "Missing body parameter" });
      //   return;
      // }
      
      const { db } = await connect();

      const response = await db.collection('products').insertOne(product);

      res.status(200).json({ message: "Product created!" });
    } else {
      res.status(400).json({ error: "Wrong request method" })
    }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};