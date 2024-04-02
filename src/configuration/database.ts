import { Options } from "sequelize";
export interface IDatabase extends Options {};

const HOST = process.env.VANA_DB_HOST;
const PORT = parseInt(process.env.VANA_DB_PORT as string, 10) || 1433;
const DB_NAME = process.env.VANA_DB_NAME;

export const Database: IDatabase = {    
    host: HOST,
    port: PORT,
    database: DB_NAME,
    dialect: "mssql",
    timezone: "+00:00",
    logging: false,
    pool: { max: 15, min: 0, acquire: 60000, idle: 15000 },
    dialectOptions: {
        authentication: {
            type: "azure-active-directory-default"            
        },
        options: {
            encrypt: true,
            trustServerCertificate: false,
            useUTC: true,
            //multiSubnetFailover: true,
            requestTimeout: 30000
        }
    }
}