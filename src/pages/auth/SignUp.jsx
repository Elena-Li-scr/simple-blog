import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { emailPattern } from "../../utils/validationRules";
import { newUser } from "../../services/authServices";

import "./Sign.css";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [serverError, setServerError] = useState("");
  const { logIn } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const request = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    try {
      const response = await newUser({ request });
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

      if (message === "SQLiteError: UNIQUE constraint failed: users.email")
        setServerError("This email is already registered");
      if (message === "SQLiteError: UNIQUE constraint failed: users.username")
        setServerError("This username is already registered");
    }
  };
  const password = watch("password");
  return (
    <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new account</h2>
      {/* username */}
      <label>Username</label>
      <input
        type="text"
        placeholder="Username"
        className={errors.username ? "input input-error" : "input"}
        {...register("username", {
          required: true,
          minLength: {
            value: 3,
            message: "Username needs to be at least 3 characters",
          },
          maxLength: {
            value: 20,
            message: "Username needs to be no more than 20 characters",
          },
        })}
      />
      {errors.username && <p className="errors">{errors.username.message}</p>}

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
      <label>Repeat Password</label>
      <input
        type="password"
        placeholder="Password"
        className={errors.repeatPassword ? "input input-error" : "input"}
        {...register("repeatPassword", {
          required: true,
          validate: (value) => value === password || "Passwords must match",
        })}
      />
      {errors.repeatPassword && (
        <p className="errors">{errors.repeatPassword.message}</p>
      )}

      {/* checkbox */}
      <div className="line"></div>

      <label className="checkbox-label">
        <input
          className="checkbox"
          type="checkbox"
          {...register("agree", {
            required: true,
          })}
        />
        I agree to the processing of my personal information
      </label>
      {errors.agree && <p className="errors">{errors.agree.message}</p>}
      {serverError && <p className="errors">{serverError}</p>}
      <button type="submit" className="sign-button">
        Create
      </button>
      <p className="note">
        Already have an account?{" "}
        <Link to="/sign-in" className="link-to-sign">
          Sign In
        </Link>
        .
      </p>
    </form>
  );
}
