//@ts-nocheck

import { Model, BuildOptions } from 'sequelize';
export interface IMyTableAttributes {
  id: string  
}
export interface IMyTableModel extends IMyTableAttributes, Model {}
export type IMyTableModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): IMyTableModel;
};

import * as _ from 'lodash';
import { Sequelize, DataTypes } from 'sequelize';
export default function (sequelize: Sequelize) {
  const attributes = {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "ID",
      validate: {
        isUUID: "all"
      }
    },    
  };
  const options = {
    tableName: "",
    timestamps: false,
    comment: "",
    indexes: []
  };
  const MyTable = sequelize.define("MyTable", attributes, options);
  return MyTable;
}