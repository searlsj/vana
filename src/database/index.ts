import fs from "fs";
import path from "path";
import { Sequelize, ModelDefined } from "sequelize";
import Associations from "./associations";
import * as Configuration from "../configuration";

// create database
const sequelize: Sequelize = new Sequelize(Configuration.Database);

// dynamically initialize all models
const Models: Map<string, ModelDefined<any, any>> = new Map<string, ModelDefined<any, any>>();
const directory: string = path.join(__dirname, 'models');
if (fs.existsSync(directory)) {
    fs.readdirSync(directory)
        .forEach(file => {
            if (file.endsWith(".js")) {
                const model: ModelDefined<any, any> = require(path.join(__dirname, 'models', file)).default(sequelize);
                Models.set(model.name, model);
            }
        });
}

// create the associations within the ORM using the models
const associations: Associations = new Associations(Models);
associations.all();

export {
    Models,    
    sequelize as Sequelize
};