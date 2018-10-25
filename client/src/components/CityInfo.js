import React from "react";
import MapMarker from "../svg/MapMarker";

const CityInfo = props => (
    <div className="bg-white flex items-center rounded mb-4 p-4">
        <MapMarker />

        <div>
            {props.cityInfo.name} in {props.cityInfo.country}
        </div>
    </div>
);

export default CityInfo;
