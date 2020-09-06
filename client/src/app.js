import React, { Component } from 'react';
import { store, persistor } from './components/redux/redux';
import AppRouter from './appRouter/AppRouter';
import './styles/style.scss';
import 'normalize.css/normalize.css';
import { Auth } from 'aws-amplify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null
    };
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.setAuthStatus(true);
        const user = await Auth.currentAuthenticatedUser();
        this.setUser(user);
      }
    } catch (error) {
      if (error !== 'No current user') {
        alert(error);
      }
    }
    this.setState({ isAuthenticating: false });
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      setAuthStatus: this.setAuthStatus,
      user: this.state.user,
      setUser: this.setUser
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {!this.state.isAuthenticating &&
            <div className="App">
              <AppRouter rootauth={authProps} {...this.props} ></AppRouter>
            </div>}
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

