class FetchService {
  constructor() {
    this.url = {};
    this.options = {};
    this.endpoint = null;
    this.headers = {};
    this.router = {};
    this.handleErrors = true;
  }

  setRouter(router) {
    this.router = router;
  }

  setHandleErrors(handleErrors) {
    this.handleErrors = handleErrors;
  }

  setHeaders() {
    this.headers = new Headers();
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    this.headers.append('Authorization', `Bearer ${token}`);
  }

  setUrl(endpoint, params) {
    this.url = new URL(endpoint);
    if (params) {
      Object.keys(params)
        .forEach((key) => this.url.searchParams.append(key, params[key]));
    }
  }

  get(endpoint, params, handleErrors = true) {
    this.setHeaders();
    this.setUrl(endpoint, params);

    this.options = {
      method: 'GET',
      headers: this.headers,
      body: null,
    };

    return this.fetchEndpoint(handleErrors);
  }

  post(endpoint, data, params) {
    this.setHeaders();
    this.setUrl(endpoint, params);

    this.options = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    };

    return this.fetchEndpoint();
  }

  put(endpoint, data, params) {
    this.setHeaders();
    this.setUrl(endpoint, params);

    this.options = {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    };

    return this.fetchEndpoint();
  }

  patch(endpoint, data, params) {
    this.setHeaders();
    this.setUrl(endpoint, params);

    this.options = {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    };

    return this.fetchEndpoint();
  }

  delete(endpoint, data, params) {
    this.setHeaders();
    this.setUrl(endpoint, params);

    this.options = {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(data),
    };

    return this.fetchEndpoint();
  }

  fetchEndpoint(handleErrors = true) {
    return new Promise((successCallback, failureCallback) => {
      if (navigator.onLine || this.useCache) {
        fetch(this.url, this.options)
          .then((response) => {
            const { status } = response;
            response.json().then((data) => {
              if (status >= 200 && status < 400) {
                successCallback(data);
              } else if (status >= 400 && status < 405) {
                this.logError(data, response);
              } else if (status >= 405) {
                this.processError(data, response);
                failureCallback(data);
              } else {
                failureCallback();
              }
            });
          })
          .catch((error) => {
            this.processError(error);
          });
      }
    });
  }

  processError(response, rawresponse) {
    this.emitter.emit('alert', {
      type: 'error',
      content: 'Une erreur est survenue.',
    });
    this.emitter.emit('close-loader');
    this.logError(response, rawresponse);
  }

  logError(response, rawresponse) {
    const debug = {
      url: this.url,
      options: this.options,
      rawresponse,
      response,
    };
    console.log('[fetchService error]', debug);
  }
}

export default new FetchService();
