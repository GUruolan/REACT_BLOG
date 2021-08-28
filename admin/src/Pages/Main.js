import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from './Login'
import AdminIndex from './Index'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
function Main(){
    return (
        <Router>      
            <Route path="/login/" exact component={Login} />
            <Route path="/index/" component={AdminIndex} />
            <Route path="/add/" exact component={AddArticle} />
            <Route path="/list/" exact component={ArticleList} />
        </Router>
    )
}
export default Main