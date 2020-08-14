import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import * as Constants from '../constants';
const { Title } = Typography;
const { Header, Footer } = Layout;

const PageNotFound = () => {
    return (
        <Layout className="signin-layout">
            <Header className="sigin-header">
                <div className="signin-logo"><img src="/images/logo1.png" className="signin-logo" alt={Constants.image_failed} /></div>
                <div className="sigin-title"><img src="/images/logo2.png" className="sigin-title" alt={Constants.image_failed} /></div>
            </Header>
            <div className="sign-container">
                <div className="form-title">
                    <Title level={4}>{Constants.notfound_title}</Title>
                    <Title level={4}>{Constants.notfound_text} <Link to="/">{Constants.notfound_home_text}</Link></Title>
                </div>
            </div>
            <Footer className="footer">{Constants.footer_text}</Footer>
        </Layout>
    );

};

export default PageNotFound;
