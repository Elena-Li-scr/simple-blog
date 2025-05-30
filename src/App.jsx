import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ArticleList from "./pages/article/ArticleList";
import ArticlePage from "./pages/article/ArticlePage";
import Header from "./components/Header";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Profile from "./pages/auth/Profile";
import NewArticle from "./pages/article/NewArticle";
import EditArticle from "./pages/article/EditArticle";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-article" element={<NewArticle />} />
          <Route path="/articles/:slug/edit" element={<EditArticle />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
