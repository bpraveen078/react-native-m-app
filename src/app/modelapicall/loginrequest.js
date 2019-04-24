var LoginRequest = {
  postLogin(data) {
    debugger;
    try {
      return fetch("http://87.106.210.241:9202/api/account/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJson => {
          debugger;
          return responseJson;
        })
        .catch(error => {
          console.log(error);
        });
    } catch (errors) {
      alert(errors);
    }
  }
};

export default LoginRequest;
