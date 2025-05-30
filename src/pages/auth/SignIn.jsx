import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { emailPattern } from "../../utils/validationRules";
import { getUser } from "../../services/authServices";

import "./Sign.css";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [serverError, setServerError] = useState("");
  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const request = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    try {
      const response = await getUser({ request });
      console.log(response.data);
      setServerError("");
      logIn(response.data.user);
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.errors
        ? Object.entries(error.response.data.errors)
            .map(([, val]) => `${val}`)
            .join("; ")
        : "Something went wrong";

      if (message === "Invalid credentials")
        setServerError("Incorrect login or password");
    }
  };

  return (
    <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>

      {/* email  */}

      <label>Email address</label>
      <input
        type="email"
        placeholder="Email address"
        className={errors.email ? "input input-error" : "input"}
        {...register("email", {
          required: true,
          pattern: emailPattern,
        })}
      />
      {errors.email && <p className="errors">{errors.email.message}</p>}

      {/*password*/}

      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        className={errors.password ? "input input-error" : "input"}
        {...register("password", {
          required: true,
          minLength: {
            value: 6,
            message: "Password needs to be at least 6 characters",
          },
          maxLength: {
            value: 40,
            message: "Password needs to be no more than 40 characters",
          },
        })}
      />
      {errors.password && <p className="errors">{errors.password.message}</p>}

      {serverError && <p className="errors">{serverError}</p>}
      <button type="submit" className="sign-button">
        Login
      </button>
      <p className="note">
        Don’t have an account?
        <Link to="/sign-up" className="link-to-sign">
          Sign Up
        </Link>
        .
      </p>
    </form>
  );
}
