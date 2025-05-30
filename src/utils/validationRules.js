export const emailPattern = {
  value: /^\S+@\S+\.\S+$/,
  message: "Incorrect email format",
};

export const imagePattern = {
  value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i,
  message: "Must be a valid image URL",
};
