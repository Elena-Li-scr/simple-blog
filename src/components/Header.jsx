import "./Header.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
export default function Header() {
  const { user, logOut } = useContext(UserContext);
  return (
    <header className="header">
      <div>
        <Link to="/" className="logo">
          Realworld Blog
        </Link>
      </div>

      {user ? (
        <div className="loginUser">
          <Link to="/new-article" className="create-article">
            Create article
          </Link>
          <Link to="/profile" className="username">
            {user.username}
          </Link>
          <img
            src={user.image || "/assets/user.png"}
            alt="avatar"
            className="avatar"
          />
          <button onClick={logOut} className="log-out">
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <Link to="/sign-in" className="signIn">
            Sign In
          </Link>
          <Link to="/sign-up" className="signUp">
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}
