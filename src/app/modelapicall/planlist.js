var PlanList = {
  getItems(data) {
    try {
      return fetch("http://87.106.210.241:9202/api/Plan/GetPlansList", {
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
          // repsonses with status >= 400 get rejected. you can access response.status and response.data here too
          if (response.status === 400) {
            // handle form validation errors, response.data.errors...
          } else if (response.status === 403) {
            // handle permission errors
          } // etc
        });
    } catch (errors) {
      alert(errors);
    }
  }
};
export default PlanList;
