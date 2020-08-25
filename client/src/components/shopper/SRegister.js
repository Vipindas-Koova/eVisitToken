import React, { Component } from 'react';
import { Input, Button, Layout} from 'antd';
import { } from 'react-router-dom';
import { Typography } from 'antd';
import { Row, Col} from 'antd';
import axios from 'axios';
import config from "../../config.json";
import { Select } from 'antd';
import { shopper_register_title, shopper_register_headings, shopper_bookbutton } from '../../constants';
import moment from 'moment';
import { connect } from 'react-redux';
const { Title, Text } = Typography;
const { Search } = Input;

const mapStateToProps = (state) => { 
    return {
    data: state.data,
    loading:state.loading,
    error:state.error
    }
};
class SRegister extends Component {
    state = {
        stores: [],//store drop down
        storeDetails: {},//complete store details
        slots: [],//date slots
        zipcode: "",
        tokens: "",
        messages:[],
        timeslots:[],
        selectedStore: false,
        selectedStoreName: "",
        selectedStoreAddress: "",
        selectedDate: "",
        selectedTimeSlot:""
    }
    componentDidMount() {
        this.setState({
            messages: this.props.data.history.messages
        })
    }
    getTimeStops(start, end,shopping_time) {
        var startTime = moment(start, 'HH:mm');
        var endTime = moment(end, 'HH:mm');
    
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        var timeStops = [];

        while (startTime <= endTime) {
            timeStops.push(new moment(startTime).format('HH:mm'));
            startTime.add(moment.duration(shopping_time).asMinutes(), 'minutes');
        }
        var timeslots = []

        for (var i = 0; i < timeStops.length - 1; i++)
            timeslots.push(timeStops[i] + " to " + timeStops[i + 1])

        return timeslots;
    }

    handleZipcode = async event => {
        event.preventDefault;
        this.setState({ stores: [], selectedStore: false, zipcode: event })
        var params = {
            zipcode: event
        }
        try {
            console.log(params);
            const headers = {
                'Authorization': this.props.session.idToken.jwtToken
            }
            await axios.post(config.lambda_api.dev.getStores, params, { crossdomain: true, "headers": headers })
                .then(response => {
                    this.setState({
                        storeDetails: response.data,
                        stores: response.data.map((function (item) {
                            return item.sk;
                        }))
                    })
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
            alert(error);
        }

    }
    handleselectedStore = (e) => {
        var st = this.state.storeDetails.filter(item => item.sk === e);
        var data = st[0];
        Object.filter = (obj, predicate) => Object.keys(obj)
            .filter(key => predicate(obj[key]))
            .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

        var available_dates = Object.keys(Object.filter(data.slots, slot => slot.tokens > 0))
        this.setState({
            selectedStore: true,
            selectedStoreName: data.sk,
            selectedStoreAddress: data.store_details.address.street + "," + data.store_details.address.province,
            slots: available_dates
        });
    }
    handleDateSelection = (e) => {
        var st = this.state.storeDetails.filter(item => item.sk === this.state.selectedStoreName);
        var data = st[0];
        var slot = data.slots[e] // particular day details
        var timeslots = this.getTimeStops(slot.start_time,slot.end_time,slot.shopping_time) //fetch timeslots
        this.setState({ selectedDate: e, tokens: slot.tokens,timeslots:timeslots })
    }
    handleSlotSelection=(e)=>{
        console.log(e)
        this.setState({ selectedTimeSlot: e})
    }

    handleBook = async (e) => {
        event.preventDefault;
        const headers = {
            'Authorization': this.props.session.idToken.jwtToken
        }
        try{
            this.checkSlot(headers)
        }
        catch(error)
        {
            alert(error);
        }
    }
    async checkSlot(headers){
        var checkparams = {
            zipcode: this.state.zipcode,
            store_name: this.state.selectedStoreName,
        }
        try{
            await axios.post(config.lambda_api.dev.checkSlot, checkparams, { crossdomain: true, "headers": headers })
            .then(resp=>{
                if(resp.status==200){
                    this.bookSlot(headers,resp)
                }
                else{
                    alert(resp.data)
                }
            })
        }catch (error) {
            alert(error);
        }

    }
    async bookSlot(headers,response){
        var params = {
            zipcode: this.state.zipcode,
            store_name: this.state.selectedStoreName,
            slot_date: this.state.selectedDate.toString()
        }
        try{
            if (response.data.slots[this.state.selectedDate].tokens > 0) {
                axios.patch(config.lambda_api.dev.bookSlot, params, { crossdomain: true, "headers": headers })
                    .then(resp => {
                        if(resp.status==200){
                            var message = resp.data.Message+"  Token:  "+resp.data.Token
                            alert(message)
                            var booking_msg = "Store Name:"+this.state.selectedStoreName+
                            "  Booking Date:"+this.state.selectedDate+
                            "  Booking Slot:"+this.state.selectedTimeSlot+
                            "  Token Number:"+resp.data.Token
                            this.updateUserHistory(headers,booking_msg);
                            this.createUserBookingItem(headers,this.state.selectedDate,this.state.selectedTimeSlot,resp.data.Token)
                        }
                        else{
                            alert(resp.data)
                        }
                    });
            }
            else{
                alert("No slots available.Please choose another date")
            }
        }
        catch(error)
        {
            alert(error)
        }
        
    }
    async updateUserHistory(headers,message){
        console.log("updating user history")
        this.setState(prevState => ({
            messages: [...prevState.messages, message]
        }));
        try {
            console.log(this.state.messages)
            var params = {
                pk: this.props.data.pk,
                sk: this.props.data.sk,
                item: {
                    key: "history",
                    messages: this.state.messages
                }
            }
            await axios.patch(config.lambda_api.dev.updateRecord, params, { crossdomain: true, "headers": headers })
            .then(response => {
                if (response.status == 200)
                    alert("You can view your bookings in history")
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
        alert(error)
    }
    }
    async createUserBookingItem(headers,date,time,token)
    {
        try {
            var dateTime = "#"+date+"#"+time
            var params = {
                user_id: this.props.data.pk,
                dateTime: dateTime,
                token_id:token.toString()
            }
            await axios.post(config.lambda_api.dev.userBooking, params, { crossdomain: true, "headers": headers })
            .then(response => {
                if (response.status == 200)
                    console.log(resp.data)
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
        alert(error)
    }
    }
    
    render() {
        return (
            <div>
                <div className="header">
                    <Title level={3} >{shopper_register_title}</Title>
                    <Search className="search_box" placeholder="input zipcode" onSearch={this.handleZipcode} enterButton size="default" />
                </div>
                <Row>
                </Row>
                <br />
                <Row>
                    <Select placeholder="Select store" onChange={this.handleselectedStore}>
                        {this.state.stores.length > 0
                            && this.state.stores.map(name => (<Select.Option key={name}>{name}</Select.Option>))}
                    </Select>
                </Row>
                <br />
                <Row >
                    <Col span={4}>
                        <Text strong>{shopper_register_headings[0]}</Text>
                    </Col>
                    <Col span={6}>
                        <Text strong>{shopper_register_headings[1]}</Text>
                    </Col>
                    <Col span={4}>
                        <Text strong>{shopper_register_headings[2]}</Text>
                    </Col>
                    <Col span={4}>
                        <Text strong>{shopper_register_headings[3]}</Text>
                    </Col>
                    <Col span={4}>
                        <Text strong>{shopper_register_headings[4]}</Text>
                    </Col>
                    <Col span={2}>
                        <Text strong>{shopper_register_headings[5]}</Text>
                    </Col>
                </Row>
                <br />
                {this.state.selectedStore &&
                    <Row >
                        <Col span={4}>
                            <div>{this.state.selectedStoreName}</div>
                        </Col>
                        <Col span={6}>
                            <div>{this.state.selectedStoreAddress}</div>
                        </Col>

                        <Col span={4}>
                            <div >
                                <Select placeholder="Select TimeSlot" onChange={this.handleDateSelection}>
                                    {this.state.slots.length > 0
                                        &&
                                        this.state.slots.map(name => (<Select.Option key={name}>{name}</Select.Option>))}
                                </Select>
                            </div>
                        </Col>
                        <Col span={4}>
                            <div >
                                <Select placeholder="Select TimeSlot" onChange={this.handleSlotSelection}>
                                    {this.state.timeslots.length > 0
                                        &&
                                        this.state.timeslots.map(name => (<Select.Option key={name}>{name}</Select.Option>))}
                                </Select>
                            </div>
                        </Col>
                        <Col span={4}>
                            <div >
                                <Text strong>{this.state.tokens}</Text>
                            </div>
                        </Col>
                        <Col span={2}>
                            <div >
                                <Button type="primary" onClick={this.handleBook}>{shopper_bookbutton}</Button>
                            </div>
                        </Col>
                    </Row>
                }
            </div>
        );
    }
};

export default connect(mapStateToProps)(SRegister);
