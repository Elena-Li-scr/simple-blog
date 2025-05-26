import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    const request = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    };
    try {
      const response = await axios.post(
        "https://realworld.habsidev.com/api/users",
        request
      );
      console.log(response.data);
      setServerError("");
    } catch (error) {
      const message = error.response?.data?.errors
        ? Object.entries(error.response.data.errors).map(([, val]) => `${val}`)
        : "Something went wrong";
      if (message === "SQLiteError: UNIQUE constraint failed: users.email")
        setServerError("This email is already registered");
      if (message === "SQLiteError: UNIQUE constraint failed: users.username")
        setServerError("This username is already registered");
    }
  };
  const password = watch("password");
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new account</h2>
      {/* username */}
      <label>Username</label>
      <input
        type="text"
        placeholder="Username"
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
      {errors.username && <p>{errors.username.message}</p>}

      {/* email  */}

      <label>Email address</label>
      <input
        type="email"
        placeholder="Email address"
        {...register("email", {
          required: true,
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Incorrect email format",
          },
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}

      {/*password*/}

      <label>Password</label>
      <input
        type="password"
        {...register("password", {
          required: true,
          minLength: {
            value: 6,
            message: "Username needs to be at least 6 characters",
          },
          maxLength: {
            value: 40,
            message: "Username needs to be no more than 40 characters",
          },
        })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <label>Repeat Password</label>
      <input
        type="password"
        {...register("repeatPassword", {
          required: true,
          validate: (value) => value === password || "Passwords must match",
        })}
      />
      {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}

      {/* checkbox */}

      <label>
        <input
          type="checkbox"
          {...register("agree", {
            required: true,
          })}
        />
        I agree to the processing of my personal information
      </label>
      {errors.agree && <p>{errors.agree.message}</p>}
      {serverError && <p style={{ color: "red" }}>{serverError}</p>}
      <button type="submit">Create</button>
      <p>
        Already have an account? <Link to="/sign-in">Sign In</Link>.
      </p>
    </form>
  );
}
