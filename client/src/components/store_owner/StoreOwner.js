import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Auth } from 'aws-amplify';
import { logout } from '../redux/auth/authAction';
import {
    DesktopOutlined,
    UserOutlined,
    EditOutlined,
    HistoryOutlined,
} from '@ant-design/icons';
import SOdashboard from './SODashboard';
import SOprofile from './SOProfile';
import SOstoreprofile from './SOStoreProfile';
import SOschedule from './SOSchedule';
import SOaunnouncement from './SOAunnouncement';

import { storeowner_menu, footer_text, logout_button, image_failed, user } from '../../constants'
const { Header, Content, Footer, Sider } = Layout;

const mapStateToProps = (state) => {
    return {
        data: state.data === undefined ? user : state.data,
        loading: state.loading,
        error: state.error
    }
};
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }

};
class StoreOwner extends Component {

    state = {
        dashboard: true,
        profile: false,
        store_profile: false,
        schedule: false,
        aunnouncement: false,
        isLoaded: false,
        collapsed: false,
        session: {
            accessToken: "",
            idToken: "",
            refreshToken: ""
        }
    };

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            console.log("true")
            this.props.history.push({ pathname: '/' });
        }
        else{
            try {
                console.log("Store Owner onload");
                await Auth.currentSession().then(res => {
                    this.setState({
                        session: {
                            accessToken: res.getAccessToken(),
                            idToken: res.getIdToken()
                        }
                    })
                })
            } catch (e) {
                alert(e);
            }
    
    }
    }
    handleLogOut = async event => {
        event.preventDefault;
        try {
            Auth.signOut();
            this.props.auth.setAuthStatus(false);
            this.props.auth.setUser(null);
            this.props.logout();
        } catch (error) {
            console.log(error.message);
        }
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    onHandleContent = event => {
        switch (parseInt(event.key)) {
            case 0: this.setState({ dashboard: true, profile: false, store_profile: false, schedule: false, aunnouncement: false }); break;
            case 1: this.setState({ dashboard: false, profile: true, store_profile: false, schedule: false, aunnouncement: false }); break;
            case 2: this.setState({ dashboard: false, profile: false, store_profile: true, schedule: false, aunnouncement: false }); break;
            case 3: this.setState({ dashboard: false, profile: false, store_profile: false, schedule: true, aunnouncement: false }); break;
            case 4: this.setState({ dashboard: false, profile: false, store_profile: false, schedule: false, aunnouncement: true }); break;
        }
        console.log(this.state);

    }
    render() {
        return (
            <div>
                {this.props.isAuthenticated ?
                    <div>
                        {this.props.loading ?
                            <div>Loading...</div> :
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
                                            <Menu.Item key="0" icon={<DesktopOutlined />} onClick={this.onHandleContent}>{storeowner_menu[0]}</Menu.Item>
                                            <Menu.Item key="1" icon={<UserOutlined />} onClick={this.onHandleContent}>{storeowner_menu[1]}</Menu.Item>
                                            <Menu.Item key="2" icon={<UserOutlined />} onClick={this.onHandleContent}>{storeowner_menu[2]}</Menu.Item>
                                            <Menu.Item key="3" icon={< EditOutlined />} onClick={this.onHandleContent}>{storeowner_menu[3]}</Menu.Item>
                                            <Menu.Item key="4" icon={<HistoryOutlined />} onClick={this.onHandleContent}>{storeowner_menu[4]}</Menu.Item>
                                        </Menu>
                                    </Sider>

                                    <Layout >
                                        <Content id="content-page" className="user_content_margin">
                                            <div >
                                                {this.state.dashboard && <SOdashboard session={this.state.session} />}
                                                {this.state.profile && <SOprofile session={this.state.session} />}
                                                {this.state.store_profile && <SOstoreprofile session={this.state.session} />}
                                                {this.state.schedule && <SOschedule session={this.state.session} />}
                                                {this.state.aunnouncement && <SOaunnouncement session={this.state.session} />}
                                            </div>

                                        </Content>
                                        <Footer className="footer_user">{footer_text}</Footer>

                                    </Layout>

                                </Layout>

                            </Layout>
                        }
                    </div>

                    : () => this.props.history.push({ pathname: '/' })}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreOwner)

