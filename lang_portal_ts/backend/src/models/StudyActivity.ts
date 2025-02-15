import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class StudyActivity extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare thumbnail: string;
  declare launchUrl: string;
}

StudyActivity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    launchUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'StudyActivity',
    timestamps: true,
  }
); 