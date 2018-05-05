import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../shared/config';
import AccessToken from '../models/accessTokenModel';
const router = new Router;

export default router.use(function (req, res, next) {
	// const token = req.headers['x-access-token'];
	const token = req.cookies['x-access-token'];
	if (token) {
		AccessToken.findOne({accessToken: token})
		.then(accessToken => {
			if (accessToken) {
				jwt.verify(token, JWT_SECRET, (err, decoded) => {
					if (err) {
						AccessToken.deleteOne({accessToken: token})
						.exec((error) => {
							if (error) {
								return res.status(401).json({ error: error.message });
							}
							return res.status(401).json({ error: 'Failed to authenticate token.' });
						});
					} else {
						req.token = decoded;
						next();
					}
				});
			} else {
				return res.status(401).json({ error: 'AccessToken not valid' });
			}
		})
		.catch(err => {
			return res.status(500).json({error: err.message});
		});
	} else {
		return res.status(403).send({
			error: 'No token provided.'
		});
	}
});
