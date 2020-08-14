import React from 'react';
import { Link } from "react-router-dom";
import { Typography } from 'antd';
import { Button, Layout } from 'antd';
import * as Constants from '../../constants';

const { Title } = Typography;
const { Header, Footer } = Layout;

export default class Presignin extends React.Component {

    render() {
        return (
            <Layout className="signin-layout">
                <Header className="sigin-header">
                    <div className="signin-logo"><img src="/images/logo1.png" className="signin-logo" alt={Constants.image_failed} /></div>
                    <div className="sigin-title"><img src="/images/logo2.png" className="sigin-title" alt={Constants.image_failed} /></div>
                </Header>
                <div className="sign-container">
                    <div className="signin-form">
                        <Title level={1} className="txt-center">{Constants.presignin_title}</Title>
                        <br />
                        <div className="presignin-button-layout">
                            <Link to="/signin/shopper"> <Button className="presignin-button" type="primary"  >{Constants.presignin_button[0]}</Button></Link>
                            <Link to="/signin/storeowner"> <Button className="presignin-button" type="danger" >{Constants.presignin_button[1]}</Button></Link>
                        </div>
                    </div>
                </div>

                <Footer className="footer">{Constants.footer_text}</Footer>
            </Layout>
        );
    }
};

