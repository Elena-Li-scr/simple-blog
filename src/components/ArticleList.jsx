import axios from "axios";
import { useEffect, useState } from "react";
import ArticlePreview from "./ArticlePreview";
import { Link } from "react-router-dom";
import PaginationSwiper from "./PaginationSwiper";

const API_URL = "https://realworld.habsidev.com/api/articles";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);
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
      })
      .catch((e) => {
        console.log(e);
        setError("Failed to load articles.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, offset]);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <ul className="list">
        {articles.map((article) => (
          <li key={article.slug} className="article">
            <Link to={`/articles/${article.slug}`}>
              <ArticlePreview
                title={article.title}
                description={article.description}
                image={article.author.image}
                date={article.createdAt}
                userName={article.author.username}
              />
            </Link>
          </li>
        ))}
      </ul>
      <PaginationSwiper
        totalPages={totalPages}
        currentPage={currentPage}
        OnPage={setCurrentPage}
      />
    </div>
  );
}
