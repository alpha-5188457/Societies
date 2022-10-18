import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//user imports
import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
    //getting user profile details from localstorage
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
          <Container maxWidth="xl">
            <Navbar/>
            {/*The switch component looks through all of its child routes and 
            it displays the first one whose path matches the current URL. */}
            <Switch>
              {/* The Route component's most basic responsibility is to render some 
              UI when its path matches the current URL. */}
              <Route path="/" exact component={() => <Redirect to="/posts" />} />
              <Route path="/posts" exact component={Home} />
              <Route path="/posts/search" exact component={Home} />
              <Route path="/posts/:id" component={PostDetails} />
              <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts"/> )} />
            </Switch>
          </Container>
        </BrowserRouter>
    )
};

export default App;