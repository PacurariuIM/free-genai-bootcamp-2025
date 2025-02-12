import { Router } from 'express';
import { StudySession, Word, Group, WordReview } from '../models';
import { Op } from 'sequelize';
import { StudySessionAttributes } from '../types/models';
import { validate } from '../middleware/validate';

const router = Router();

// GET /api/dashboard/last_study_session
router.get('/last_study_session', async (req, res, next) => {
  try {
    const lastSession = await StudySession.findOne({
      include: [
        {
          model: Group,
          attributes: ['name'],
        },
        {
          model: Word,
          include: [{
            model: WordReview,
            attributes: ['correct']
          }],
          attributes: ['id', 'german', 'english']
        },
      ],
      order: [['startedAt', 'DESC']],
    }) as StudySession & StudySessionAttributes;

    if (!lastSession) {
      return res.json(null);
    }

    const words = lastSession.Words || [];
    const correctCount = words.filter(w => w.WordReviews[0]?.correct).length;

    res.json({
      id: lastSession.id,
      startedAt: lastSession.startedAt,
      endedAt: lastSession.endedAt,
      groupId: lastSession.groupId,
      groupName: lastSession.Group?.name || 'Unknown Group',
      totalWords: words.length,
      correctCount,
      incorrectCount: words.length - correctCount,
      accuracy: words.length ? (correctCount / words.length) * 100 : 0,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/dashboard/study_progress
router.get('/study_progress', async (req, res, next) => {
  try {
    const totalWordsAvailable = await Word.count();
    const totalWordsStudied = await Word.count({
      include: [{
        model: WordReview,
        required: true,
      }],
    });

    res.json({
      totalWordsStudied,
      totalWordsAvailable,
      progress: totalWordsAvailable ? (totalWordsStudied / totalWordsAvailable) * 100 : 0,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/dashboard/quick_stats
router.get('/quick_stats', async (req, res) => {
  try {
    const totalStudySessions = await StudySession.count();
    const totalActiveGroups = await Group.count({
      include: [{
        model: StudySession,
        required: true,
      }],
    });

    const correctReviews = await WordReview.count({ where: { correct: true } });
    const totalReviews = await WordReview.count();
    
    const successRate = totalReviews ? (correctReviews / totalReviews) * 100 : 0;

    // Calculate study streak (simplified version)
    const studyStreak = 3; // Placeholder - implement actual streak calculation

    res.json({
      successRate,
      totalStudySessions,
      totalActiveGroups,
      studyStreak,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 