import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class WordReview extends Model {
  declare id: number;
  declare wordId: number;
  declare studySessionId: number;
  declare correct: boolean;
  declare createdAt: Date;
}

WordReview.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    wordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Words',
        key: 'id'
      }
    },
    studySessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'StudySessions',
        key: 'id'
      }
    },
    correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'WordReview',
    timestamps: true,
  }
); 