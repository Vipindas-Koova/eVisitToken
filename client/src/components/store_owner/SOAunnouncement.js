import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Card } from 'antd';
import { post_button } from '../../constants'
import { updateRecord,fetchUser } from '../redux/auth/authAction';
const { TextArea } = Input;

const mapStateToProps = (state) => {
    return {
        data: state.data,
        loading: state.loading,
        error: state.error
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchUserDetails: (params, headers) => dispatch(fetchUser(params, headers)),
        updateRecord: (params, headers) => dispatch(updateRecord(params, headers))
    }

}
class SOAunnouncement extends Component {
    state = {
        messages: []
    }
    Toast(props) {
        var name = "Toast Toast--success";
        return (
            <div className={name}>
                <main className="Toast__message">
                    <p className="Toast__message-text">{props.message}</p>
                </main>
            </div>
        );
    }
    onFinish = async (e) => {
        console.log("Message: " + e.msg)
        this.setState(prevState => ({
            messages: [...prevState.messages, e.msg]
        }));
        try {
            var params = {
                pk: this.props.data.pk,
                sk: this.props.data.sk,
                item: {
                    key: "messages",
                    messages: this.state.messages
                }
            }
            var fetchparams = {
                user_id: this.props.data.pk,
                user_type: "store_owner"
            }
            const headers = {
                'Authorization': this.props.session.idToken.jwtToken
            }
            this.props.updateRecord(params,headers);
        } catch (error) {
            alert(error)
        }

    }
    componentDidMount() {
        console.log("History loaded")
        console.log(this.props.data.messages.messages)
        this.setState({
            messages: this.props.data.messages.messages
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
                        <this.Toast key={i} message={msg} />
                    ))}
                </Card>
            </div>
        );
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(SOAunnouncement);

