import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accessTokenSchema = new Schema({
	accessToken: {type: String, required: true, unique: true},
	userId: {type: Schema.Types.ObjectId, required: true},
	createdAt: {type: Date, required: true, default: Date.now, expires: 86400},
	updatedAt: {type: Date, required: true, default: Date.now},
});

export default mongoose.model('AccessToken', accessTokenSchema);
