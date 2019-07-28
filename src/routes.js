import React from 'react';
import { isAuthenticated } from './auth';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import login from './pages/login/index';
import main from './pages/main/index';
import signin from './pages/accountcreation/index';
import forgotpass from './pages/accountrecuperation/index';
import resetpass from './pages/newpassword/index';


function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route 
            {...rest}
            render={props => 
                isAuthenticated() ? (
                <Component {...props} />
                ) : (
                    <Redirect to={ { pathname: "/", state: { from: props.location } }} />
                )
            }    
        />
    )
};

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={login}/>
                <Route path="/signin" component={signin}/>
                <Route path="/forgotpassword" component={forgotpass}/>
                <Route path="/resetpassword" component={resetpass}/>
                <PrivateRoute path="/main" component={main}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;