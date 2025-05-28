import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";

import "../style/ArticleForm.css";

export default function ArticleForm({
  onSubmit,
  initialValues = {},
  isLoading = false,
}) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      body: "",
      tagList: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "tagList",
  });

  useEffect(() => {
    if (!initialValues) return;

    const safeTags =
      Array.isArray(initialValues.tagList) && initialValues.tagList.length > 0
        ? initialValues.tagList
        : [""];

    reset({
      title: initialValues.title || "",
      description: initialValues.description || "",
      body: initialValues.body || "",
      tagList: safeTags,
    });

    replace(safeTags);
  }, [initialValues?.title]);

  return (
    <form className="article-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>{initialValues.title ? "Edit Article" : "Create New Article"}</h2>

      {/* title  */}

      <label>Title</label>
      <input
        type="text"
        placeholder="Title"
        className="input"
        {...register("title", {
          required: true,
        })}
      />
      {errors.title && <p className="errors">{errors.title.message}</p>}

      {/* description  */}

      <label>Short description</label>
      <input
        type="text"
        placeholder="Description"
        className="input"
        {...register("description", {
          required: true,
        })}
      />
      {errors.description && (
        <p className="errors">{errors.description.message}</p>
      )}

      {/* text  */}

      <label>Text</label>
      <textarea
        rows={10}
        placeholder="Text"
        {...register("body", { required: true })}
      />
      {errors.body && <p className="errors">{errors.body.message}</p>}

      <label>Tags</label>
      <div className="tags-container">
        <div className="tags-wrapper">
          {fields.map((field, index) => (
            <div key={field.id} className="tag-item">
              <input
                type="text"
                {...register(`tagList.${index}`)}
                placeholder={`Tag`}
              />
              <button
                type="button"
                className="deleteBtn"
                onClick={() => remove(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="addBtn" onClick={() => append("")}>
          Add Tag
        </button>
      </div>

      <button type="submit" disabled={isLoading} className="saveBtn">
        {isLoading ? "Saving..." : "Send"}
      </button>
    </form>
  );
}
