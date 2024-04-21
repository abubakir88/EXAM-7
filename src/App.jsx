import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/home";
import Like from "./components/Like/like";
import Playlist from "./components/Playlist/playlist";
import NotFound from "./components/NotFound/notFound";
import Right from "./components/fixed/right";
import Left from "./components/fixed/left";

const App = () => {
  return (
    <Router>
      <Left />
      <Right />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/like" element={<Like />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
