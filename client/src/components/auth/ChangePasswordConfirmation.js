import React from 'react';
import { Layout } from 'antd';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { chgpwd_title, chgpwd_text, chgpwd_button, footer_text } from '../../constants'

const { Title } = Typography;
const { Header, Footer } = Layout;

const ChangePasswordConfirmation = () => {
    const email = "amarn19@gmail.com";
    return (

        <Layout className="signin-layout">
            <Header className="sigin-header">
                <div className="signin-logo"><img src="/images/logo1.png" className="signin-logo" alt={Constants.image_failed} /></div>
                <div className="sigin-title"><img src="/images/logo2.png" className="sigin-title" alt={Constants.image_failed} /></div>
            </Header>
            <div className="sign-container">
                <div className="form-title">
                    <Title level={1}>{chgpwd_title}</Title>
                    <p>{chgpwd_text}</p>
                </div>
                <div className="form-title">
                    <Link to="/presignin">{chgpwd_button}</Link>
                </div>

            </div>
            <Footer className="footer">{footer_text}</Footer>
        </Layout>
    );

};

export default ChangePasswordConfirmation;
