import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const image = localStorage.getItem("image");
    if (username && token) {
      setUser({ username, token, image, email });
    }
  }, []);

  const logIn = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("username", userData.username);
    localStorage.setItem("email", userData.email);
    localStorage.setItem("image", userData.image);
    setUser(userData);
  };

  const logOut = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
