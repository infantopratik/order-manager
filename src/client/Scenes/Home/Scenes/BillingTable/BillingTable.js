import React, { Component } from 'react';
import { Table, Input } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import './BillingTable.scss';

class BillingTable extends Component {

	constructor(props) {
		super(props);
	}

	footerText() {
		// console.log('this', this);
		return 'Grand Total: Rs. ' + this;
	}

	render() {
		return (
			<Table
		    columns={this.props.columns}
		    dataSource={this.props.data}
		    pagination={false}
		    bordered
		    size="middle"
		    footer={this.footerText.bind(this.props.grandTotal)}
		  />
		)
	}
}

export default BillingTable;
