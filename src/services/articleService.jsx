import axios from "axios";
export function getPageArticle({
  API_URL,
  limit,
  offset,
  setArticles,
  setArticlesCount,
  setError,
  setLoading,
}) {
  axios
    .get(`${API_URL}?limit=${limit}&offset=${offset}`)
    .then((res) => {
      setArticles(res.data.articles);
      setArticlesCount(res.data.articlesCount);
      console.log(res.data.articles);
    })
    .catch((e) => {
      console.log(e);
      setError("Failed to load articles.");
    })
    .finally(() => {
      setLoading(false);
    });
}

export function likeArticle({ API_URL, slug, user }) {
  return axios.post(
    `${API_URL}/${slug}/favorite`,
    {},
    {
      headers: { Authorization: `Token ${user.token}` },
    }
  );
}
export function unLikeArticle({ API_URL, slug, user }) {
  return axios.delete(`${API_URL}/${slug}/favorite`, {
    headers: { Authorization: `Token ${user.token}` },
  });
}

export function getArticle({
  API_URL,
  slug,
  setArticle,
  setError,
  setLoading,
}) {
  axios
    .get(`${API_URL}/${slug}`)
    .then((res) => {
      setArticle(res.data.article);
    })
    .catch((e) => {
      console.log(e);
      setError("Failed to load article.");
    })
    .finally(() => {
      setLoading(false);
    });
}

export function deleteArticle({ slug, user }) {
  return axios.delete(`https://realworld.habsidev.com/api/articles/${slug}`, {
    headers: {
      Authorization: `Token ${user.token}`,
    },
  });
}

export function postArticle({ request, user }) {
  return axios.post("https://realworld.habsidev.com/api/articles", request, {
    headers: {
      Authorization: `Token ${user.token}`,
    },
  });
}

export function getEditArticle({ slug }) {
  return axios.get(`https://realworld.habsidev.com/api/articles/${slug}`);
}

export function putEditArticle({ slug, request, user }) {
  return axios.put(
    `https://realworld.habsidev.com/api/articles/${slug}`,
    request,
    {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    }
  );
}
