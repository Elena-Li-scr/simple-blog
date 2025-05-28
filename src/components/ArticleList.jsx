import axios from "axios";
import { useEffect, useState, useContext } from "react";
import ArticlePreview from "./ArticlePreview";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import "../style/ArticleList.css";
import { UserContext } from "../context/UserContext";

const API_URL = "https://realworld.habsidev.com/api/articles";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    axios
      .get(`${API_URL}?limit=${limit}&offset=${offset}`)
      .then((res) => {
        setArticles(res.data.articles);
        setArticlesCount(res.data.articlesCount);
        console.log(res.data.articles);
      })
      .catch((e) => {
        console.log(e);
        setError("Failed to load articles.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, offset]);

  const handleLike = async (slug, favorited) => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    try {
      let response;
      if (favorited) {
        response = await axios.delete(`${API_URL}/${slug}/favorite`, {
          headers: { Authorization: `Token ${user.token}` },
        });
      } else {
        response = await axios.post(
          `${API_URL}/${slug}/favorite`,
          {},
          {
            headers: { Authorization: `Token ${user.token}` },
          }
        );
      }

      setArticles((prevArticles) =>
        prevArticles.map((a) => (a.slug === slug ? response.data.article : a))
      );
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  if (loading) return <p>Loading articles...</p>;
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
