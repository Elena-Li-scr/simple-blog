import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ArticleForm from "./ArticleForm";
import { postArticle } from "../../services/articleService";

export default function NewArticle() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    const request = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.filter((tag) => tag.trim() !== ""),
      },
    };

    try {
      const response = await postArticle({ request, user });
      console.log(request);

      const slug = response.data.article.slug;
      navigate(`/articles/${slug}`);
    } catch (error) {
      console.error("Failed to create article:", error);
      alert("Error: could not create article.");
    }
  };
  return <ArticleForm onSubmit={handleCreate} />;
}
