import { useParams } from "react-router-dom";
import ArticlePreview from "./ArticlePreview";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "../style/ArticlePage.css";

const API_URL = "https://realworld.habsidev.com/api/articles";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${API_URL}/${slug}`)
      .then((res) => {
        setArticle(res.data.article);
      })
      .catch((e) => {
        console.log(e);
        setError("Failed to load article.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!article) return null;

  return (
    <div className="page-container">
      <ArticlePreview
        title={article.title}
        description={article.description}
        image={article.author.image}
        date={article.createdAt}
        userName={article.author.username}
        likeCount={article.favoritesCount}
        tags={article.tagList.filter(
          (tag) => typeof tag === "string" && tag.trim() !== ""
        )}
      />
      <div className="page-text">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
}
