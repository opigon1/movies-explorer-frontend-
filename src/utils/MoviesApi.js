import { moviesConfig } from './constants';

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

  getMovies() {
    return fetch(`${this.#url}`, {
      headers: this.#headers,
      method: 'GET',
    }).then((res) => {
      return this.#handleResponse(res);
    });
  }
}

export const moviesApi = new MainApi(moviesConfig);
