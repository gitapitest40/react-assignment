export const getApi = (url, params) => {
  const requestOptions = {
    method: "GET",
    headers: { Accept: "application/json"},
  };

  let requestUrl = url;

  if (params !== null) {
    requestUrl = `${url}?${params}`;
  }

  return fetch(requestUrl, requestOptions);
};