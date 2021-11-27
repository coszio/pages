import { Router } from "@reach/router";

import Posts from "./components/posts";
// import Post from "./components/post";
import NewPost from "./components/new_post";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Posts path='/' />
      {/* <Post path='/posts/:id' /> */}
      <NewPost path='/new' />
    </Router>
  );
}

export default App;
