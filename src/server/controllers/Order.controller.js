import Order from '../models/orderModel';

export function addOrder(req, res){
	if (!req.body) {
		return res.status(403).json({error: 'Error in the query params'});
	}

	let orderData = req.body;

	orderData.userId = req.token.userId;

	let newOrder = new Order(orderData);

	newOrder.save()
	.then(order=>{
		// console.log('Order Created', order);
		let orderId = order._id;
		res.json({orderId});
	})
	.catch(err => {
		console.log('err while adding order', err);
		return res.status(409).json({error: err.message}).end();
	})
}

export function getAllOrders(req, res) {
	let userId = req.token.userId;
	Order.find({userId}, (err, orders)=>{
		if(err) return res.status(409).json({error: err.message}).end();
		return res.json(orders);
	})
}
