import { Router } from 'express';
import { StudyActivity, StudySession, WordReview } from '../models';
import { validate } from '../middleware/validate';
import { paginationSchema, idParamSchema } from '../schemas';
import { z } from 'zod';
import { StudySessionModel } from '../types/models';

const router = Router();

// GET /api/study-activities
router.get('/', validate(paginationSchema), async (_, res, next) => {
  try {
    const activities = await StudyActivity.findAll();
    res.json(activities);
    return;
  } catch (error) {
    next(error);
    return;
  }
});

// GET /api/study-activities/:id
router.get('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const activity = await StudyActivity.findByPk(req.params.id);
    if (!activity) {
      res.status(404).json({ error: 'Study activity not found' });
      return;
    }
    res.json(activity);
    return;
  } catch (error) {
    next(error);
    return;
  }
});

// GET /api/study-activities/:id/study-sessions
router.get('/:id/study-sessions', 
  validate(z.object({
    params: z.object({ id: z.string().transform(val => parseInt(val)) }),
    query: z.object({
      page: z.string().optional().transform(val => parseInt(val || '1')),
      perPage: z.string().optional().transform(val => parseInt(val || '100'))
    })
  })), 
  async (req, res, next) => {
    try {
      const { page, perPage } = req.query;
      const { count, rows } = await StudySession.findAndCountAll({
        where: {
          studyActivityId: req.params.id
        },
        include: [{
          model: WordReview,
          attributes: ['id']
        }],
        limit: Number(perPage),
        offset: (Number(page) - 1) * Number(perPage),
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
        page,
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