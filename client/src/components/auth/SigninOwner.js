import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Layout } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { Auth } from "aws-amplify";
import FormErrors from "../FormErrors";
import axios from 'axios';
import config from "../../config.json";
import * as Constants from '../../constants'
const { Title } = Typography;
const { Header, Footer } = Layout;

export default class SigninOwner extends Component {
    state = {
        store_owner: false,
        userDetails: [],
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

    fetchUserDetails(user){
        try{
            var params = {
                user_id: this.state.normal_login_username,
                user_type: "store_owner"
            }
            const headers = {
                'Authorization': user.signInUserSession.idToken.jwtToken
            }
            //fetch user details upon cognito authentication 
            await axios.post(config.lambda_api.dev.fetchUser, params, { crossdomain: true, "headers": headers })
                .then(response => {
                    if (response.data.sk === 'store_owner') {
                        this.setState({ store_owner: true, userDetails: response.data });
                    }
                })
                .catch(function (error) {
                    if (!error.response) {
                        // network error
                    } else {
                        alert("Registered user is shopper.Login using Shopper login")
                    }
                });
        }catch (error) {
            let err = null;
            !error.message ? err = { "message": error } : err = error;
            this.setState({
                errors: {
                    cognito: err
                }
            });
        }
    }

    handleSubmit = async event => {
        event.preventDefault;
        try {
            // AWS Cognito authentication
            const user = await Auth.signIn(this.state.normal_login_username, this.state.normal_login_password);
            this.fetchUserDetails(user)
            if (this.state.store_owner) {
                this.props.history.push({ pathname: '/storeowner', state: { userDetails: this.state.userDetails } });
                this.props.auth.setAuthStatus(true);
                this.props.auth.setUser(user);
            }
            else {
                this.props.history.push({ pathname: '/presignin' });
            }
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
    };


    render() {
        return (
            <Layout className="signin-layout">
                <Header className="sigin-header">
                    <div className="signin-logo"><img src="/images/logo1.png" className="signin-logo" alt={Constants.image_failed} /></div>
                    <div className="sigin-title"><img src="/images/logo2.png" className="sigin-title" alt={Constants.image_failed} /></div>
                </Header>
                <div className="sign-container">
                    <div className="form-title">
                        <Title level={3}>{Constants.signinowner_title}</Title>
                    </div>

                    <div className="signin-form">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={this.handleSubmit}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" id="username" onChange={this.onInputChange} />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    id="password" onChange={this.onInputChange}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Form.Item>

                            <div className="form--forgot">

                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>{Constants.remember_me}</Checkbox>
                                </Form.Item>
                                <Form.Item>
                                    <Link to="/forgotpassword" className="login-form-forgot">{Constants.forgot_password}</Link>
                                </Form.Item>
                            </div>
                            <FormErrors formerrors={this.state.errors} />
                            <Form.Item>
                                <Button type="danger" htmlType="submit" className="login-form-button">{Constants.login_button}</Button>
                            Or  <Link to="/signup">{Constants.register}</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <Footer className="footer">{Constants.footer_text}</Footer>
            </Layout>
        );
    }
};


