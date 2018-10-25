import React from "react";
import HoursList from "./HoursList";
import Calendar from "../svg/Calendar";

const DaysList = props => (
    <div className="bg-white rounded my-4 p-4">
        {props.days.length > 0 ? (
            <ul className="list-reset">
                {props.days.map((dayArr, idx) => (
                    <li className="border-b my-6 pb-2" key={idx}>
                        <div className="flex items-center pb-2">
                            <Calendar />
                            <div className="text-2xl">{dayArr[0].day}</div>
                        </div>
                        <div>
                            <HoursList hours={dayArr} />
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            "Unfortunately no sunny periods can be expected for up to 5 days according to our forecast data. :("
        )}
    </div>
);

export default DaysList;
