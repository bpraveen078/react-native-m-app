import { BASE_URL } from "../environment";
const login = async (model, url) => {
  let data = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(model)
  };
  debugger;
  const response = await fetch(`${BASE_URL}${url}`, data);
  debugger;
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const json = await response.json();
  return { data: json };
};

export { login };
