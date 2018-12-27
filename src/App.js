import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';


import MapWithAMarker from './components/Map';
import geolib from "geolib";

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			route: [],
			coords: [],
			allRoutes: [],
			nameRoute: ''
		}
	}

	showCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {

					const Obj = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};

					this.setState({
						coords: this.state.coords.concat([Obj]),
					})
				}
			)
		}
	};

	componentWillMount() {
		this.showCurrentLocation();
	}

	// myLocation = () => {
	// 	this.showCurrentLocation();
	// };

	addCoord = (e) => {

		const obj = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng()
		};

		this.setState({
			route: this.state.route.concat([obj])
		});

	};

	addRoute = () => {
		let routeLength = 0,
			lengthBetweenPoints = 0,
			itemRout = {};

		itemRout.nameRout = this.state.nameRoute;

		itemRout.arrCoords = [...this.state.route];

		if (itemRout.arrCoords.length >= 2) {

			itemRout.arrCoords.map((item, index, array) => {
				if (!(array[index + 1] === undefined)) {
					lengthBetweenPoints = geolib.getDistance(
						{latitude: item.lat, longitude: item.lng},
						{latitude: array[index + 1].lat, longitude: array[index + 1].lng},
					);
					routeLength += lengthBetweenPoints;
				}
			});
			itemRout.routeLength = routeLength;
		}
		console.log("itemRout", itemRout)
		console.log('All Routs', this.state.allRoutes)
		this.setState({
			route: [],
			nameRoute: '',
			allRoutes: this.state.allRoutes.concat(itemRout)
		});
	};

	addChange = (e) => {
		this.setState({
			nameRoute: e.target.value
		})
	};

	showRoute = (i) => {
		console.log(i, 'showRoute');
		console.log(this.state.allRoutes[i].arrCoords);
		let coordsRout = this.state.allRoutes[i].arrCoords;
		this.setState({
			route: coordsRout
		})

	};

	hideRoute = (i) => {
		this.setState({
			route: []
		})
	};

	removeRoute = (i) => {
		console.log(i, 'removeRout');

		let mas = this.state.allRoutes
		console.log(mas)
		mas.splice(i,1)
		console.log(mas)
		this.setState({
			allRoutes: mas
			})
	};

  render() {
	  return (
      <div className="wraper">
		  <Form
			  text={this.state.nameRoute}
			  allRoutes={this.state.allRoutes}
			  addChange={(e)=>{this.addChange(e)}}
			  addRoute={this.addRoute}
			  showRoute={(i)=>{this.showRoute(i)}}
			  hideRoute={(i)=>{this.hideRoute(i)}}
			  removeRoute={(i)=>{this.removeRoute(i)}}
		  />
		  <MapWithAMarker
			  isMarkerShown={this.state.isMarkerShown}
			  addCoord={(e)=>this.addCoord(e)}
			  coords={this.state.coords}
			  route={this.state.route}
			  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhH0u0rDTPMLlkolIeG1LOIeV3zIZLHME&callback=initMap"
			  loadingElement={<div style={{ height: `100%` }} />}
			  containerElement={<div style={{ width: `50%`, height: `700px` }} />}
			  mapElement={<div style={{ height: `100%` }} />}
		  />
		  <p onClick={this.myLocation}>myLocation</p>
      </div>
    );
  }
}


export default App;
