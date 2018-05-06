import React, { Component } from 'react';
import { Button, Layout, Input, Icon, notification, Modal } from 'antd';
const { Header, Footer, Content } = Layout;
import axios from 'axios';
import './Home.scss';
import BillingTable from './Scenes/BillingTable/BillingTable';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			items: [{
			  key: '1',
			  SNo: null,
			  name: null,
			  quantity: null,
			  pricePerKG: null,
			  price: null
			}],
			grandTotal: 0.00,
			newProdName: '',
			newProdquantity: null,
			newProdPricePerKG: null,
			visible: false
		}
	}

	componentDidMount() {
		axios.get('/api/checkToken')
		.then(res=>{
			console.log('res', res);
			if(res && res.status !== 200) {
				window.location = "#/login";
			}
		})
		.catch(err => {
			console.log(err);
		})
	}

	logout = e => {
		e.preventDefault();
    this.setState({loading: true});
    axios.post('/api/logout')
	  .then(res => {
	  	// console.log('res', res);
	  	if (res && res.status === 200) {
    		window.location = "#/login";
	  	}
	  })
	  .catch(err => {
	  	// console.log('err', err);
	  	alert('Error occurred while logging out!');
	  	window.location = "#/login";
  		this.setState({loading: false});
	  })
	}

	precisionRound(number, precision) {
	  var factor = Math.pow(10, precision);
	  return Math.round(number * factor) / factor;
	}

	addProduct(e) {
		e.preventDefault();
		if(!this.state.newProdName || !this.state.newProdquantity || !this.state.newProdPricePerKG) {
			return;
		}
		const items = _.cloneDeep(this.state.items);
		let newProd = {
			key: items.length + 1,
			SNo: items.length,
			name: this.state.newProdName,
			quantity: this.state.newProdquantity,
			pricePerKG: this.state.newProdPricePerKG,
			price: this.precisionRound(this.state.newProdquantity * this.state.newProdPricePerKG, 2)
		};
		items.splice(items.length - 1, 0, newProd);
		this.setState({
			items,
			newProdName: '',
			newProdquantity: null,
			newProdPricePerKG: null,
			grandTotal: this.precisionRound(this.state.grandTotal + newProd.price, 2)
		})
		this.newProdName.input.focus();
	}

	handleChange(e, val){
		const state = _.cloneDeep(this.state);
		state[val] = e.target.value;
		this.setState(state);
	}

	processOrder() {
		this.setState({loading: true});
		if(!this.state.grandTotal){
			this.setState({loading: false});
			return
		}
		const items = _.cloneDeep(this.state.items);
		items.pop();
		const order = {
			items,
			grandTotal: this.state.grandTotal,
			customerName: this.name.input.value
		}
		axios.post('/api/order', order)
		.then(res=>{
			// console.log('res', res);
			if(res && res.status === 200) {
				this.setState({
					items: [{
					  key: '1',
					  SNo: null,
					  name: null,
					  quantity: null,
					  pricePerKG: null,
					  price: null
					}],
					grandTotal: 0.00,
					loading: false
				});
				this.name.input.value = '';
				const args = {
			    message: 'Success',
			    description: 'Order has been created successfully',
			    duration: 2,
			  };
			  notification.open(args);
			}
		})
		.catch(err=>{
			Modal.warning({
		    title: 'Unable to create order',
		    content: 'Error while processing order!'
		  });
  		this.setState({loading: false});
		})
	}

	helpModal = (e) => {
    this.setState({visible: true});
  }

  handleOk = (e) => {
    this.setState({visible: false});
  }

  handleCancel = (e) => {
    this.setState({visible: false});
  }

	render() {
		const columns = [{
		  title: 'S.No',
		  dataIndex: 'SNo',
		  key: 'SNo',
		  render: (text) => text?text:''
		}, {
		  title: 'Product Name',
		  dataIndex: 'name',
		  key: 'name',
		  render: (text) => text?text:<Input value={this.state.newProdName} onChange={e => this.handleChange(e, 'newProdName')} ref={(input) => this.newProdName=input} />
		}, {
		  title: 'Quantity (in KG)',
		  dataIndex: 'quantity',
		  className: 'column-quantity',
		  key: 'quantity',
		  render: (text) => text?text:<Input type="number" value={this.state.newProdquantity} onChange={e => this.handleChange(e, 'newProdquantity')}/>
		}, {
		  title: 'Price (per KG)',
		  dataIndex: 'pricePerKG',
		  className: 'column-pricePerKG',
		  key: 'pricePerKG',
		  render: (text) => text?text:<Input type="number" value={this.state.newProdPricePerKG} onChange={e => this.handleChange(e, 'newProdPricePerKG')} onPressEnter={e => this.addProduct(e)}/>
		}, {
		  title: 'Total Price',
		  dataIndex: 'price',
		  className: 'column-price',
		  key: 'price',
		  render: (text) => text?text:''
		}];
		return (
			<Layout>
	      <Header className="header">
	      	<h3 className="logoText">Order Manager</h3>
	      	<div>
	      		<Button type="primary" className="help-btn" onClick={this.helpModal} ghost>Help</Button>
	      		<Button type="primary" onClick={this.logout} ghost>Log Out</Button>
	      	</div>
	      </Header>
	      <Content className="content">
	      	<div className="contentHead">
	      		<Input className="customerName" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} ref={(input) => this.name=input} placeholder="Customer Name" />
	      		{!this.state.loading?
		          <Button type="primary" onClick={() => this.processOrder()}>Process Order</Button>
	        		:
		          <Button type="primary" loading>
			        </Button>
	        	}
      		</div>
	      	<BillingTable
	      		handleChange={this.handleChange}
	      		addProduct={this.addProduct}
	      		data={this.state.items}
	      		columns={columns}
	      		grandTotal={this.state.grandTotal}
	      	/>
	      	<Modal
	          title="Instructions"
	          visible={this.state.visible}
	          onOk={this.handleOk}
	          onCancel={this.handleCancel}
	        >
	          <p>1. Enter the Product name, quantity and price per kilogram in the appropriate fields.</p>
	          <p>2. Press the 'enter' key when on the price field to add the next product.</p>
	          <p>3. After entering all the products, click on 'Process Order', to complete the order.</p>
	        </Modal>
	      </Content>
	    </Layout>
		)
	}
}

export default Home;
