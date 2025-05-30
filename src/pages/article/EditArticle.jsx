import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleForm from "./ArticleForm";
import {
  getEditArticle,
  postArticle,
  deleteArticle,
} from "../../services/articleService";
import { UserContext } from "../../context/UserContext";
import useLoadingAndError from "../../hooks/useLoadingAndError";
import Loader from "../../components/Loader";

export default function EditArticle() {
  const { slug } = useParams();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const { loading, setLoading } = useLoadingAndError();

  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
      return;
    }

    const fetchArticle = async () => {
      try {
        const response = await getEditArticle({ slug });
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
    setLoading(true);
    try {
      const request = {
        article: {
          title: data.title,
          description: data.description,
          body: data.body,
          tagList: data.tagList.filter((tag) => tag.trim() !== ""),
        },
      };

      await deleteArticle({ user, slug });
      const response = await postArticle({ request, user });
      navigate(`/articles/${response.data.article.slug}`);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update article.");
    } finally {
      setLoading(false);
    }
  };
  return initialValues ? (
    <ArticleForm
      onSubmit={handleUpdate}
      initialValues={initialValues}
      isLoading={loading}
    />
  ) : (
    <Loader />
  );
}
