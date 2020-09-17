$(document).ready(() => {
  // Getting references to our form and input
  const submitButton = $(".submit");
  const goalInput = $("input#walking-goal");
  const stepInput = $("input#walking-steps");
  const durationInput = $("input#walking-duration");
  const milesInput = $("input#walking-miles");
  // When the Add challenge button is clicked, we validate the the inputs.
  submitButton.on("click", event => {
    event.preventDefault();
    console.log("check");
    const userData = {
      goal: goalInput.val().trim(),
      steps: stepInput.val().trim(),
      duration: durationInput.val().trim(),
      miles: milesInput.val().trim()
    };
    if (
      !userData.goal ||
      !userData.steps ||
      !userData.duration ||
      !userData.miles
    ) {
      return;
    }
    // If we have a goal, miles, duration and steps run the addChallenge function
    addChallenge(
      userData.goal,
      userData.steps,
      userData.duration,
      userData.miles
    );
    goalInput.val("");
    stepInput.val("");
    durationInput.val("");
    milesInput.val("");
  });
  // Does a post to the walking challenge route. If successful, we are redirected to the profile? page
  // Otherwise we log any errors
  function addChallenge(goal, steps, duration, miles) {
    $.get("/api/user_data").then(data => {
      $("#id-input").val(data.id);
      $.post("/api/walking", {
        goal: goal,
        steps: steps,
        duration: duration,
        miles: miles,
        UserId: 1
      }).then(data => {
        window.location.replace("/profile");
        // If there's an error, handle it by throwing up a bootstrap alert
      });
    });
    
  }
});
