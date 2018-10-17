import React from "react";

const HoursList = props => (
    <ul className="list-reset ml-12">
        {props.hours.map((hourObj, idx) => (
            <li className="my-4" key={idx}>
                <div className="md:flex justify-between items-center">
                    <div className="mb-4 md:mb-0 flex items-center">
                        <svg
                            viewBox="0 0 20 20"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 fill-current mr-2"
                        >
                            <g
                                id="Page-1"
                                stroke="none"
                                strokeWidth="1"
                                fillRule="evenodd"
                            >
                                <g id="icon-shape">
                                    <path
                                        d="M9,8.5 L9,4 L11,4 L11,9.58578644 L14.9497475,13.5355339 L13.5355339,14.9497475 L9,10.4142136 L9,8.5 Z M10,20 C15.5228475,20 20,15.5228475 20,10 C20,4.4771525 15.5228475,0 10,0 C4.4771525,0 0,4.4771525 0,10 C0,15.5228475 4.4771525,20 10,20 Z M10,18 C14.418278,18 18,14.418278 18,10 C18,5.581722 14.418278,2 10,2 C5.581722,2 2,5.581722 2,10 C2,14.418278 5.581722,18 10,18 Z"
                                        id="Combined-Shape"
                                    />
                                </g>
                            </g>
                        </svg>
                        <div>{hourObj.hour}</div>
                    </div>
                    <div className="mb-4 md:mb-0 flex items-center">
                        <svg
                            viewBox="0 0 20 20"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 fill-current mr-2"
                        >
                            <g
                                id="Page-1"
                                stroke="none"
                                strokeWidth="1"
                                fillRule="evenodd"
                            >
                                <g id="icon-shape">
                                    <path
                                        d="M11,11.1707057 C12.1651924,11.5825421 13,12.6937812 13,14 C13,15.6568542 11.6568542,17 10,17 C8.34314575,17 7,15.6568542 7,14 C7,12.6937812 7.83480763,11.5825421 9,11.1707057 L9,7 L11,7 L11,11.1707057 Z M12,10.5351288 C13.1956027,11.2267476 14,12.5194353 14,14 C14,16.209139 12.209139,18 10,18 C7.790861,18 6,16.209139 6,14 C6,12.5194353 6.80439726,11.2267476 8,10.5351288 L8,4.0085302 C8,2.8992496 8.88772964,2 10,2 C11.1045695,2 12,2.90195036 12,4.0085302 L12,10.5351288 Z M14,9.52778699 C15.2274987,10.6264281 16,12.2230004 16,14 C16,17.3137085 13.3137085,20 10,20 C6.6862915,20 4,17.3137085 4,14 C4,12.2230004 4.77250128,10.6264281 6,9.52778699 L6,4.00002024 C6,1.79087006 7.79535615,0 10,0 C12.209139,0 14,1.79445134 14,4.00002024 L14,9.52778699 Z"
                                        id="Combined-Shape"
                                    />
                                </g>
                            </g>
                        </svg>
                        <div>{hourObj.temp} °C</div>
                    </div>
                    <div className="mb-4 md:mb-0 flex items-center">
                        <svg
                            viewBox="0 0 20 20"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 fill-current mr-2"
                        >
                            <g
                                id="Page-1"
                                stroke="none"
                                strokeWidth="1"
                                fillRule="evenodd"
                            >
                                <g id="icon-shape">
                                    <polygon
                                        id="Combined-Shape"
                                        points="7.66666667 12 2 12 2 20 0 20 0 0 1 0 12 0 12.3333333 2 20 2 17 8 20 14 8 14 7.66666667 12"
                                    />
                                </g>
                            </g>
                        </svg>
                        <div>{hourObj.wind_speed} km/h</div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
);

export default HoursList;
