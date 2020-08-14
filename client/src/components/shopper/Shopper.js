import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Auth } from 'aws-amplify';
import Sdashboard from './SDashboard';
import Sprofile from './SProfile';
import Sregister from './SRegister';
import SvisitHistory from './SVisitHistory';
import {
    DesktopOutlined,
    UserOutlined,
    EditOutlined,
    HistoryOutlined,
} from '@ant-design/icons';
import {shopper_menu,footer_text,image_failed,logout_button} from '../../constants'

const { Header, Content, Footer, Sider } = Layout;
var user = {}
export default class Shopper extends Component {

    state = {
        dashboard: true,
        profile: false,
        register: false,
        visitHistory: false,
        isLoaded: false,
        collapsed: false,
        session: {
            accessToken: "",
            idToken: "",
            refreshToken: ""
        }
    };

    async componentDidMount() {
        console.log("shopper onload");
        user = this.props.location.state.userDetails
        console.log("userdetails:" + JSON.stringify(user));
        await Auth.currentSession().then(res => {
            this.setState({
                session: {
                    accessToken: res.getAccessToken(),
                    idToken: res.getIdToken()
                }
            })
        })
        console.log(this.state.session)
    }

    handleLogOut = async event => {
        console.log(this.props);
        event.preventDefault;
        try {
            Auth.signOut();
            this.props.auth.setAuthStatus(false);
            this.props.auth.setUser(null);
        } catch (error) {
            console.log(error.message);
        }
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    onHandleContent = event => {
        switch (parseInt(event.key)) {
            case 0: this.setState({ dashboard: true, profile: false, register: false, visitHistory: false }); break;
            case 1: this.setState({ dashboard: false, profile: true, register: false, visitHistory: false }); break;
            case 2: this.setState({ dashboard: false, profile: false, register: true, visitHistory: false }); break;
            case 3: this.setState({ dashboard: false, profile: false, register: false, visitHistory: true }); break;
        }
        console.log(this.state);

    }
    render() {

        var { isLoaded } = this.state;
        // if(!isLoaded){
        //     return <div>Loading...</div>;
        // }
        return (
            <Layout className="user_layout">

                <Header className="header">
                    <div className="logo-title">
                        <img src="/images/etoken-logo.png" className="logo-image" alt={image_failed} />
                    </div>
                    {this.props.auth.isAuthenticated && (
                        <Link to="/"><Button className="Signin-button" onClick={this.handleLogOut} type="primary" icon={<LogoutOutlined />}>{logout_button}</Button></Link>

                    )}

                </Header>

                <Layout>
                    <Sider width={200} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
                            <Menu.Item key="0" icon={<DesktopOutlined />} onClick={this.onHandleContent}>{shopper_menu[0]}</Menu.Item>
                            <Menu.Item key="1" icon={<UserOutlined />} onClick={this.onHandleContent}>{shopper_menu[1]}</Menu.Item>
                            <Menu.Item key="2" icon={< EditOutlined />} onClick={this.onHandleContent}>{shopper_menu[2]}</Menu.Item>
                            <Menu.Item key="3" icon={<HistoryOutlined />} onClick={this.onHandleContent}>{shopper_menu[3]}</Menu.Item>
                        </Menu>
                    </Sider>

                    <Layout >
                        <Content id="content-page" className="user_content_margin">
                            <div>
                                {this.state.dashboard && <Sdashboard dashboard={this.props.location.state.userDetails.dashboard} session={this.state.session}/>}
                                {this.state.profile && <Sprofile profile={this.props.location.state.userDetails} session={this.state.session} />}
                                {this.state.register && <Sregister session={this.state.session} profile={this.props.location.state.userDetails} />}
                                {this.state.visitHistory && <SvisitHistory profile={this.props.location.state.userDetails} session={this.state.session}/>}
                            </div>

                        </Content>
                        <Footer className="footer_user">{footer_text}</Footer>

                    </Layout>

                </Layout>

            </Layout>


        );
    }
}


