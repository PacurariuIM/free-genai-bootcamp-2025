import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, z } from 'zod';

export const validate = (schema: AnyZodObject) => 
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      next(error);
    }
  }; 

  // Reusable schema parts
const idParam = z.object({ 
  id: z.string().transform(val => parseInt(val)) 
});

const pageQuery = z.object({
  page: z.string().optional().transform(val => Math.max(parseInt(val || '1'), 1)),
  perPage: z.string().optional().transform(val => Math.max(parseInt(val || '100'), 1))
});

// Complete schemas for routes
export const paginationSchema = z.object({ query: pageQuery });
export const idParamSchema = z.object({ params: idParam });