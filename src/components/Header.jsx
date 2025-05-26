import "../style/Header.css";
export default function Header() {
  return (
    <div className="header">
      <div>
        <h1 className="logo">Realworld Blog</h1>
      </div>
      <div>
        <button className="signIn">Sign In</button>
        <button className="signUp">Sign Up</button>
      </div>
    </div>
  );
}
