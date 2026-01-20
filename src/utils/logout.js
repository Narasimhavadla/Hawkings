export const logoutUser = (navigate) => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const activities =
    JSON.parse(localStorage.getItem("userActivities")) || [];

  if (authUser) {
    // Update latest activity
    for (let i = activities.length - 1; i >= 0; i--) {
      if (
        activities[i].username === authUser.username &&
        activities[i].logoutTime === null
      ) {
        activities[i].logoutTime = new Date().toISOString();
        break;
      }
    }

    localStorage.setItem(
      "userActivities",
      JSON.stringify(activities)
    );
  }

  localStorage.removeItem("token");
  localStorage.removeItem("authUser");

  navigate("/", { replace: true });
};
