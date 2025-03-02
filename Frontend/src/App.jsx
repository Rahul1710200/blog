import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import PostList from "./component/PostList";
import PostDetails from "./component/PostDetails";
import CreatePost from "./component/CreatePost";
import EditPost from "./component/EditPost";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList/>} />
        <Route path="/posts/:id" element={<PostDetails/>} />
        <Route path="/create" element={<CreatePost/>} />
        <Route path="/edit/:id" element={<EditPost/>} />
        
      </Routes>
    </Router>
  );
}
export default App;
