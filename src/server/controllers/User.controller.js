import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import AccessToken from '../models/accessTokenModel';

export function getUser(req, res) {
	let token = req.cookies['x-access-token'];
	User.findById(token.userId, {
		attributes: ['id', 'name', 'email', 'username']
	})
	.then(user => {
		if (!user) {
			res.clearCookie('x-access-token').status(401).send("User not found")
		}
		res.send(user);
	})
	.catch(err => {
		res.status(500).send(err);
	});
}

export function checkToken(req, res) {
	let token = req.cookies['x-access-token'];
	if(token) {
		AccessToken.findOne({'accessToken': token}, (err, tokenDetails) => {
			if(err) {
				return res.status(500).json({error: err.message});
			}
			if(tokenDetails) {
				return res.status(200).end();
			} else {
				return res.status(201).json({msg:'No Token available'});
			}
		});
	} else {
		return res.status(201).json({msg:'No Token available'});
	}
}

export function createUser(req, res) {
	let userData = req.body;

	if (!userData || !userData.email || !userData.name || !userData.phone || !userData.password) {
		return res.status(400).send("Provie All User Details");
	}

	let newUser = new User(userData);

	newUser.save()
	.then(user => {
		// console.log('user added', user);
		let userId = user._id;
		res.json({userId});
	})
	.catch(err => {
		console.log('err while adding user', err);
		return res.status(409).json({error: err.message}).end();;
	});
}

export function login(req, res) {
	User.verifyPassword(req.body, (err, user) => {
		if (err) {
			return res.status(500).json({error: err.message});
		}
		if (!user) {
			return res.status(401).json({error: 'login credentials are wrong'});
		}

		const data = {
			userId: user._id
		}

		User.generateToken(data, (err, token) => {
			return res.cookie('x-access-token', token).json({token});
		});
	});
}

export function getDetails(req, res) {
	return res.json({tokenDetails: req.tokenData});
}

export function logout(req, res) {
	// console.log('cookies', req.cookies['x-access-token']);

	let token = req.cookies['x-access-token'];
	if(token) {
		AccessToken.deleteOne({accessToken: token})
		.exec(err => {
			if (err) {
				return res.status(500).json({error: err.message});
			}
			return res.clearCookie('x-access-token').status(200).send();
		})
	} else {
		return res.status(200).json({error: 'Logged out, but no token was available.'})
	}
}
