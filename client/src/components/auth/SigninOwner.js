import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox, Layout } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone,FacebookOutlined,GoogleOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import { Auth } from "aws-amplify";
import FormErrors from "../utility/FormErrors";
import * as Constants from '../../constants'
import { fetchUser } from '../redux/auth/authAction';
const { Title } = Typography;
const { Header, Footer } = Layout;

const mapStateToProps = (state) => {
    return {
        loading: state.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserDetails: (params, headers) => dispatch(fetchUser(params, headers))
    }

}
class SigninOwner extends Component {
    state = {
        errors: {
            cognito: null,
            blankfield: false
        }
    };

    async fetchUser(idToken, username) {
        try {
            var params = {
                user_id: username,
                user_type: "store_owner"
            }
            const headers = {
                'Authorization': idToken
            }
            this.props.fetchUserDetails(params, headers);
            this.props.auth.setAuthStatus(true);
            await this.routeStoreOwner("storeowner");
        } catch (error) {
            let err = null;
            !error.message ? err = { "message": error } : err = error;
            this.setState({
                errors: {
                    cognito: err
                }
            });
        }
    }
    routeStoreOwner = (type) => {
        this.props.history.push({ pathname: '/storeowner' });
    }

    handleSubmit = async event => {
        event.preventDefault;
        this.setState({
            errors: {
                cognito: ''
            }
        });

        try {
            // AWS Cognito authentication
            await Auth.signIn(event.username, event.password)
                .then(response => {
                    var idToken = response.signInUserSession.idToken.jwtToken;
                    this.fetchUser(idToken, event.username);
                })
        } catch (error) {
            let err = null;
            !error.message ? err = { "message": error } : err = error;
            this.setState({
                errors: {
                    cognito: err
                }
            });
        }
    }

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
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                type="primary" href="" className="login-form-button"
                                icon={<FacebookOutlined />}>{Constants.fb_login}</Button>
                            </Form.Item>
                            <Form.Item>

                                <Button 
                                type="success" className="login-form-button"
                                icon={<GoogleOutlined />}>{Constants.gmail_login}</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SigninOwner);


