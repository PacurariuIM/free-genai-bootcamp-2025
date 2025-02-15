import { Model } from 'sequelize';
import { Word, Group, StudyActivity, StudySession, WordReview } from '../models';

// Base interfaces for model attributes
export interface WordAttributes {
  id: number;
  german: string;
  english: string;
  Groups?: GroupModel[];
  WordReviews?: WordReviewModel[];
}

export interface GroupAttributes {
  id: number;
  name: string;
  Words?: WordModel[];
  StudySessions?: StudySessionModel[];
}

export interface StudySessionAttributes {
  id: number;
  groupId: number;
  studyActivityId: number;
  startedAt: Date;
  endedAt?: Date;
  Group?: GroupModel;
  StudyActivity?: StudyActivityModel;
  Words?: WordModel[];
  WordReviews?: WordReviewModel[];
}

export interface WordReviewAttributes {
  id: number;
  wordId: number;
  studySessionId: number;
  correct: boolean;
  createdAt: Date;
  Word?: WordModel;
  StudySession?: StudySessionModel;
}

export interface StudyActivityAttributes {
  id: number;
  name: string;
  description?: string;
  thumbnail?: string;
  launchUrl: string;
  StudySessions?: StudySessionModel[];
}

// Model classes with Sequelize instance methods
export interface WordModel extends Model<WordAttributes>, WordAttributes {
  WordReviews: WordReviewModel[];
  Groups: GroupModel[];
  $count: (key: string) => Promise<number>;
}

export interface GroupModel extends Model<GroupAttributes>, GroupAttributes {
  Words: WordModel[];
  StudySessions: StudySessionModel[];
  $count: (key: string) => Promise<number>;
  setWords: (words: WordModel[]) => Promise<void>;
  getWords: () => Promise<WordModel[]>;
  addWord: (word: WordModel) => Promise<void>;
  addWords: (words: WordModel[]) => Promise<void>;
}

export interface StudySessionModel extends Model<StudySessionAttributes>, StudySessionAttributes {
  WordReviews: WordReviewModel[];
  Words: WordModel[];
  Group: GroupModel;
  StudyActivity: StudyActivityModel;
}

export interface WordReviewModel extends Model<WordReviewAttributes>, WordReviewAttributes {
  Word: WordModel;
  StudySession: StudySessionModel;
}

export interface StudyActivityModel extends Model<StudyActivityAttributes>, StudyActivityAttributes {
  StudySessions: StudySessionModel[];
} 