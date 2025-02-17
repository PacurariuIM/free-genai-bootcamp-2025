import { Word, Group, StudyActivity } from '../models';
import { sequelize } from '../config/database';
import { GroupModel } from '../types/models';
import { WordSeedData } from '../types/seedData';
import { WordModel } from '../types/models';

// Import seed data
import adjectives from './data_adjectives.json';
import nouns from './data_nouns.json';
import verbs from './data_verbs.json';

export async function seedStudyActivities() {
  const activities = [
    {
      name: 'Flashcards',
      description: 'Practice with digital flashcards',
      thumbnail: 'flashcards.png',
      launchUrl: '/activities/flashcards'
    },
    {
      name: 'Word Match',
      description: 'Match German words with their English translations',
      thumbnail: 'word-match.png',
      launchUrl: '/activities/word-match'
    }
  ];

  for (const activity of activities) {
    await StudyActivity.findOrCreate({
      where: { name: activity.name },
      defaults: activity
    });
  }
}

export async function seedDatabase() {
  try {
    // Sync database
    await sequelize.sync({ force: true }); // Be careful with force: true in production!

    // Create default word groups
    const groups = await Group.bulkCreate([
      { name: 'Adjectives' },
      { name: 'Nouns' },
      { name: 'Verbs' }
    ]) as GroupModel[];

    // Create words and associate with groups
    const [adjectivesGroup, nounsGroup, verbsGroup] = groups;

    // Seed adjectives
    const adjectiveWords = await Word.bulkCreate(
      (adjectives as WordSeedData[]).map(word => ({
        german: word.german,
        english: word.english
      }))
    ) as unknown as WordModel[];
    await adjectivesGroup.setWords(adjectiveWords);

    // Seed nouns
    const nounWords = await Word.bulkCreate(
      (nouns as WordSeedData[]).map(word => ({
        german: word.german,
        english: word.english
      }))
    ) as unknown as WordModel[];
    await nounsGroup.setWords(nounWords);

    // Seed verbs
    const verbWords = await Word.bulkCreate(
      (verbs as WordSeedData[]).map(word => ({
        german: word.german,
        english: word.english
      }))
    ) as unknown as WordModel[];
    await verbsGroup.setWords(verbWords);

    // Seed study activities
    await seedStudyActivities();

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
} 