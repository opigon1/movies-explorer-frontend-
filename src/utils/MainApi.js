import { apiConfig } from './constants';

class MainApi {
  #url;
  #headers;

  constructor({ url, headers }) {
    this.#url = url;
    this.#headers = headers;
  }

  #handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  addMovie(movieData) {
    return fetch(`${this.#url}/movies`, {
      credentials: 'include',
      headers: this.#headers,
      method: 'POST',
      body: JSON.stringify({
        ...movieData,
      }),
    }).then((res) => {
      return this.#handleResponse(res);
    });
  }

  deleteMovie(id) {
    return fetch(`${this.#url}movies/${id}`, {
      credentials: 'include',
      headers: this.#headers,
      method: 'DELETE',
    }).then((res) => {
      return this.#handleResponse(res);
    });
  }

  getSavedMovies() {
    return fetch(`${this.#url}/movies`, {
      credentials: 'include',
      headers: this.#headers,
      method: 'GET',
    }).then((res) => {
      return this.#handleResponse(res);
    });
  }

  getUserInfo() {
    return fetch(`${this.#url}/users/me`, {
      credentials: 'include',
      headers: this.#headers,
      method: 'GET',
    }).then((res) => {
      return this.#handleResponse(res);
    });
  }

  deleteMovie(id) {
    return fetch(`${this.#url}/movies/${id}`, {
      credentials: 'include',
      headers: this.#headers,
      method: 'DELETE',
    }).then((res) => {
      return this.#handleResponse(res);
    });
  }

  editUserInfo(data) {
    return fetch(`${this.#url}/users/me`, {
      credentials: 'include',
      headers: this.#headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => {
      return this.#handleResponse(res);
    });
  }

  handleLikeCard(movieId, like) {
    return fetch(`${this.#url}/movies/${movieId}/likes`, {
      credentials: 'include',
      method: like ? 'DELETE' : 'PUT',
      headers: this.#headers,
    }).then((res) => {
      return this.#handleResponse(res);
    });
  }
}

export const mainApi = new MainApi(apiConfig);
