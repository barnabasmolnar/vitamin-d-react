import React, { Component } from "react";
import Form from "./Form";
import axios from "axios";
import ErrorScreen from "./ErrorScreen";
import LoadingScreen from "./LoadingScreen";
import CityInfo from "./CityInfo";
import DaysList from "./DaysList";

// Request state constants
const LOADING = "LOADING";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            in: false,
            reqState: null,
            city: "",
            cityInfo: {},
            daysList: [],
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ city: event.target.value });
    }

    handleSubmit(event) {
        console.log(`${this.state.city} was submitted.`);
        this.setState({ reqState: LOADING });
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
                        cityInfo: {},
                        daysList: [],
                        error: response.data.error
                    });
                } else {
                    this.setState({
                        reqState: SUCCESS,
                        cityInfo: response.data.city_data,
                        daysList: response.data.days,
                        error: {},
                        in: true
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
                        cityInfo: {}
                    });
                } else {
                    this.setState({
                        reqState: ERROR,
                        error: error.response.statusText,
                        cityInfo: {}
                    });
                }
            });
        event.preventDefault();
    }

    renderResults() {
        switch (this.state.reqState) {
            case SUCCESS:
                return (
                    <React.Fragment>
                        <CityInfo cityInfo={this.state.cityInfo} />
                        <DaysList days={this.state.daysList} />
                    </React.Fragment>
                );
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
            <div className="container">
                <Form
                    searchTerm={this.state.city}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                />

                {this.renderResults()}
            </div>
        );
    }
}

export default App;
