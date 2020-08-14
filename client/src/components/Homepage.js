import React from 'react';
import Register from './auth/Register';
import { Link } from 'react-router-dom';
import PopUpModal from './utility/PopUpModal';
import { Typography, Button, Layout, Row, Col } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import *  as Constants from '../constants';

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

export default class Homepage extends React.Component {
  state = {
    popup: false,
    terms: Constants.terms_and_conditions
  };
  handleAggrement = () => {
    this.setState(() => ({
      popup: true
    }));
  }
  handleCloseModal = () => {
    console.log("close modal");
    this.setState(() => ({
      popup: false
    }));
  }
  render() {
    return (
      <Layout className="sigin-layout">
        <Header className="header">
          <div className="logo-title">
            <img className="logo-image" src="/images/etoken-logo.png" alt={Constants.image_failed} />
          </div>
          <div>
            <Link to="/signup"> <Button className="Signin-button" type="primary" icon={<LogoutOutlined />} >{Constants.singup}</Button></Link>
            <Link to="/presignin"> <Button className="Signin-button" type="primary" icon={<LogoutOutlined />} >{Constants.singin}</Button></Link>
          </div>
        </Header>
        <Content className="content">
          <div className="site-layout-content">
            <div className="site-layout-container">
              <div className="container-txt">
                <Title level={2}>{Constants.title}</Title>
                <Text strong>{Constants.title_text}</Text>
              </div>
              <div className="container-signup">
                <Register handleAggrement={this.handleAggrement} {...this.props} />
              </div>

            </div>
          </div>
        </Content>
        <Content>
          <div className="about">
            <div className="container">
              <div className="product-desc wht_fnt" >
                <Title level={1} className="txt-center">{Constants.why_etoken_title}</Title>
                <Row>
                  <Col span={6} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                    <ul  >
                      <li>{Constants.why_etoken_text[0]}</li>
                      <li>{Constants.why_etoken_text[1]}</li>

                    </ul>
                  </Col>
                  <Col span={6} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                    <ul  >
                      <li>{Constants.why_etoken_text[2]}</li>
                      <li>{Constants.why_etoken_text[3]}</li>
                    </ul>
                  </Col>
                  <Col span={6} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                    <ul  >
                      <li>{Constants.why_etoken_text[4]}</li>
                      <li>{Constants.why_etoken_text[5]} </li>
                    </ul>
                  </Col>
                  <Col span={6} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                    <ul >
                      <li>{Constants.why_etoken_text[6]}</li>
                      <li>{Constants.why_etoken_text[7]}</li>
                    </ul>
                  </Col>
                </Row>
                <Row>
                </Row>

              </div>
            </div>
          </div>
        </Content>
        <Content>
          <div className="usecase">
            <div className="product-desc wht_fnt" >
              <Title level={1} className="txt-center">{Constants.service_impl_title[0]}</Title>
              <Row >
                <Col span={18} xs={{ span: 24, order: 2 }} sm={{ span: 12, order: 1 }} lg={{ span: 18 }}    >
                  <Title level={4} >{Constants.service_impl_title[1]}</Title>
                  <p>{Constants.service_impl_text[0]}</p>
                  <p>{Constants.service_impl_text[1]}</p>
                </Col>
                <Col span={6} xs={{ span: 24, order: 1 }} sm={{ span: 12, order: 2 }} lg={{ span: 6 }}   >
                  <img src="/images/retail-store.png" className="services_image" alt={Constants.image_failed} />
                </Col>
              </Row>
              <div className="pad"></div>
              <Row >
                <Col span={6} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
                  <img src="/images/holy-place.jpg" className="services_image" alt={Constants.image_failed} />
                </Col>

                <Col span={18} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 18 }}  >
                  <Title level={4} >{Constants.service_impl_title[2]}</Title>
                  <p>{Constants.service_impl_text[2]}</p>
                  <p>{Constants.service_impl_text[3]}</p>
                </Col>
              </Row>
              <div className="pad"></div>
              <Row >
                <Col span={18} xs={{ span: 24, order: 2 }} sm={{ span: 12, order: 1 }} lg={{ span: 18 }}  >
                  <Title level={4} >{Constants.service_impl_title[3]}</Title>
                  <p>{Constants.service_impl_text[4]}</p>
                  <p>{Constants.service_impl_text[5]}</p>
                  <p>{Constants.service_impl_text[6]}</p>
                  <p>{Constants.service_impl_text[7]}</p>
                </Col>
                <Col span={6} xs={{ span: 24, order: 1 }} sm={{ span: 12, order: 2 }} lg={{ span: 6 }}   >
                  <img src="/images/service-center.jpg" className="services_image" alt={Constants.image_failed} />
                </Col>
              </Row>
            </div>

          </div>
        </Content>
        <Footer className="footer">{Constants.footer_text}</Footer>
        <PopUpModal popup={this.state.popup} closeModal={this.handleCloseModal} terms={this.state.terms} />
      </Layout>

      //<SignupVerification />
    );
  }
};



