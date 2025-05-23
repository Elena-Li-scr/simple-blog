import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/articles" />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
