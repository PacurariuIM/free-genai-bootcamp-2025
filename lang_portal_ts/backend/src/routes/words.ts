import { Router } from 'express';
import { Word, Group, WordReview } from '../models';
import { WordModel } from '../types/models';
import { validate } from '../middleware/validate';
import { paginationSchema, wordSchema } from '../schemas';

const router = Router();

// GET /api/words - Get paginated list of words
router.get('/', validate(paginationSchema), async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const perPage = Math.max(parseInt(req.query.perPage as string) || 100, 1);
    const offset = (page - 1) * perPage;

    const { count, rows } = await Word.findAndCountAll({
      limit: perPage,
      offset,
      include: [{
        model: WordReview,
        attributes: ['correct'],
      }],
    });

    const words = rows.map((word: Word) => {
      const reviews = (word as unknown as WordModel).WordReviews || [];
      return {
        id: word.id,
        german: word.german,
        english: word.english,
        correctCount: reviews.filter(r => r.correct).length,
        wrongCount: reviews.filter(r => !r.correct).length
      };
    });

    res.json({
      total: count,
      page,
      perPage,
      data: words
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/words/:id - Get word details
router.get('/:id', async (req, res, next) => {
  try {
    const word = await Word.findByPk(req.params.id, {
      include: [
        {
          model: Group,
          attributes: ['id', 'name'],
        },
        {
          model: WordReview,
          attributes: ['correct'],
        },
      ],
    }) as Word & WordModel;

    if (!word) {
      res.status(404).json({ error: 'Word not found' });
      return;
    }

    const reviews = word.WordReviews || [];
    res.json({
      id: word.id,
      german: word.german,
      english: word.english,
      correctCount: reviews.filter(r => r.correct).length,
      wrongCount: reviews.filter(r => !r.correct).length,
      groups: word.Groups?.map(g => ({
        id: g.id,
        name: g.name
      }))
    });
  } catch (error) {
    next(error);
    return;
  }
});

// POST /api/words - Create new word
router.post('/', validate(wordSchema), async (req, res, next) => {
  try {
    const word = await Word.create(req.body);
    res.status(201).json(word);
  } catch (error) {
    next(error);
  }
});

export default router; 