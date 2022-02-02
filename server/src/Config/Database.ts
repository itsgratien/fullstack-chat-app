import mongoose from 'mongoose';
import { environment } from './Environment';

export const connect = async () => {
	await mongoose.connect(environment.databaseUri);
	return undefined;
};
