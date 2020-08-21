import React, { Component } from 'react';
import FormErrors from "../utility/FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from 'aws-amplify';
import { Form, Input, Button, Layout } from 'antd';
import { Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { fgtpwd_title, fgtpwd_text, fgtpwd_button, footer_text,image_failed } from '../../constants'
const { Header, Footer } = Layout;
const { Title } = Typography;

class ForgotPassword extends Component {
    state = {
        email: "",
        errors: {
            cognito: null,
            blankfield: false
        }
    }

    clearErrorState = () => {
        this.setState({
            errors: {
                cognito: null,
                blankfield: false
            }
        });
    }

    forgotPasswordHandler = async event => {
        event.preventDefault;
        // AWS Cognito integration here
        try {
            await Auth.forgotPassword(this.state.email);
            this.props.history.push('/forgotpasswordverification');
        } catch (error) {
            console.log(error);
        }
    }

    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
    }

    render() {
        return (
            <Layout className="signin-layout">
                <Header className="sigin-header">
                    <div className="signin-logo"><img src="/images/logo1.png" className="signin-logo" alt={image_failed} /></div>
                    <div className="sigin-title"><img src="/images/logo2.png" className="sigin-title" alt={image_failed} /></div>
                </Header>
                <div className="form-title">
                    <Title level={1}>{fgtpwd_title}</Title>
                    <p>{fgtpwd_text}</p>

                </div>

                <div className="sign-container">
                    <div className="signin-form">
                        <Form
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.forgotPasswordHandler}
                        >
                            <Form.Item
                                name="email"
                                validateStatus="error"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} id="email" placeholder="email" onChange={this.onInputChange} />
                            </Form.Item>
                            <FormErrors formerrors={this.state.errors} />
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">{fgtpwd_button}</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <Footer className="footer">{footer_text}</Footer>
            </Layout>
        );
    }
}

export default ForgotPassword;