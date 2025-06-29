import { DataSource } from 'typeorm';
import { config as envConfig } from '../config';

import { User } from './Entities/User.entity';
import { Appointment } from './Entities/appointment.entity';
import { Availability } from './Entities/availability.entity';


const { dbHost, dbName, dbPassword, dbPort, dbUserName, isSynchronize } = envConfig();

interface IDBConfig {
	userName: string,
	password: string,
	host: string,
	port: number,
	dbName: string,
	isSynchronize: string
}

const dbConfig: IDBConfig = { userName: dbUserName, password: dbPassword, host: dbHost, port: dbPort, dbName: dbName, isSynchronize: isSynchronize };

class Postgresdb {
	masterDb: any;
	isConnected: any;
	masterConnection: any;
	private connectionUrl: string;
	private isSync: string;
	private dbConfig: IDBConfig;

	constructor(config: IDBConfig) {
		this.dbConfig = config;
		this.masterDb = null;
		this.isConnected = false;
		this.masterConnection = null;
		this.connectionUrl = `postgresql://${config.userName}:${config.password}@${config.host}:${config.port}/${config.dbName}` as string;
		console.log(this.connectionUrl, 'connection url')
		this.isSync = config.isSynchronize;
		console.log(this.isSync, 'this.isSync==============')
	}
	/**
	 * @description Initialize the Postgresdb
	 * @returns Promise<void>
	 */
	async initialize() {
		try {
			console.log('-------------------------------------------------------------');
			console.log('Initializing postgresdb');

			const { postgresDBUrl } = envConfig();
			const dbConn: DataSource = new DataSource({
				type: 'postgres',
				url: this.connectionUrl,
				synchronize: JSON.parse(this.isSync),
				logging: true,
				entities: [User, Appointment, Availability],
				schema: 'public',
				extra: {
					ssl: {
						rejectUnauthorized: false,
					},
					host: this.dbConfig.host,
					port: 22,
					user: this.dbConfig.userName,
					password: this.dbConfig.password,
					keepAlive: true,
					timeZone: 'IST'
				}
			});

			this.isConnected = true;
			this.masterConnection = await dbConn.initialize();
			console.log('Connected to host', postgresDBUrl);

			return dbConn;
		} catch (err) {
			this.isConnected = false;
			console.log('Failed to connect to postgres db. ', err);
			throw err;
		}
	}

	getConnection() {
		try {

			if (this.masterConnection) {
				return this.masterConnection;
			}

			throw new Error(`PostgresDbConnection is not created`);
		}
		catch (err) {
			console.log('????????????????????????????????', err);

		}
	}
	async close() {
		await this.masterConnection.close();
		this.isConnected = false;
	}
}


export const DbConnections = {
	AppDbConnection: new Postgresdb(dbConfig)
}
