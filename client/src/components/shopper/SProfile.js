import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Tooltip, Select, prefixSelector, DatePicker, Card } from 'antd';
import { Typography } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
import config from "../../config.json";
import Avatar from "../utility/Avatar";
import {QuestionCircleOutlined} from '@ant-design/icons';
import {shopper_profile_title,shopper_profile_text,profile_createbutton,profile_savebutton,citynames} from '../../constants';
const { Title } = Typography;
import { updateRecord,fetchUser } from '../redux/auth/authAction';

const mapStateToProps = (state) => { 
    return {
    data: state.data,
    loading:state.loading,
    error:state.error
    }
};
const mapDispatchToProps = dispatch => {
    return {
        fetchUserDetails: (params, headers) => dispatch(fetchUser(params, headers)),
        updateRecord: (params, headers) => dispatch(updateRecord(params, headers))
    }

}
class Sprofile extends Component {
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
    }
    onFinish = async (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'dob': fieldsValue['dob'].format('YYYY-MM-DD')
        }
        try {
            var params = {
                pk: this.props.data.pk,
                sk: this.props.data.sk,
                item: {
                    key: "user_details",
                    address: values.address,
                    dob: values.dob,
                    email: values.email,
                    gender: values.gender,
                    name: values.name,
                    phoneno: values.phoneno,
                    zipcode:values.zipcode
                }
            }
            var fetchparams = {
                user_id: this.props.data.pk,
                user_type: "shopper"
            }
            const headers = {
                'Authorization': this.props.session.idToken.jwtToken
              }
            this.props.updateRecord(params,headers);
            await this.props.fetchUserDetails(fetchparams, headers); 
            
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

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    componentDidMount(){
        this.setState({
            user:{
                pk:this.props.data.pk,
                sk:this.props.data.sk
            }
        })
    }   

    render() {
        if (!this.state.profileCreated && this.props.data.user_details.name == "") {
            return (
                <Card title={shopper_profile_text[0]} className="user_profile_card" bordered={true}>
                    <Button type="primary" onClick={this.handleCreate}>{profile_createbutton}</Button>
                </Card>

            );
        }
        if (this.state.profileCreated || this.props.data.user_details.name != "") {
            return (
                <div>
                    <div className="header">
                    <Title level={3} >{shopper_profile_title}</Title>
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
                                            <Input placeholder={this.props.data.user_details.email} />
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
                                            <Input placeholder={this.props.data.user_details.name}/>
                                        </Form.Item>

                                        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                                            <Select
                                                placeholder={this.props.data.user_details.gender}
                                                // onChange={this.onGenderChange}
                                                allowClear
                                            >
                                                <Select.Option value="male">male</Select.Option>
                                                <Select.Option value="female">female</Select.Option>
                                                <Select.Option value="other">other</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item name="dob" label="DOB">
                                            <DatePicker format="YYYY-MM-DD" placeholder={this.props.data.user_details.dob}/>
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
                                                    <Input  placeholder={this.props.data.user_details.address.street} />
                                                </Form.Item>
                                            </Input.Group>
                                        </Form.Item>

                                        <Form.Item
                                            name="phoneno"
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
                                                
                                                placeholder={this.props.data.phoneno}
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
                            <div className="user_profile_pane">

                                <Title level={4} >{shopper_profile_text[1]}</Title>

                                <Avatar profile={this.state.user}/>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}; 

export default connect(mapStateToProps,mapDispatchToProps)(Sprofile);

