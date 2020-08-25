import React, { Component } from 'react';
import { store,persistor } from './components/redux/redux';
import AppRouter from './appRouter/AppRouter';
import './styles/style.scss';
import 'normalize.css/normalize.css';
import { Auth } from 'aws-amplify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

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
    } catch (error) {
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

