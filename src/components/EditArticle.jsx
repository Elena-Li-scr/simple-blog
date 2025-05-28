import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ArticleForm from "../components/ArticleForm";
import { UserContext } from "../context/UserContext";

export default function EditArticle() {
  const { slug } = useParams();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://realworld.habsidev.com/api/articles/${slug}`
        );
        const article = response.data.article;

        setInitialValues({
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        });
      } catch (err) {
        console.error("Failed to load article", err);
        alert("Failed to load article");
        navigate("/");
      }
    };
    fetchArticle();
  }, [slug, user, navigate]);

  const handleUpdate = async (data) => {
    setIsLoading(true);
    try {
      const request = {
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tagList,
        },
      };

      const response = await axios.put(
        `https://realworld.habsidev.com/api/articles/${slug}`,
        request,
        {
          headers: {
            Authorization: `Token ${user.token}`,
          },
        }
      );
      navigate(`/articles/${response.data.article.slug}`);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update article.");
    } finally {
      setIsLoading(false);
    }
  };
  return initialValues ? (
    <ArticleForm
      onSubmit={handleUpdate}
      initialValues={initialValues}
      isLoading={isLoading}
    />
  ) : (
    <p>Loading article...</p>
  );
}
