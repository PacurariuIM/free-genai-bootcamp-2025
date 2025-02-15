import { Router } from 'express';
import { Group, Word, StudySession, WordReview } from '../models';
import { GroupModel, StudySessionModel, WordReviewModel } from '../types/models';
import { Op } from 'sequelize';
import { validate } from '../middleware/validate';
import { paginationSchema, idParamSchema } from '../schemas';

const router = Router();

// GET /api/groups - Get paginated list of groups
router.get('/', validate(paginationSchema), async (req, res, next) => {
  try {
    const { page, perPage } = req.query;
    const { count, rows } = await Group.findAndCountAll({
      limit: Number(perPage),
      offset: (Number(page) - 1) * Number(perPage),
      include: [{
        model: Word,
        attributes: ['id'],
      }],
    });

    const groups = rows.map((group: Group) => ({
      id: group.id,
      name: group.name,
      wordCount: (group as unknown as GroupModel).Words?.length || 0
    }));

    res.json({
      total: count,
      page,
      perPage,
      data: groups
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/groups/:id - Get group details
router.get('/:id', validate(idParamSchema), async (req, res, next) => {
  try {
    const group = await Group.findByPk(req.params.id, {
      include: [
        {
          model: StudySession,
          include: [{
            model: WordReview,
            attributes: ['correct'],
          }],
        },
      ],
    }) as Group & GroupModel;

    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    const sessions = group.StudySessions || [];
    const totalReviews = sessions.reduce((sum, session) => 
      sum + (session.WordReviews?.length || 0), 0);
    const correctReviews = sessions.reduce((sum, session) => 
      sum + (session.WordReviews?.filter(r => r.correct).length || 0), 0);

    res.json({
      id: group.id,
      name: group.name,
      wordCount: await group.$count('Words'),
      totalStudySessions: sessions.length,
      averageSuccessRate: totalReviews ? (correctReviews / totalReviews) * 100 : 0
    });
  } catch (error) {
    next(error);
  }
});

export default router; 