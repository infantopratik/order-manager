import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Card, Modal } from 'antd';
import './Login.scss';
import axios from 'axios';
const FormItem = Form.Item;

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	componentDidMount() {
		axios.get('/api/checkToken')
		.then(res=>{
			console.log('res', res);
			if(res && res.status === 200) {
				window.location = "#/";
			}
		})
		.catch(err => {
			console.log(err);
		})
	}

	login = (e) => {
    e.preventDefault();
    this.setState({loading: true});
    axios.post('/api/login', {
	    email: this.email.input.value,
	    password: this.password.input.value
	  })
	  .then(res => {
	  	// console.log('res', res);
	  	if (res && res.status === 200) {
    		window.location = "#/";
	  	}
	  })
	  .catch(err => {
	  	Modal.warning({
		    title: 'Unable to login',
		    content: 'Invalid Credentials'
		  });
  		this.setState({loading: false});
	  })
  }

	render() {
		return (
			<Card title="Login" bordered={false} style={{ width: 300 }} className="login-div">
				<Form onSubmit={this.login} className="login-form">
	        <FormItem>
	            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} ref={(input) => this.email=input} placeholder="Email" />
	        </FormItem>
	        <FormItem>
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} ref={(input) => this.password=input} type="password" placeholder="Password" />
	        </FormItem>
	        <FormItem>
	        	{!this.state.loading?
		          <Button type="primary" htmlType="submit" className="login-form-button">
		            Log in
		          </Button>
	        		:
		          <Button type="primary" loading className="login-form-button">
			        </Button>
	        	}
	          <div className="register-link">Don't have an account? <a href="#/register">Register now!</a></div>
	        </FormItem>
	      </Form>
      </Card>
		)
	}
}

export default Login;
