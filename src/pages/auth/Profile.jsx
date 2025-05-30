import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { emailPattern, imagePattern } from "../../utils/validationRules";
import { editProfile } from "../../services/authServices";

import "./Sign.css";

export default function Profile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [serverError, setServerError] = useState("");
  const { user, logIn } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        email: user.email || "",
        image: user.image || "",
        password: "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    const request = {
      username: data.username,
      email: data.email,
      password: data.password || undefined,
      image: data.image,
    };
    try {
      const response = await editProfile({ request, user });
      console.log(response.data);
      logIn(response.data.user);
      reset({
        username: response.data.user.username,
        email: response.data.user.email,
        image: response.data.user.image || "",
        password: "",
      });
      alert("Profile updated successfully!");
      setServerError("");
    } catch (error) {
      const message = error.response?.data?.errors
        ? Object.entries(error.response.data.errors)
            .map(([, val]) => `${val}`)
            .join("; ")
        : "Something went wrong";

      if (message === "SQLiteError: UNIQUE constraint failed: users.username")
        setServerError("Username is already taken");
      else setServerError(message);
    }
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Profile</h2>
      {/* username */}
      <label>Username</label>
      <input
        type="text"
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
        className={errors.email ? "input input-error" : "input"}
        {...register("email", {
          required: true,
          pattern: emailPattern,
        })}
      />
      {errors.email && <p className="errors">{errors.email.message}</p>}

      {/*password*/}

      <label>New Password</label>
      <input
        type="password"
        placeholder="New Password"
        className={errors.password ? "input input-error" : "input"}
        {...register("password", {
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
      <label>Avatar image (url)</label>
      <input
        type="url"
        placeholder="Avatar image"
        className={errors.image ? "input input-error" : "input"}
        {...register("image", {
          pattern: imagePattern,
        })}
      />
      {errors.image && <p className="errors">{errors.image.message}</p>}

      {serverError && <p className="errors">{serverError}</p>}
      <button type="submit" className="save-button">
        Save
      </button>
    </form>
  );
}
