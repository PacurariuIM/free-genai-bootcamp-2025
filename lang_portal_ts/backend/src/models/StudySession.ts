import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class StudySession extends Model {
  declare id: number;
  declare groupId: number;
  declare studyActivityId: number;
  declare startedAt: Date;
  declare endedAt: Date;
}

StudySession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studyActivityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    endedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'StudySession',
    timestamps: true,
  }
); 