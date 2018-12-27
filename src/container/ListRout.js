import React, {Component} from 'react';
import { Button } from 'semantic-ui-react';


class ListRout extends Component {



	render() {
		console.log(this.props.allRoutes);

		return (

			this.props.allRoutes.map((item, i) => (
				<li
					key={i}
					className='itemListsRoute'

				>
					<div>
						<h3>
							Rout name : {item.nameRout}
						</h3>
						<p>
							distance: {item.routeLength} m.
						</p>
					</div>
					<Button.Group>
						<Button onClick={()=>{this.props.showRoute(i)}}>showRoute</Button>
						<Button.Or />
						<Button onClick={()=>{this.props.hideRoute(i)}}>hideRoute</Button>
						<Button.Or />
						<Button onClick={()=>{this.props.removeRoute(i)}}>removeRoute</Button>
					</Button.Group>

				</li>
			))

		);
	}
}

export default ListRout;
