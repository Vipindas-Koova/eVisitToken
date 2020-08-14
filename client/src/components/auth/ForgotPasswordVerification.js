import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import { Auth } from 'aws-amplify';
import { Form, Input, Button, Layout } from 'antd';
import { Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as Constants from '../../constants';

const { Header, Footer } = Layout;
const { Title } = Typography;

class ForgotPasswordVerification extends Component {
    state = {
        verificationcode: "",
        email: "",
        newpassword: "",
        errors: {
            cognito: null,
            blankfield: false
        }
    };

    clearErrorState = () => {
        this.setState({
            errors: {
                cognito: null,
                blankfield: false
            }
        });
    };

    passwordVerificationHandler = async event => {
        event.preventDefault;
        // AWS Cognito integration here
        try {
            await Auth.forgotPasswordSubmit(
                this.state.normal_login_email,
                this.state.normal_login_verificationcode,
                this.state.normal_login_newpassword
            );
            this.props.history.push("/changepasswordconfirmation");
        } catch (error) {
            let err = null;
            !error.message ? err = { "message": error } : err = error;
            this.setState({
                errors: {
                    cognito: err
                }
            });
        }
    };

    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
    };

    render() {
        return (
            <Layout className="signin-layout">
                <Header className="sigin-header">
                    <div className="signin-logo"><img src="/images/logo1.png" className="signin-logo" alt={Constants.image_failed} /></div>
                    <div className="sigin-title"><img src="/images/logo2.png" className="sigin-title" alt={Constants.image_failed} /></div>
                </Header>
                <div className="form-title">
                    <Title level={1}>{Constants.fgtpwdconf_title}</Title>
                    <p>{Constants.fgtpwdconf_text}</p>
                </div>

                <div className="sign-container">
                    <div className="signin-form">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.passwordVerificationHandler}
                        >
                            <Form.Item
                                name="verificationcode"
                                validateStatus="validating"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter verification code!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} id="verificationcode" placeholder="verification code" onChange={this.onInputChange} />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                validateStatus="validating"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} id="email" placeholder="email" onChange={this.onInputChange} />
                            </Form.Item>

                            <Form.Item
                                name="newpassword"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Enter new email!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    id="password" onChange={this.onInputChange} />
                            </Form.Item>
                            <FormErrors formerrors={this.state.errors} />
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">{Constants.reset_pwd_email_button}</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <Footer className="footer">{Constants.footer_text}</Footer>
            </Layout>



        );
    }
}

export default ForgotPasswordVerification;