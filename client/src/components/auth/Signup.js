import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Layout, Radio } from 'antd';
import { UserOutlined, LockOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { Auth } from "aws-amplify";
import FormErrors from "../FormErrors";
import config from "../../config.json";
import * as Constants from '../../constants';
import axios from 'axios';

const { Title, Text } = Typography;
const { Header, Footer } = Layout;

export default class Signup extends Component {
    params={}
    state = {
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false
        }
    }
    userCreation(){
        try{
            if(this.state.type=='shopper')
            { 
               this.params = {
               user_id:username,
               user_type:this.state.type,
               item_type:"user",
               user_details:{
                   name:"",
                   email:"",
                   phonenumber:"",
                   gender:"",
                   address:"",
                   dob:""
               },
               dashboard:{
                   messages:[],
                   cancelled_visits:10,
                   total_visits:1,
                   upcoming_visits:2
               },
               history:[]
           }
       }
       
           else if(this.state.type=='store_owner'){
               this.params = {
                   user_id:username,
                   user_type:this.state.type,
                   item_type:"user",
                   user_details: {
                       name: "",
                       email: "",
                       phonenumber: "",
                       gender: "",
                       address: "",
                       dob: ""
                   },
                   store_details:{
                       name:"",
                       email:"",
                       establishedon:"",
                       address:"",
                       store_size:"",
                       zipcode:"",
                       phoneno:""
                   },
                   dashboard:{
                       messages:[],
                       cancelled_visits:10,
                       total_visits:1,
                       upcoming_visits:2
                   },
                   messages:[]

           }
       }
        }catch(error){

        }

    }
    handleSubmit = async (event, values) => {
        event.preventDefault;
        // AWS Cognito integration here
        const username = this.state.normal_login_username;
        const password = this.state.normal_login_password;
        const email = this.state.normal_login_email;
        console.log(email);
        try {
           
        console.log(this.params)
            const signUpResponse = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: email
                }
            });

            await axios.post(config.lambda_api.dev.createUser,this.params)
            .catch(function(error) {
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
            this.params={}
            this.props.history.push('/signupverification');
            console.log(signUpResponse);
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
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
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
                        <Title level={1}>{Constants.signup_title}</Title>
                    </div>
                    <div className="signin-form">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.handleSubmit}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your Username!' }]} >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email-id" onChange={this.onInputChange} />
                            </Form.Item>

                            <Form.Item label="Email" name="email" rules={[{type: 'email',message: 'The input is not valid E-mail!'},{ required: true, message: 'Please input your email!' }]} >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} id="email" placeholder="Email-id" onChange={this.onInputChange} />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" onChange={this.onInputChange} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                            </Form.Item>

                            <Form.Item label="Confirm-Password" name="conf-password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="retype Password" onChange={this.onInputChange} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                            </Form.Item>
                            <p className="form-text">{Constants.signup_pwdrule}</p>
                            <Form.Item name="radio-button" label="Type:  ">
                                <Radio.Group onChange={this.onInputChange}>
                                    <Radio.Button id="type" value="shopper">{Constants.presignin_button[0]}</Radio.Button>
                                    <Radio.Button id="type" value="store_owner">{Constants.presignin_button[1]}</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>
                                I have read the <a onClick={this.props.handleAggrement}>agreement</a>
                                </Checkbox>

                            </Form.Item>

                            <FormErrors formerrors={this.state.errors} />
                            <Form.Item >
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    {Constants.signup_button}
            </Button>
            <FormErrors formerrors={this.state.errors} />
                            </Form.Item>
                            <Form.Item>
                                <p>{Constants.signup_terms}</p>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <Footer className="footer">{Constants.footer_text}</Footer>
            </Layout>
        );
    }
};

