import React, { Component } from 'react';
import { Layout } from 'antd';
import { Typography } from 'antd';
import Register from './Register';
import * as Constants from '../../constants';

const { Title } = Typography;
const { Header, Footer } = Layout;

export default class Signup extends Component {
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
                        <Register props={this.props} />
                    </div>
                </div>
                <Footer className="footer">{Constants.footer_text}</Footer>
            </Layout>
        );
    }
};

