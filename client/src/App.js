import React, { Component } from "react";
import Form from "./Form";
import axios from "axios";
import ErrorScreen from "./ErrorScreen";
import LoadingScreen from "./LoadingScreen";
import CityInfo from "./CityInfo";
import DaysList from "./DaysList";

import { CSSTransition, TransitionGroup } from "react-transition-group";

// Request state constants
const LOADING = "LOADING";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reqState: null,
            city: "",
            infoArr: [],
            error: null,
            listId: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ city: event.target.value });
    }

    handleSubmit(event) {
        console.log(`${this.state.city} was submitted.`);
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
                        error: response.data.error
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
                        error: error.response.data.msg
                    });
                } else {
                    this.setState({
                        reqState: ERROR,
                        error: error.response.statusText
                    });
                }
            });
        event.preventDefault();
    }

    renderResults() {
        switch (this.state.reqState) {
            case ERROR:
                return <ErrorScreen error={this.state.error} />;
            case LOADING:
                return <LoadingScreen />;
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

                <TransitionGroup>
                    {this.state.infoArr.map(item => (
                        <CSSTransition
                            timeout={1000}
                            classNames={{
                                enter: "animated fadeInLeft",
                                exit: "animated fadeOutRight"
                            }}
                            key={item.id}
                        >
                            <div className="absolute pin-x px-4">
                                <CityInfo cityInfo={item.cityInfo} />
                                <DaysList days={item.daysList} />
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        );
    }
}

export default App;
