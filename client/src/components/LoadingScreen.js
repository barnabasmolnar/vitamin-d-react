import React from "react";
import Spinner from "../svg/Spinner";

const LoadingScreen = () => (
    <div className="bg-white my-4 p-4 rounded">
        <div className="flex items-center">
            <Spinner />
            <div>Loading data</div>
        </div>
    </div>
);

export default LoadingScreen;
