import { format } from "date-fns";
import "../style/ArticlePreview.css";
export default function ArticlePreview({
  title,
  description,
  image,
  date,
  userName,
  likeCount,
  tags,
}) {
  return (
    <div className="pre-container">
      <div className="pre-left-part">
        <div className="pre-title">
          <span>{title}</span>
          <img src="/assets/heart.png" alt="heart" />
          <span className="count">{likeCount}</span>
        </div>
        <div className="tags">
          {tags &&
            tags.map((tag, index) => (
              <span className="tag" key={`${tag}-${index}`}>
                {tag}
              </span>
            ))}
        </div>
        <p className="pre-text">{description}</p>
      </div>
      <div className="pre-right-part">
        <div>
          <p className="pre-user-name">{userName}</p>
          <p className="pre-date">{format(new Date(date), "MMMM d, yyyy")}</p>
        </div>
        <img
          src={image || "/assets/user.png"}
          alt="user-photo"
          className="user-photo"
        />
      </div>
    </div>
  );
}
