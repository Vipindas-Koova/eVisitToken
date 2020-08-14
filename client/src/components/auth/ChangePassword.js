import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from 'aws-amplify';
import { Form, Input, Button, Layout } from 'antd';
import { Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import * as Constants from '../../constants';

const { Title } = Typography;
const { Header, Footer } = Layout;

class ChangePassword extends Component {
    state = {
        oldpassword: "",
        newpassword: "",
        confirmpassword: "",
        errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false
        }
    }

    changePassword() {
        try {
            await Auth.changePassword(user, this.state.normal_login_oldpassword, this.state.normal_login_newpassword)
                .then(resp => {
                    if (resp.status == 200)
                        this.props.history.push("/changepasswordconfirmation");
                }).catch(function (error) {
                    if (!error.response) {
                        // network error
                    } else {
                        alert("Error changing password")
                    }
                });
        } catch (error) {
            let err = null;
            !error.message ? err = { "message": error } : err = error;
            this.setState({
                errors: { cognito: err }
            });
            console.log(err);
        }
    }
    handleSubmit = async event => {
        event.preventDefault;
        // AWS Cognito integration here
        try {
            //authenicate user
            const user = await Auth.currentAuthenticatedUser();
            //changepassword
            this.changePassword();
        } catch (error) {
            let err = null;
            !error.message ? err = { "message": error } : err = error;
            this.setState({
                errors: { cognito: err }
            });
            console.log(err);
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
                    <div className="signin-logo"><img src="/images/logo1.png" className="signin-logo" alt={Constants.image_failed} /></div>
                    <div className="sigin-title"><img src="/images/logo2.png" className="sigin-title" alt={Constants.image_failed} /></div>
                </Header>
                <div className="sign-container">
                    <div className="form-title">
                        <Title level={1}>{Constants.changepwd_title}</Title>
                    </div>
                    <div className="signin-form">
                        <Form
                            name="changepassword"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.handleSubmit}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Form.Item label="Oldpassword" name="oldpassword" rules={[{ required: true, message: 'Please input your current password!' }]} >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} id="oldpassword" placeholder="oldpassword" onChange={this.onInputChange} />
                            </Form.Item>

                            <Form.Item label="Newpassword" name="newpassword" rules={[{ required: true, message: 'Please input new password!' }]} >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} id="newpassword" placeholder="newpassword-id" onChange={this.onInputChange} />
                            </Form.Item>

                            <Form.Item label="ConfirmPassword" name="confirmpassword" rules={[{ required: true, message: 'Retype new password!' }]}>
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} id="confirmpassword" type="confirmpassword" placeholder="Password" onChange={this.onInputChange} />
                            </Form.Item>

                            <FormErrors formerrors={this.state.errors} />

                            <Form.Item >
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    {Constants.changepwd_button}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <Footer className="footer">{Constants.footer_text}</Footer>
            </Layout>

        );
    }
}

export default ChangePassword;