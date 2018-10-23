import React, { Component } from "react";
import Form from "./Form";
import axios from "axios";
import ErrorScreen from "./ErrorScreen";
import LoadingScreen from "./LoadingScreen";
import CityInfo from "./CityInfo";
import DaysList from "./DaysList";
import Overlay from "./Overlay";

import { Transition, TransitionGroup } from "react-transition-group";

// Request state constants
const LOADING = "LOADING";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

// Animation styles
const cityAnimStyles = {
    entering: "animated fadeInDown",
    entered: "animated fadeInDown",
    exiting: "animated fadeOutUp",
    exited: "animated fadeOutUp"
};
const daysAnimStyles = {
    entering: "animated fadeInLeft",
    entered: "animated fadeInLeft",
    exiting: "animated fadeOutRight",
    exited: "animated fadeOutRight"
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reqState: null,
            city: "",
            infoArr: [],
            error: null,
            listId: 0,
            isErrorScreenOpen: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ city: event.target.value });
    }

    handleSubmit(event) {
        this.setState({ infoArr: [], reqState: LOADING });
        axios
            .get("/api/city", {
                params: {
                    name: this.state.city
                }
            })
            .then(response => {
                console.log(response.data);

                if (response.data.error) {
                    this.setState({
                        reqState: ERROR,
                        error: response.data.error,
                        isErrorScreenOpen: true
                    });
                } else {
                    this.setState({
                        reqState: SUCCESS,
                        infoArr: [
                            {
                                cityInfo: response.data.city_data,
                                daysList: response.data.days,
                                id: this.state.listId
                            }
                        ],
                        error: {},
                        listId: this.state.listId + 1
                    });
                }
            })
            .catch(error => {
                console.error(error);
                console.log(error.response);
                if (error.response.data.msg) {
                    this.setState({
                        reqState: ERROR,
                        error: error.response.data.msg,
                        isErrorScreenOpen: true
                    });
                } else {
                    this.setState({
                        reqState: ERROR,
                        error: error.response.statusText,
                        isErrorScreenOpen: true
                    });
                }
            });
        event.preventDefault();
    }

    renderResults() {
        switch (this.state.reqState) {
            case ERROR:
                if (this.state.isErrorScreenOpen) {
                    return (
                        <Overlay>
                            <div className="bg-white rounded relative w-full max-w-md">
                                <button
                                    className="absolute pin-t pin-r p-2 text-red"
                                    onClick={() =>
                                        this.setState({
                                            isErrorScreenOpen: false
                                        })
                                    }
                                >
                                    <svg
                                        viewBox="0 0 20 20"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 fill-current"
                                    >
                                        <g
                                            id="Page-1"
                                            stroke="none"
                                            strokeWidth="1"
                                            fillRule="evenodd"
                                        >
                                            <g id="icon-shape">
                                                <path
                                                    d="M11.4142136,10 L14.2426407,7.17157288 L12.8284271,5.75735931 L10,8.58578644 L7.17157288,5.75735931 L5.75735931,7.17157288 L8.58578644,10 L5.75735931,12.8284271 L7.17157288,14.2426407 L10,11.4142136 L12.8284271,14.2426407 L14.2426407,12.8284271 L11.4142136,10 L11.4142136,10 Z M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 L2.92893219,17.0710678 Z M4.34314575,15.6568542 C7.46734008,18.7810486 12.5326599,18.7810486 15.6568542,15.6568542 C18.7810486,12.5326599 18.7810486,7.46734008 15.6568542,4.34314575 C12.5326599,1.21895142 7.46734008,1.21895142 4.34314575,4.34314575 C1.21895142,7.46734008 1.21895142,12.5326599 4.34314575,15.6568542 L4.34314575,15.6568542 Z"
                                                    id="Combined-Shape-Copy"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                                <ErrorScreen error={this.state.error} />
                            </div>
                        </Overlay>
                    );
                } else {
                    return null;
                }
            case LOADING:
                return (
                    <Overlay>
                        <div className="bg-white rounded p-8">
                            <LoadingScreen />
                        </div>
                    </Overlay>
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="container relative">
                <Form
                    searchTerm={this.state.city}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />

                {this.renderResults()}

                <TransitionGroup component={null}>
                    {this.state.infoArr.map(item => (
                        <Transition timeout={1000} key={item.id}>
                            {state => (
                                <div className="absolute pin-x px-4">
                                    <div className={cityAnimStyles[state]}>
                                        <CityInfo cityInfo={item.cityInfo} />
                                    </div>
                                    <div className={daysAnimStyles[state]}>
                                        <DaysList days={item.daysList} />
                                    </div>
                                </div>
                            )}
                        </Transition>
                    ))}
                </TransitionGroup>
            </div>
        );
    }
}

export default App;
