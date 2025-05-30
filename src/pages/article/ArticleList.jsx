import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ArticlePreview from "./ArticlePreview";
import Pagination from "../../components/Pagination";
import useLoadingAndError from "../../hooks/useLoadingAndError";
import Loader from "../../components/Loader";
import {
  getPageArticle,
  likeArticle,
  unLikeArticle,
} from "../../services/articleService";
import "./ArticleList.css";

const API_URL = "https://realworld.habsidev.com/api/articles";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const { loading, error, setLoading, setError } = useLoadingAndError();
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const limit = 5;
  const offset = (currentPage - 1) * limit;
  const totalPages = Math.ceil(articlesCount / limit);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPageArticle({
      API_URL,
      limit,
      offset,
      setArticles,
      setArticlesCount,
      setError,
      setLoading,
      user,
    });
  }, [currentPage, offset, setError, setLoading, user]);

  const handleLike = async (slug, favorited) => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    try {
      let response;
      if (favorited) {
        response = await unLikeArticle({ API_URL, slug, user });
      } else {
        response = await likeArticle({ API_URL, slug, user });
      }

      setArticles((prevArticles) =>
        prevArticles.map((a) => (a.slug === slug ? response.data.article : a))
      );
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <ul className="list">
        {articles.map((article) => (
          <li key={article.slug} className="article">
            <ArticlePreview
              title={article.title}
              description={article.description}
              image={article.author.image}
              date={article.createdAt}
              userName={article.author.username}
              likeCount={article.favoritesCount}
              like={article.favorited}
              tags={article.tagList.filter(
                (tag) => typeof tag === "string" && tag.trim() !== ""
              )}
              onLike={() => handleLike(article.slug, article.favorited)}
              onClick={() => navigate(`/articles/${article.slug}`)}
            />
          </li>
        ))}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        OnPage={setCurrentPage}
      />
    </div>
  );
}
