import axios from "axios";

export const getRequest = (url, method, options) => {
  const _controller = new AbortController();

  return {
    action: axios({
      method,
      url,
      signal: _controller.signal,
      ...options,
    }),
    cancel: () => {
      _controller.abort();
    },
  };
};
