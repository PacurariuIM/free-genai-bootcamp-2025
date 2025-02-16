import { Router } from 'express';
import { Group, Word, StudySession, WordReview } from '../models';
import { GroupModel } from '../types/models';
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
    return;
  } catch (error) {
    next(error);
    return;
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
      res.status(404).json({ error: 'Group not found' });
      return;
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
    return;
  } catch (error) {
    next(error);
    return;
  }
});

export default router; 