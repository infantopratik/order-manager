import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	items: [{
		SNo: { type: Number, default: null },
		key: { type: Number, default: null },
		name: { type: String, default: null },
		price: { type: Number, default: null },
		pricePerKG: { type: String, default: null },
		quantity: { type: String, default: null }
	}],
	grandTotal: { type: Number, default: null },
	customerName: { type: String, default: null },
	createdAt: { type: Date, required: true, default: Date.now },
	updatedAt: { type: Date, required: true, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
