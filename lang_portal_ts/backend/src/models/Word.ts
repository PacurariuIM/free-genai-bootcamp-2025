import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Word extends Model {
  declare id: number;
  declare german: string;
  declare english: string;
}

Word.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    german: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    english: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Word',
    timestamps: true,
  }
); 