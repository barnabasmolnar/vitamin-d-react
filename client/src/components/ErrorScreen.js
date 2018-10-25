import React from "react";
import Error from "../svg/Error";

const ErrorScreen = props => (
    <div className="flex items-center rounded my-6 p-4">
        <Error />
        <div>
            {props.error}
        </div>
    </div>
);

export default ErrorScreen;
