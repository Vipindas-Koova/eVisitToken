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
    componentDidMount() {
        console.log("History loaded")
    }
    render() {
        return (
            <div>
                <div className="header">
                    <Title level={3} >{shopper_visithistory_title}</Title>
                </div>
                <div>
                    {this.props.data.history.messages.map((msg, i) => (
                        <this.Toast key={i} message={msg} />
                    ))}
                </div>
            </div>
        );
    }
};

export default connect(mapStateToProps)(SVisitHistory);

