import axios from "axios";

export function editProfile({ request, user }) {
  return axios.put("https://realworld.habsidev.com/api/user", request, {
    headers: {
      Authorization: `Token ${user.token}`,
    },
  });
}

export function getUser({ request }) {
  return axios.post("https://realworld.habsidev.com/api/users/login", request);
}

export function newUser({ request }) {
  return axios.post("https://realworld.habsidev.com/api/users", request);
}
