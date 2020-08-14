import React, { Component } from 'react';
import { Form, Input, Button, Tooltip, Layout, Select, prefixSelector, DatePicker, Card } from 'antd';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
const { Title } = Typography;
const { Header, Footer } = Layout;
import { Auth } from "aws-amplify";
import { Row, Col, Divider } from 'antd';
import axios from 'axios';
import config from "../../config.json";
import Avatar from "../utility/Avatar";
import {
    QuestionCircleOutlined,
    UserOutlined,
    EditOutlined,
    HistoryOutlined,

} from '@ant-design/icons';
import {shopper_profile_title,shopper_profile_text,profile_createbutton,profile_savebutton,citynames} from '../../constants';

export default class SOProfile extends Component {
    state = {
        profileCreated: false,
        user:{
            pk:"",
            sk:""
        }
    }
    layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 4 },
    };
    tailLayout = {
        wrapperCol: { offset: 10, span: 4 },
    };
    handleCreate = () => {
        this.setState({ profileCreated: true })
        console.log(this.state.profileCreated)
    }
    onFinish = async(fieldsValue) => {
        console.log(this.props.profile, this.props.profile.user_details.name)
        const values = {
            ...fieldsValue,
            'dob': fieldsValue['dob'].format('YYYY-MM-DD')
        }
        console.log('Success:', values);
        try {
            var params = {
                pk: this.props.profile.pk,
                sk: this.props.profile.sk,
                item: {
                    key: "user_details",
                    address: values.address,
                    dob: values.dob,
                    email: values.email,
                    gender: values.gender,
                    name: values.name,
                    phonenumber: values.phonenumber
                }
            }
            console.log(params)
            console.log("calling api")
            const headers = {
                'Authorization': this.props.session.idToken.jwtToken
              }
            await axios.patch(config.lambda_api.dev.updateRecord, params,{ crossdomain : true,"headers":headers})
            .then(response=>{
                if(response.status==200)
                alert("Profile updated")
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
            let err = null;
            !error.message ? err = { "message": error } : err = error;
            this.setState({
                errors: {
                    cognito: err
                }
            });
        }
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    componentDidMount(){
        this.setState({
            user:{
                pk:this.props.profile.pk,
                sk:this.props.profile.sk
            }
        })
    }
    render() {
        if (!this.state.profileCreated && this.props.profile.name == "") {
            return (
                <Card title={shopper_profile_text[0]} className="user_profile_card" bordered={true}>
                    <Button type="primary" onClick={this.handleCreate}>{profile_createbutton}</Button>
                </Card>

            );
        }
        if (this.state.profileCreated || this.props.profile.name != "") {
            return (
                <div>
                    <div className="header">
                        <Title level={3} >{shopper_profile_title}</Title>
                        <p>{this.props.profile.name}</p>
                    </div>
                    <Row >

                        <Col span={18} xs={{ span: 24, order: 2 }} sm={{ span: 16, order: 2 }} lg={{ span: 18, order: 1 }}>
                            <div >
                                <div className="user_profile_pane">

                                    <Form
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 14 }}
                                        layout="horizontal"
                                        name="shopper"
                                        scrollToFirstError
                                        size='small'
                                        initialValues={{ remember: true }}
                                        onFinish={this.onFinish}
                                        onFinishFailed={this.onFinishFailed}
                                    >

                                        <Form.Item
                                            name="email"
                                            label="E-mail"
                                            rules={[
                                                {
                                                    type: 'email',
                                                    message: 'The input is not valid E-mail!',
                                                },
                                                {
                                                    required: true,
                                                    message: 'Please input your E-mail!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder={this.props.profile.user_details.email} />
                                        </Form.Item>

                                        <Form.Item
                                            name="name"
                                            label={
                                                <span>
                                                    Name&nbsp;
                                            <Tooltip title="Complete Name">
                                                        <QuestionCircleOutlined />
                                                    </Tooltip>
                                                </span>
                                            }
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your complete name!',
                                                    whitespace: true,
                                                },
                                            ]}
                                        >
                                            <Input placeholder={this.props.profile.user_details.name}/>
                                        </Form.Item>

                                        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                                            <Select
                                                placeholder={this.props.profile.user_details.gender}
                                                // onChange={this.onGenderChange}
                                                allowClear
                                            >
                                                <Select.Option value="male">male</Select.Option>
                                                <Select.Option value="female">female</Select.Option>
                                                <Select.Option value="other">other</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name="dob" label="DOB">
                                            <DatePicker format="YYYY-MM-DD" placeholder={this.props.profile.user_details.dob} />
                                        </Form.Item>
                                        <Form.Item label="Address">
                                            <Input.Group compact>
                                                <Form.Item
                                                    name={['address', 'province']}
                                                    noStyle
                                                    rules={[{ required: true, message: 'Province is required' }]}
                                                >
                                                    <Select placeholder="Select province">
                                                        {citynames.map(name => (<Select.Option key={name}>{name}</Select.Option>))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    name={['address', 'street']}
                                                    noStyle
                                                    rules={[{ required: true, message: 'Street is required' }]}
                                                >
                                                    <Input style={{ width: '50%' }} placeholder={this.props.profile.user_details.address.street} />
                                                </Form.Item>
                                            </Input.Group>
                                        </Form.Item>

                                        <Form.Item
                                            name="phone"
                                            label="Phone Number"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your phone number!',
                                                },
                                            ]}
                                        >
                                            <Input
                                                addonBefore={prefixSelector}
                                                style={{
                                                    width: '100%',
                                                }}
                                                placeholder={this.props.profile.user_details.phoneno}
                                            />
                                        </Form.Item>

                                        <Form.Item >
                                            <Button type="primary" htmlType="submit">{profile_savebutton}</Button>
                                        </Form.Item>

                                    </Form>
                                </div>

                            </div>
                        </Col>
                        <Col span={6} xs={{ span: 24, order: 1 }} sm={{ span: 8, order: 1 }} lg={{ span: 6, order: 2 }} >
                            <div style={{ width: '400px' }}>

                                <Title level={4} >{shopper_profile_text[1]}</Title>

                                <Avatar profile={this.state.user} />
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        }


    }
};


