import dotenv from 'dotenv';

dotenv.config();

export const environment = {
	databaseUri: process.env.DATABASE_URI || '',
	secretKey: process.env.SECRET_KEY || ''
};
