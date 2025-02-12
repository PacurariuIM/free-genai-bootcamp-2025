export { Word } from './Word';
export { Group } from './Group';
export { StudyActivity } from './StudyActivity';
export { StudySession } from './StudySession';

import { Word } from './Word';
import { Group } from './Group';
import { StudyActivity } from './StudyActivity';
import { StudySession } from './StudySession';

// Word-Group Many-to-Many relationship
Word.belongsToMany(Group, { through: 'WordGroup' });
Group.belongsToMany(Word, { through: 'WordGroup' });

// StudySession relationships
StudySession.belongsTo(Group);
Group.hasMany(StudySession);

StudySession.belongsTo(StudyActivity);
StudyActivity.hasMany(StudySession);

// Word reviews in study sessions
Word.belongsToMany(StudySession, { through: 'WordReview' });
StudySession.belongsToMany(Word, { through: 'WordReview' }); 