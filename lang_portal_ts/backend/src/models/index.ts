import { Word } from './Word';
import { Group } from './Group';
import { StudyActivity } from './StudyActivity';
import { StudySession } from './StudySession';
import { WordReview } from './WordReview';
import { WordGroup } from './WordGroup';

// Word-Group Many-to-Many relationship
Word.belongsToMany(Group, { 
  through: WordGroup,
  foreignKey: 'wordId'
});
Group.belongsToMany(Word, { 
  through: WordGroup,
  foreignKey: 'groupId'
});

// StudySession relationships
StudySession.belongsTo(Group, {
  foreignKey: 'groupId'
});
Group.hasMany(StudySession, {
  foreignKey: 'groupId'
});

StudySession.belongsTo(StudyActivity, {
  foreignKey: 'studyActivityId'
});
StudyActivity.hasMany(StudySession, {
  foreignKey: 'studyActivityId'
});

// WordReview relationships
Word.hasMany(WordReview, {
  foreignKey: 'wordId'
});
WordReview.belongsTo(Word, {
  foreignKey: 'wordId'
});

StudySession.hasMany(WordReview, {
  foreignKey: 'studySessionId'
});
WordReview.belongsTo(StudySession, {
  foreignKey: 'studySessionId'
});

// Word-StudySession Many-to-Many through WordReview
Word.belongsToMany(StudySession, { 
  through: WordReview,
  foreignKey: 'wordId'
});
StudySession.belongsToMany(Word, { 
  through: WordReview,
  foreignKey: 'studySessionId'
});

export {
  Word,
  Group,
  StudyActivity,
  StudySession,
  WordReview,
  WordGroup
}; 