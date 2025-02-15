import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class WordGroup extends Model {
  declare id: number;
  declare wordId: number;
  declare groupId: number;
}

WordGroup.init(
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
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'WordGroup',
    tableName: 'WordGroups',
    timestamps: true,
  }
); 