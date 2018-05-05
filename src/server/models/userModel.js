import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../shared/config';

import AccessToken from './accessTokenModel';
const Schema = mongoose.Schema;

const userScema = new Schema({
	name: {type: String},
	email: {type: String, required: true, unique: true},
	phone: {type: String, required: true},
	password: {type: String, required: true},
	createdAt: {type: Date, required: true, default: Date.now},
	updatedAt: {type: Date, required: true, default: Date.now},
});

userScema.static('verifyPassword', function(data, cb) {
	this.findOne({email: data.email}, function(err, user) {
		if (err) {
			return cb(err);
		}
		if (!user) {
			return cb(null, false);
		}
		bcrypt.compare(data.password, user.password, (err, res) => {
			if (err) {
				return cb(err);
			}
			if (!res) {
				return cb(null, false);
			}
			return cb(null, user);
		});
	})
});

userScema.static('generateToken', function(payload, cb) {

	const token = jwt.sign(payload, JWT_SECRET, {
		expiresIn: 86400 // seconds
	});

	const newAccessToken = new AccessToken({
		accessToken: token,
		userId: payload.userId,
	});

	newAccessToken.save()
	.then(accessToken => {
		cb(null, token);
	})
	.catch(err => {
		cb(err);
	});

});

userScema.pre('save', function(next) {
	bcrypt.hash(this.password, 10)
	.then((hash) => {
		this.password = hash;
		next();
	})
	.catch(err => {
		return next(err);
	});
});

export default mongoose.model('User', userScema);
