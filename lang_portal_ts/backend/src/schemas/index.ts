import { z } from 'zod';

// Reusable schema parts
const idParam = z.object({ 
  id: z.string().transform(val => parseInt(val)) 
});

const pageQuery = z.object({
  page: z.string().optional().transform(val => parseInt(val || '1')),
  perPage: z.string().optional().transform(val => parseInt(val || '100'))
});

// Complete schemas for routes
export const paginationSchema = z.object({ query: pageQuery });

export const idParamSchema = z.object({ params: idParam });

export const wordReviewSchema = z.object({
  params: z.object({
    id: z.string(),
    word_id: z.string()
  }),
  body: z.object({
    correct: z.boolean()
  })
});

export const wordSchema = z.object({
  body: z.object({
    german: z.string().min(1),
    english: z.string().min(1)
  })
});

export const studySessionSchema = z.object({
  body: z.object({
    groupId: z.number(),
    studyActivityId: z.number()
  })
}); 