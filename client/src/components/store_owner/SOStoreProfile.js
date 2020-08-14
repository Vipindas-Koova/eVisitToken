import React, { Component } from 'react';
import { Form, Input, Button, Tooltip, Select, prefixSelector, DatePicker, Card } from 'antd';
import { Typography } from 'antd';
import { Row, Col, Divider } from 'antd';
import axios from 'axios';
import config from "../../config.json";
import Avatar from "../utility/Avatar";
import {
    QuestionCircleOutlined
} from '@ant-design/icons';
import {
    profile_createbutton,
    store_profile_title,
    store_profile_text,
    citynames,
    profile_savebutton
} from '../../constants'
const { Title } = Typography;
export default class SOStoreProfile extends Component {
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
    componentDidMount() {
        console.log("onload")
        console.log(this.props.profile.store_details.zipcode)
        if (this.props.profile.store_details.zipcode) {
            console.log("onload")
            this.setState({
                profileCreated: true
            });
        }
    }
    onFinish = async (fieldsValues) => {
        const values = {
            ...fieldsValues,
            'establishedon': fieldsValues['establishedon'].format('YYYY-MM-DD')
        }
        console.log(this.props.profile)
        console.log('Success:', values);
        const headers = {
            'Authorization': this.props.session.idToken.jwtToken
        }
        var params = {
            pk: values.store_zipcode,
            sk: values.store_name,
            slots: {},
            store_details: {
                email: values.store_email,
                establishedon: values.establishedon,
                address: values.store_address,
                size: values.store_size,
                phoneno: values.store_phonenumber,
                zipcode: values.store_zipcode
            }
        }
        var updateStoreParams = {
            pk: values.store_zipcode,
            sk: values.store_name,
            item: {
                key: "store_details",
                email: values.store_email,
                address: values.store_address,
                establishedon: values.establishedon,
                size: values.store_size,
                phoneno: values.store_phonenumber,
                zipcode: values.store_zipcode,
                name: values.store_name
            }
        }
        console.log(params)
        if (!this.state.profileCreated) {
            console.log("calling api")
            await axios.post(config.lambda_api.dev.createStoreProfile, params, { crossdomain: true, "headers": headers })
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
        }
        else {
            console.log("calling update api")
            await axios.patch(config.lambda_api.dev.updateRecord, updateStoreParams, { crossdomain: true, "headers": headers })
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
        }
        //calling createstore api
        try {

            var updateparams = {
                pk: this.props.profile.pk,
                sk: this.props.profile.sk,
                item: {
                    key: "store_details",
                    email: values.store_email,
                    address: values.store_address,
                    establishedon: values.establishedon,
                    size: values.store_size,
                    phoneno: values.store_phonenumber,
                    zipcode: values.store_zipcode,
                    name: values.store_name
                }
            }
            console.log(updateparams)

            //update store details in user profile
            await axios.patch(config.lambda_api.dev.updateRecord, updateparams, { crossdomain: true, "headers": headers })
                .then(response => {
                    if (response.status == 200)
                        alert("Store Profile updated")
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
        if (!this.state.profileCreated && this.props.profile.store_details.zipcode == "") {
            return (
                <Card title={store_profile_text[0]} className="user_profile_card" bordered={true}>
                    <Button type="primary" onClick={this.handleCreate}>{profile_createbutton}</Button>
                </Card>

            );
        }
        else {
            return (
                <div>
                    <div className="header">
                        <Title level={3} >{store_profile_title}</Title>
                    </div>
                    <Row >

                        <Col span={18} xs={{ span: 24, order: 2 }} sm={{ span: 16, order: 2 }} lg={{ span: 18, order: 1 }}>
                            <div >
                                <div className="user_profile_pane">

                                    <Form
                                        labelCol={{ span: 10 }}
                                        wrapperCol={{ span: 14 }}
                                        layout="horizontal"
                                        name="store_owner"
                                        scrollToFirstError
                                        size='small'
                                        initialValues={{ remember: true }}
                                        onFinish={this.onFinish}
                                        onFinishFailed={this.onFinishFailed}
                                    >
                                        <Form.Item
                                            name="store_email"
                                            label="Store E-mail"
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
                                            <Input placeholder={this.props.profile.store_details.email}/>
                                        </Form.Item>

                                        <Form.Item
                                            name="store_name"
                                            label={
                                                <span>
                                                    Store Name&nbsp;
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
                                            <Input placeholder={this.props.profile.store_details.name}/>
                                        </Form.Item>

                                        <Form.Item name="establishedon" label="Established on">
                                            <DatePicker format="YYYY-MM-DD" placeholder={this.props.profile.store_details.establishedon}/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Store Address:">
                                            <Input.Group compact>
                                                <Form.Item
                                                    name={['store_address', 'province']}
                                                    noStyle
                                                    rules={[{ required: true, message: 'Province is required' }]}
                                                >
                                                    <Select placeholder="Select province">
                                                        {citynames.map(name => (<Select.Option key={name}>{name}</Select.Option>))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item
                                                    name={['store_address', 'street']}
                                                    noStyle
                                                    rules={[{ required: true, message: 'Street is required' }]}
                                                >
                                                    <Input placeholder="Input street" />
                                                </Form.Item>
                                            </Input.Group>
                                        </Form.Item>
                                        <Form.Item
                                            name="store_size"
                                            label="Store Size"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input store size!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder={this.props.profile.store_details.size}/>
                                        </Form.Item>
                                        <Form.Item
                                            name="store_zipcode"
                                            label="Zipcode"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input zipcode!',
                                                },
                                            ]}
                                        >
                                            <Input placeholder={this.props.profile.store_details.zipcode}/>
                                        </Form.Item>
                                        <Form.Item
                                            name="store_phonenumber"
                                            label="Phone Number"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your phone number!',
                                                },
                                            ]}
                                        >
                                            <Input addonBefore={prefixSelector} placeholder={this.props.profile.store_details.phoneno}/>
                                        </Form.Item>

                                        <Form.Item {...this.tailLayout}>
                                            <Button type="primary" htmlType="submit">{profile_savebutton}</Button>
                                        </Form.Item>
                                    </Form>
                                </div>

                            </div>
                        </Col>
                        <Col span={6} xs={{ span: 24, order: 1 }} sm={{ span: 8, order: 1 }} lg={{ span: 6, order: 2 }} >
                            <div className="user_profile_pane">

                                <Title level={4} >{store_profile_text[1]}</Title>

                                <Avatar profile={this.state.user} />
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
};


