import React, { Component } from 'react';
import { Typography } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import config from "../../config.json";
import { shopper_visithistory_title } from '../../constants'
const { Title } = Typography;

const mapStateToProps = (state) => { 
    return {
    data: state.data,
    loading:state.loading,
    error:state.error
    }
};

class SVisitHistory extends Component {
    state = {
        history: []
    }
    Toast(props) {
        var name = "Toast Toast--" + props.category;
        return (
            <div className={name}>
                <main className="Toast__message">
                    <header className="Toast__message-category">{props.type}</header>
                    <p className="Toast__message-text">{props.message}</p>
                </main>
            </div>
        );
    }
    async fetchBookings() {
        var params = {
            user_id: this.props.data.pk,
            user_type: "shopper"
        }
        const headers = {
            'Authorization': this.props.session.idToken.jwtToken
        }
        try {
            await axios.post(config.lambda_api.dev.fetchUser, params, { crossdomain: true, "headers": headers })
                .then(response => {
                    this.setState({
                        history: response.data.history.messages
                    })

                })
                .catch(function (error) {
                    if (!error.response) {
                        // network error
                    } else {
                        alert("Error fetching bookings")

                    }
                });
        } catch(error){
            alert("Unexpected error.Try again")
        }
    }
    componentDidMount() {
        console.log("History loaded")
        this.fetchBookings();
    }
    render() {
        return (
            <div>
                <div className="header">
                    <Title level={3} >{shopper_visithistory_title}</Title>
                </div>
                <div>
                    {this.state.history.map((msg, i) => (
                        <this.Toast key={i} message={msg} />
                    ))}
                </div>
            </div>
        );
    }
};

export default connect(mapStateToProps)(SVisitHistory);

