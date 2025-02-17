import { Router } from 'express';
import { StudySession, Word, Group, WordReview } from '../models';
import { StudySessionAttributes } from '../types/models';

const router = Router();

// GET /api/dashboard/last_study_session
router.get('/last_study_session', async (_, res, next) => {
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
      res.json(null);
      return;
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
    return;
  }
});

// GET /api/dashboard/study_progress
router.get('/study_progress', async (_, res, next) => {
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
router.get('/quick_stats', async (_, res) => {
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

    // Calculate study streak dynamically
    const studySessions = await StudySession.findAll({
      order: [['startedAt', 'DESC']],
      limit: 10 // Adjust limit as needed
    });

    let studyStreak = 0;
    let lastSessionDate = null;

    for (const session of studySessions) {
      const sessionDate = new Date(session.startedAt).toDateString();
      if (lastSessionDate === null || lastSessionDate !== sessionDate) {
        studyStreak++;
        lastSessionDate = sessionDate;
      }
    }

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