var PlanDetails = {
  getItemDetails(subUserId, userId, orderedDate) {
    try {
      return fetch(
        `http://87.106.210.241:9202/api/Plan/GetCustomerOrderOnDayWise?subUserId=${subUserId}&userId=${userId}&orderedDate=${orderedDate}`,

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
          if (response.status === 400) {
            // handle form validation errors, response.data.errors...
          } else if (response.status === 403) {
            // handle permission errors
          } // etc
        });
    } catch (errors) {
      alert(errors);
    }
    debugger;
  }
};
export default PlanDetails;
