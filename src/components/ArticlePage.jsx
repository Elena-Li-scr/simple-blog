import { useNavigate, useParams } from "react-router-dom";
import ArticlePreview from "./ArticlePreview";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "../style/ArticlePage.css";

const API_URL = "https://realworld.habsidev.com/api/articles";

export default function ArticlePage() {
  const { slug } = useParams();
  const { user } = useContext(UserContext);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

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

  const deleteHandler = async () => {
    try {
      await axios.delete(
        `https://realworld.habsidev.com/api/articles/${slug}`,
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      );
      alert("The article was successfully deleted");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Could not delete the article.");
    }
  };

  if (loading) return <p>Loading article...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!article) return null;

  const isAuthor = user && user.username === article.author.username;

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
      {isAuthor && (
        <div className="edit-del-btn">
          <button className="del-btn" onClick={() => setModal(true)}>
            Delete
          </button>
          <button
            className="edit-btn"
            onClick={() => navigate(`/articles/${slug}/edit`)}
          >
            Edit
          </button>
        </div>
      )}

      {modal && (
        <div className="modal-wrapper">
          <img src="/assets/arrow.png" alt="arrow" className="arrow" />
          <div className="modal-container">
            <div className="modal-text">
              <img src="/assets/exclamation.png" alt="exclamation" />
              <p>Are you sure to delete this article?</p>
            </div>
            <div className="modal-btn">
              <button onClick={() => setModal(false)}>No</button>
              <button onClick={deleteHandler}>Yes</button>
            </div>
          </div>
        </div>
      )}
      <div className="page-text">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  );
}
