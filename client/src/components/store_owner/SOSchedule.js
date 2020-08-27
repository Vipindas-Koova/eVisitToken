import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, InputNumber, DatePicker, TimePicker, Card } from 'antd';
import { Typography } from 'antd';
import { Row, Col } from 'antd';
import axios from 'axios';
import config from "../../config.json";
import moment from 'moment';
import {scheduler_title,scheduler_sub_title,allot_button} from '../../constants'
const { Title } = Typography;
const format = 'HH:mm';
const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;
import { createSlots,fetchUser } from '../redux/auth/authAction';

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
        createSlots: (params, headers) => dispatch(createSlots(params, headers))
    }

}

class SOSchedule extends Component {
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
    getDates = (startDate, stopDate) => {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }
    layout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 4 },
    };
    tailLayout = {
        wrapperCol: { offset: 10, span: 4 },
    };
    state = {
        storeDetails: {},
        disabled: true,
        timeslots: []
    }
    onFinish = async (fieldsValue) => {
        const rangeValue = fieldsValue['slot_date'];
        const values = {
            ...fieldsValue,
            'slot_date': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
            'start_time': fieldsValue['start_time'].format('HH:mm'),
            'end_time': fieldsValue['end_time'].format('HH:mm'),
            'shopping_time': fieldsValue['shopping_time'].format('HH:mm'),
        }
        var slots = []
        if (values.slot_date[0] == values.slot_date[1]) {
            slots[0] = values.slot_date[0]
            slots[1] = values.slot_date[1]
        }
        else
            slots = this.getDates(values.slot_date[0], values.slot_date[1])

        var params = {
            zipcode: this.props.data.store_details.zipcode,
            store_name: this.props.data.store_details.name,
            slot_date: slots,
            start_time: values.start_time,
            end_time: values.end_time,
            shopping_time: values.shopping_time,
            capacity: values.capacity.toString()
        }
        const headers = {
            'Authorization': this.props.session.idToken.jwtToken
        }
        var info = "Date:" + slots + " start_time:" + values.start_time + " end_time:" + values.end_time + " shopping_time:" + values.shopping_time + " capacity:" + values.capacity;

        try {
            this.props.createSlots(params,headers);
            this.setState(prevState => ({
                timeslots: [...prevState.timeslots, info]
            }));
        } catch (error) {
            let err = null;
            !error.message ? err = { "message": error } : err = error;
            this.setState({
                errors: {
                    cognito: err
                }
            });
        }
        console.log(this.state.timeslots)

    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return (
            <div>
                <div className="header">
                    <Title level={3} >{scheduler_title}</Title>
                </div>
                <Row>
                    <Title level={4} >{scheduler_sub_title[0]}</Title>
                </Row>
                <Row>
                    <Col span={12}>
                        <div className="user_profile_card">
                            <Form
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                name="schdule"
                                scrollToFirstError
                                size='small'
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed}
                            >
                                <Form.Item name="slot_date" label="Date:">
                                    <RangePicker format={dateFormat} />
                                </Form.Item>

                                <Form.Item name="start_time" label="From: ">
                                    <TimePicker format={format} />
                                </Form.Item>

                                <Form.Item name="end_time" label="To: ">
                                    <TimePicker format={format} />
                                </Form.Item>

                                <Form.Item name="shopping_time" label="Avg. Shopping Time: ">
                                    <TimePicker format='HH:mm' />
                                </Form.Item>

                                <Form.Item name="capacity" label="At Time Capacity">
                                    <InputNumber min={1} max={100} />
                                </Form.Item>

                                <Form.Item {...this.tailLayout}>
                                    <Button type="primary" htmlType="submit" >{allot_button}</Button>
                                </Form.Item>

                            </Form>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <Card title={scheduler_sub_title[1]} bordered={true}>
                                {this.state.timeslots.map((msg, i) => (
                                    <this.Toast key={i} message={msg} />
                                ))}
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(SOSchedule);

