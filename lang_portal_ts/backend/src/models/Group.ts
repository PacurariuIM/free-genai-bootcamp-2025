import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Group extends Model {
  declare id: number;
  declare name: string;
}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Group',
    timestamps: true,
  }
); 