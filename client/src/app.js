import validator from 'validator';
import React,{Component} from 'react';
import {store} from './components/redux/redux';
import ReactDOM from 'react-dom';
import AppRouter from './appRouter/AppRouter';
import './styles/style.scss';
import 'normalize.css/normalize.css';
import { Auth } from 'aws-amplify';
import {Provider,connect} from 'react-redux';
class App extends Component {
  
    state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null
    }
  
    setAuthStatus = authenticated => {
      this.setState({ isAuthenticated: authenticated });
    }
  
    setUser = user => {
      this.setState({ user: user });
    }
  
    async componentDidMount() {
      try {
        const session = await Auth.currentSession();
        this.setAuthStatus(true);
        const user = await Auth.currentAuthenticatedUser();
        this.setUser(user);
      } catch(error) {
        if (error !== 'No current user') {
          console.log(error);
        }
      }
    
      this.setState({ isAuthenticating: false });
    }
  
    render() {
      const authProps = {
        isAuthenticated: this.state.isAuthenticated,
        user: this.state.user,
        setAuthStatus: this.setAuthStatus,
        setUser: this.setUser
      }
      return (
        <Provider store={store}>
        {!this.state.isAuthenticating &&
        <div className="App">
          <AppRouter rootauth={authProps} {...this.props} ></AppRouter>
        </div>}
        </Provider>
      );
    }
  }
  
  export default App;

