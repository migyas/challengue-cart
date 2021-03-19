import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Catalog from '../pages/Catalog';
import Cart from '../pages/Cart';

const Routes = () => ( 
    <Switch>
        <Route path="/" exact component={Catalog} />
        <Route path="/cart" component={Cart} />
        <Redirect to={"/"}/>
    </Switch>
);

export default Routes;