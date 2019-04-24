var ForgetReuest = {
  postForgetPassword(data) {
    try {
      return fetch("http://87.106.210.241:9202/api/account/ForgotPassword", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(responseJson => {
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

export default ForgetReuest;
