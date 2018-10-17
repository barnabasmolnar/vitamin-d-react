import React from "react";

const LoadingScreen = () => (
    <div className="bg-white my-4 p-4 rounded">
        <div className="flex items-center">
            <svg
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 fill-current mr-4 spin"
            >
                <g id="Page-1" stroke="none" strokeWidth="1" fillRule="evenodd">
                    <g id="icon-shape">
                        <path
                            d="M14.6568542,15.6568542 C13.209139,17.1045695 11.209139,18 9,18 C4.581722,18 1,14.418278 1,10 C1,5.581722 4.581722,2 9,2 C13.418278,2 17,5.581722 17,10 L15,10 C15,6.6862915 12.3137085,4 9,4 C5.6862915,4 3,6.6862915 3,10 C3,13.3137085 5.6862915,16 9,16 C10.6568542,16 12.1568542,15.3284271 13.2426407,14.2426407 L14.6568542,15.6568542 L14.6568542,15.6568542 Z M12,10 L20,10 L16,14 L12,10 L12,10 Z"
                            id="Combined-Shape"
                        />
                    </g>
                </g>
            </svg>
            <div>Loading data</div>
        </div>
    </div>
);

export default LoadingScreen;
