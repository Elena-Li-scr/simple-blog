import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
