import { Router } from 'express';
import { StudyActivity, StudySession, WordReview } from '../models';
import { validate } from '../middleware/validate';
import { paginationSchema } from '../schemas';
import { z } from 'zod';
import { StudySessionModel } from '../types/models';
import { idParamSchema } from '../schemas';

const router = Router();

// GET /api/study-activities
router.get('/', validate(paginationSchema), async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const perPage = Math.max(parseInt(req.query.perPage as string) || 100, 1);
    const offset = (page - 1) * perPage;

    const { count, rows } = await StudyActivity.findAndCountAll({
      limit: perPage,
      offset,
      order: [['name', 'ASC']]
    });

    return res.json({
      total: count,
      page,
      perPage,
      data: rows
    });
  } catch (error) {
    return next(error);
  }
});

// GET /api/study-activities/:id
router.get('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const activity = await StudyActivity.findByPk(req.params.id);
    
    if (!activity) {
      return res.status(404).json({ error: 'Study activity not found' });
    }
    
    return res.json(activity);
  } catch (error) {
    return next(error);
  }
});

// GET /api/study-activities/:id/study-sessions
router.get('/:id/study-sessions', 
  validate(z.object({
    params: z.object({ id: z.string().transform(val => parseInt(val)) }),
    query: z.object({
      page: z.string().optional().transform(val => Math.max(parseInt(val || '1'), 1)),
      perPage: z.string().optional().transform(val => parseInt(val || '100'))
    })
  })), 
  async (req, res, next) => {
    try {
      const { page, perPage } = req.query;
      const offset = (Math.max(Number(page), 1) - 1) * Number(perPage);

      const { count, rows } = await StudySession.findAndCountAll({
        where: {
          studyActivityId: req.params.id
        },
        include: [{
          model: WordReview,
          attributes: ['id']
        }],
        limit: Number(perPage),
        offset,
        order: [['startedAt', 'DESC']]
      });

      const sessions = rows.map((session: StudySession) => ({
        id: session.id,
        startTime: session.startedAt,
        endTime: session.endedAt,
        reviewItemsCount: (session as unknown as StudySessionModel).WordReviews?.length || 0
      }));

      res.json({
        total: count,
        page: Math.max(Number(page), 1),
        perPage,
        data: sessions
      });
      return;
    } catch (error) {
      next(error);
      return;
    }
  }
);

export default router; 