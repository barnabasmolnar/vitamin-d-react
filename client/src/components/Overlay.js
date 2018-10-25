import React from "react";

const Overlay = props => (
    <div className="bg-backdrop fixed pin flex justify-center items-center px-4">
        {props.children}
    </div>
);

export default Overlay;
