import React, {Component} from 'react';
import { Input, Button } from 'semantic-ui-react';

import ListRout from '../container/ListRout'

class Form extends Component {

	render() {
		return (
			<div className='routes-block'>
				<div>
					<Input
						onChange={(e)=>{this.props.addChange(e)}}
						className='input'
						placeholder='name route...'
						value={this.props.text}
					/>
					<Button
						onClick={this.props.addRoute}
						color='green'
					>
						addRout
					</Button>
				</div>

				<ul>
					<ListRout
						allRoutes={this.props.allRoutes}
						showRoute={(i)=>{this.props.showRoute(i)}}
						hideRoute={(i)=>{this.props.hideRoute(i)}}
						removeRoute={(i)=>{this.props.removeRoute(i)}}
					/>
				</ul>
			</div>
		);
	}
}

export default Form;