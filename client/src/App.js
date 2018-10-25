import React, { Component } from "react";
import axios from "axios";

import { Transition, TransitionGroup } from "react-transition-group";

import Form from "./components/Form";
import ErrorScreen from "./components/ErrorScreen";
import LoadingScreen from "./components/LoadingScreen";
import CityInfo from "./components/CityInfo";
import DaysList from "./components/DaysList";
import Overlay from "./components/Overlay";

import {
    LOADING,
    SUCCESS,
    ERROR,
    cityAnimStyles,
    daysAnimStyles
} from "./utils";

import CloseIcon from "./svg/CloseIcon"

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

    renderErrorOrLoad() {
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
                                    <CloseIcon />
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

                {this.renderErrorOrLoad()}

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
