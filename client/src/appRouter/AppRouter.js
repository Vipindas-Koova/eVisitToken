import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ForgotPassword from '../components/auth/Forgotpassword';
import Homepage from '../components/Homepage';
import PageNotFound from '../components/PageNotFound';
import SignupVerification from '../components/auth/SignupVerification';
import ForgotPasswordVerification from '../components/auth/ForgotPasswordVerification';
import ChangePassword from '../components/auth/ChangePassword';
import ChangePasswordConfirm from '../components/auth/ChangePasswordConfirmation';
import StoreOwner from '../components/store_owner/StoreOwner';
import Presignin from '../components/auth/presignin';
import Shopper from '../components/shopper/Shopper';
import SigninShopper from '../components/auth/SigninShopper';
import SigninOwner from '../components/auth/SigninOwner';
import Signup from '../components/auth/Signup';

const AppRouter = (prop) => (
    <Router >
    <div>
        <Switch>

             <Route exact path="/presignin" render={(props) => <Presignin {... props} auth={prop.rootauth} />}/>
            <Route exact path="/" render={(props) => <Homepage {...props} auth={props.rootauth} />}/>
            
            <Route exact path="/storeowner" render={(props) => <StoreOwner {...props} auth={prop.rootauth} />}/>
            <Route exact path="/shopper" render={(props) => <Shopper {...props} auth={prop.rootauth}/>}/>
            <Route exact path="/signin/shopper" render={(props) => <SigninShopper {...props} auth={prop.rootauth}/>}/>
            <Route exact path="/signin/storeowner" render={(props) => <SigninOwner {...props} auth={prop.rootauth}/>}/>
            <Route exact path="/signup" render={(props) => <Signup {...props} auth={prop.rootauth}/>}/>

            <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={prop.rootauth} />} />
            <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={prop.rootauth} />} />
            <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={prop.rootauth} />} />
            <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={prop.rootauth} />} />
            <Route exact path="/signupverification" render={(props) => <SignupVerification {...props} auth={prop.rootauth} />} />        
            <Route component={PageNotFound} />
        </Switch>
        </div>
    </Router>

);

export default AppRouter;