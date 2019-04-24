var SubscribedDetails = {
  getItemDetails(userId) {
    try {
      return fetch(
        "http://87.106.210.241:9202/api/Plan/GetSubscribedPlansOfUser?userId=" +
          encodeURIComponent(userId),
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          return responseJson;
        })
        .catch(error => {
          console.log(error);
          // repsonses with status >= 400 get rejected. you can access response.status and response.data here too
          if (response.status === 200) {
            // handle form validation errors, response.data.errors...
          } else if (response.status === 500) {
            // handle permission errors
          } // etc
        });
    } catch (errors) {
      alert(errors);
    }
    debugger;
  }
};
export default SubscribedDetails;
