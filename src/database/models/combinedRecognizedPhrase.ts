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
    channel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Channel",
      validate: {
        isInt: true
      }
    },
    lexical: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Lexical",
      validate: {
        isString: (value: string) => _.isString(value)
      }
    },
    itn: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Itn",
      validate: {
        isString: (value: string) => _.isString(value)
      }
    },
    maskedItn: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "MaskedItn",
      validate: {
        isString: (value: string) => _.isString(value)
      }
    },
    display: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Display",
      validate: {
        isString: (value: string) => _.isString(value)
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