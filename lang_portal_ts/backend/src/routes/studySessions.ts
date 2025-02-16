import { Router } from 'express';
import { StudySession, StudyActivity, Group, WordReview } from '../models';
import { StudySessionModel } from '../types/models';
import { validate } from '../middleware/validate';
import { paginationSchema, studySessionSchema, wordReviewSchema } from '../schemas';

const router = Router();

// GET /api/study-sessions
router.get('/', validate(paginationSchema), async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = 100;
    const offset = (page - 1) * perPage;

    const { count, rows } = await StudySession.findAndCountAll({
      include: [
        {
          model: StudyActivity,
          attributes: ['name']
        },
        {
          model: Group,
          attributes: ['name']
        },
        {
          model: WordReview,
          attributes: ['id']
        }
      ],
      limit: perPage,
      offset,
      order: [['startedAt', 'DESC']]
    });

    const sessions = rows.map((session: StudySession) => ({
      id: session.id,
      activityName: (session as unknown as StudySessionModel).StudyActivity?.name,
      groupName: (session as unknown as StudySessionModel).Group?.name,
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
});

// POST /api/study-sessions
router.post('/', validate(studySessionSchema), async (req, res, next) => {
  try {
    const session = await StudySession.create(req.body);
    res.status(201).json(session);
    return;
  } catch (error) {
    next(error);
    return;
  }
});

// POST /api/study-sessions/:id/words/:word_id/review
router.post('/:id/words/:word_id/review', 
  validate(wordReviewSchema), 
  async (req, res, next) => {
    try {
      const { id: sessionId, word_id: wordId } = req.params;
      const { correct } = req.body;

      const review = await WordReview.create({
        wordId,
        studySessionId: sessionId,
        correct
      });

      res.json({
        success: true,
        wordId: review.wordId,
        sessionId: review.studySessionId,
        correct: review.correct,
        reviewedAt: review.createdAt
      });
      return;
    } catch (error) {
      next(error);
      return;
    }
  }
);

export default router; 