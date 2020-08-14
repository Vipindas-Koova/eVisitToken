import React from 'react';
import { Button, Layout } from 'antd';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import {signupverif_title,signupverif_text,footer_text,image_failed} from '../../constants'
const { Title } = Typography;
const { Header, Footer } = Layout;

const SignupVerification = () => {
    const email = "amarn19@gmail.com";
    return (

        <Layout className="signin-layout">
            <Header className="sigin-header">
            <div className="signin-logo"><img src="/images/logo1.png" className="signin-logo" alt={image_failed} /></div>
                    <div className="sigin-title"><img src="/images/logo2.png" className="sigin-title" alt={image_failed} /></div>
            </Header>
            <div className="sign-container">
                <div className="form-title">
                    <Title level={1}>{signupverif_title}</Title>
                    <p>{signupverif_text[0]}</p>
                    <p>{signupverif_text[1]}</p>
                </div>
                <div className="signin-form">
                    <Button type="primary" htmlType="submit" className="login-form-button">{signupverif_text[2]}</Button>
                </div>
                <div className="form-title">
                    <Link to="/presignin">{signupverif_text[3]}</Link>

                </div>

            </div>
            <Footer className="footer">{footer_text}</Footer>
        </Layout>
    );

};

export default SignupVerification;
