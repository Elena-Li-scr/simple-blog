import { format } from "date-fns";
export default function ArticlePreview({
  title,
  description,
  image,
  date,
  userName,
}) {
  return (
    <div className="pre-container">
      <div className="pre-left-part">
        <div className="pre-title">
          <span>{title}</span>
          <img src="/assets/heart.png" alt="heart" />
          <span className="count">12</span>
        </div>
        <img src="/assets/tag.png" alt="tag" className="tag" />
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
