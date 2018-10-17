import React from "react";

const Form = props => (
    <form
        className="bg-white rounded my-4 p-4"
        onSubmit={props.handleSubmit}
    >
        <div className="md:flex justify-between items-center">
            <label htmlFor="city-name" className="block mb-2 md:mb-0">
                City
            </label>
            <div className="mb-3 md:mb-0 flex-1 md:px-6">
                <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="city-name"
                    placeholder="Budapest, HU"
                    value={props.searchTerm}
                    onChange={props.handleChange}
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </div>
        </div>
    </form>
);

export default Form;
