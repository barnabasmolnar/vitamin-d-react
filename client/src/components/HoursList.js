import React from "react";
import Clock from "../svg/Clock";
import Temperature from "../svg/Temperature";
import Wind from "../svg/Wind";

const HoursList = props => (
    <ul className="list-reset ml-12">
        {props.hours.map((hourObj, idx) => (
            <li className="my-4" key={idx}>
                <div className="md:flex justify-between items-center">
                    <div className="mb-4 md:mb-0 flex items-center">
                        <Clock />
                        <div>{hourObj.hour}</div>
                    </div>
                    <div className="mb-4 md:mb-0 flex items-center">
                        <Temperature />
                        <div>{hourObj.temp} °C</div>
                    </div>
                    <div className="mb-4 md:mb-0 flex items-center">
                        <Wind />
                        <div>{hourObj.wind_speed} km/h</div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
);

export default HoursList;
