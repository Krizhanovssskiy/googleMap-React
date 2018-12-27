import React from 'react';
import { Polyline } from "react-google-maps";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,

} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props => {

	return (
		<GoogleMap
			onClick={(e)=>{props.addCoord(e)}}
			defaultZoom={15}
			defaultCenter={{lat: props.coords[0].lat, lng: props.coords[0].lng }}
			center={{ lat: props.coords[0].lat, lng: props.coords[0].lng }}
		>

			<Marker
				position={{ lat: props.coords[0].lat, lng: props.coords[0].lng }}
			/>

			<Polyline path={props.route}/>

		</GoogleMap>
		)
	}

));

export default MapWithAMarker;