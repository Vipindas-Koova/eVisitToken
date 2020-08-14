import React, { Component } from 'react';
import { Form, Input, Button, Card, Layout } from 'antd';
import axios from 'axios';
import config from "../../config.json";
import { post_button } from '../../constants'

const { TextArea } = Input;

function Toast(props) {
    var name = "Toast Toast--success";
    return (
        <div className={name}>
            <main className="Toast__message">
                <p className="Toast__message-text">{props.message}</p>
            </main>
        </div>
    );
}
export default class SOAunnouncement extends Component {
    state = {
        messages: []
    }
    onFinish = async (e) => {
        console.log("Message: " + e.msg)
        this.setState(prevState => ({
            messages: [...prevState.messages, e.msg]
        }));
        try {
            var params = {
                pk: this.props.user.pk,
                sk: this.props.user.sk,
                item: {
                    key: "messages",
                    messages: this.state.messages
                }
            }
            console.log(params)
            const headers = {
                'Authorization': this.props.session.idToken.jwtToken
            }
            await axios.patch(config.lambda_api.dev.updateRecord, params, { crossdomain: true, "headers": headers })
                .then(response => {
                    if (response.status == 200)
                        alert("Aunnoucement posted")
                })
                .catch(function (error) {
                    if (!error.response) {
                        // network error
                    } else {
                        // http status code
                        const code = error.response.status
                        // response data
                        const response = error.response.data
                        console.log(response);
                        alert(response);
                    }
                });
        } catch (error) {
            alert(error)
        }

    }
    componentDidMount() {
        console.log("History loaded")
        console.log(this.props.user.messages.messages)
        this.setState({
            messages: this.props.user.messages.messages
        })
    }

    render() {
        return (
            <div>
                <Card title="Post Updates" bordered={true}>
                    <Form onFinish={this.onFinish} initialValues={{ remember: true }}>
                        <Form.Item name="msg" rules={[{ required: true, message: 'Please input your message!' }]}>
                            <TextArea name="msg" placeholder="Enter your message" autoSize />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">{post_button}</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <br />
                <Card title="Aunnoucements" bordered={true}>
                    {this.state.messages.map((msg, i) => (
                        <Toast key={i} message={msg} />
                    ))}
                </Card>
            </div>
        );
    }
};


