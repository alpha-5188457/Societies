/* React Hooks are simple JavaScript functions that we can 
use to isolate the reusable part from a functional component. */
import React, { useState } from 'react'; // useState used in functional components instead of this.state in classes
import { useDispatch } from 'react-redux'; //React Redux is the official React binding for Redux. It allows React components to read data from a Redux Store, and dispatch Actions to the Store to update data. Redux helps apps to scale by providing a sensible way to manage state through a unidirectional data flow model.
import { useHistory, useLocation } from 'react-router-dom'; //React Router DOM is an npm package that enables you to implement dynamic routing in a web app. It allows you to display pages and allow users to navigate them. It is a fully-featured client and server-side routing library for React.

//styles
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';

//user imports
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination/Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

function useQuery() {
  // The URLSearchParams interface defines utility methods to work with the query string of a URL.
  //The useLocation hook returns the location object that represents the current URL. 
  return new URLSearchParams(useLocation().search);
}

//function components used instead of classes
const Home = () => {
    const [currentId, setCurrentId] = useState(null); //useState declares a “state variable”. Normally, variables “disappear” when the function exits but state variables are preserved by React. The only argument to the useState() Hook is the initial state. useState returns a pair of values: the current state and a function that updates it.
    const classes = useStyles();
    const dispatch = useDispatch(); // This hook returns a reference to the dispatch function from the Redux store. You may use it to dispatch actions as needed.
    const query = useQuery();
    const history = useHistory(); // The useHistory hook gives you access to the history instance that you may use to navigate.
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState(''); //setting state variables using useState hook.
    const [tags, setTags] = useState([]);
    
    /* checks whether the entered text has any related posts using getPostsBySearch function from actions */
    const searchPost = () => {
      if(search.trim() || tags) {
        dispatch(getPostsBySearch({search, tags: tags.join(',') }));
        history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }else {
        history.push('/');
      }
    };
    
    /* handleKeyPress function checks for clicking for a key and check whether the keyCode is 13 or not. keyCode 13 is the code for enter. If it is then it calls searchPost() */
    const handleKeyPress = (e) => {
      if(e.keyCode === 13) {
        searchPost();
      }
    };
    
    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (
        <Grow in> {/* The Grow transition is used by the Tooltip and Popover components. It uses react-transition-group internally. */}
          <Container maxWidth="xl"> {/* The container centers your content horizontally. It's the most basic layout element. */}
            <Grid className={classes.gridContainer} container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={6} md={9}> {/* The Material Design responsive layout grid adapts to screen size and orientation, ensuring consistency across layouts. */}
                <Posts setCurrentId={setCurrentId} /> {/* posts accepts a prop which here is being initialized using state variable */}
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherent"> {/* The App bar displays information and actions relating to the current screen. It can transform into a contextual action bar or be used as a navbar. */}
                  <TextField /* Text fields let users enter and edit text. */
                    name="search"
                    variant="outlined"
                    label="Search Events"
                    onKeyPress={handleKeyPress}
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <ChipInput
                    style={{margin: '10px 0'}}
                    value={tags}
                    onAdd={handleAdd}
                    onDelete={handleDelete}
                    label="Search Tags"
                    variant="outlined"
                  />
                  <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                </AppBar>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                  {/* if no searchQuery and no tags then render pagination. */}
                  {(!searchQuery && !tags.length) && (
                    <Paper className={classes.pagination} elevation={6} >
                      <Pagination page={page}/>
                    </Paper>
                  )}
              </Grid>
            </Grid>
          </Container>
        </Grow> 
    )
}

export default Home;