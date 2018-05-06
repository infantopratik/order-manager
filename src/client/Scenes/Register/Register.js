import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form, Input, Button, Modal } from 'antd';
import './Register.scss';
const FormItem = Form.Item;

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	register = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    axios.post('/api/user', {
	    email: this.email.input.value,
	    password: this.password.input.value,
	    phone: this.phone.input.value,
	    name: this.email.input.value
	  })
	  .then(res => {
	  	// console.log('res', res);
	  	if (res && res.status === 200) {
			  Modal.success({
			    title: 'Registration Successful',
			    content: 'Please login to continue.',
			    onOk: ()=>{
			    	window.location = "#/login";
			    }
			  });
	  	}
	  })
	  .catch(err => {
	  	Modal.warning({
		    title: 'Unable to resiter',
		    content: 'Invalid Details. Please fill all the fields correctly.'
		  });
  		this.setState({loading: false});
	  })
  }

	render() {
		return (
			<Card title="Register" bordered={false} style={{ width: 400 }} className="register-div">
				<Form onSubmit={this.register}>
	        <FormItem label="Name">
	          <Input ref={(input) => this.name=input} type="text"/>
	        </FormItem>
	        <FormItem label="E-mail">
	          <Input ref={(input) => this.email=input} type="text"/>
	        </FormItem>
	        <FormItem label="Phone Number">
	          <Input ref={(input) => this.phone=input} type="number"/>
	        </FormItem>
	        <FormItem label="Password">
	          <Input ref={(input) => this.password=input} type="password" />
	        </FormItem>
	        <FormItem>
	          <Button type="primary" htmlType="submit" className="register-form-button">Register</Button>
	          <div className="login-link">Already have an account? <a href="#/login">Login now!</a></div>
	        </FormItem>
	      </Form>
      </Card>
		)
	}
}

export default Register;
