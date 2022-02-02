import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TPayload } from '../__generated__';
import { environment } from '../Config';

class Generate {
	generateToken = (values: TPayload): string => {
		return jwt.sign(values, environment.secretKey);
	};
    
	hashPassword = (password: string) => {
		const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	};
    
	comparePassword = (hashedPassword: string, password: string) => {
		return bcrypt.compareSync(password, hashedPassword);
	};
}

export const generate = new Generate();
