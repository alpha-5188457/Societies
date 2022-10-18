/* The state is a built-in React object that is used to contain data or information about the component.
 A component's state can change over time; whenever it changes, the component re-renders. */
import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'; // React Router DOM is an npm package that enables you to implement dynamic routing in a web app. It allows you to display pages and allow users to navigate them. It is a fully-featured client and server-side routing library for React.

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