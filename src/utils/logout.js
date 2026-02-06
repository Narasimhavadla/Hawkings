import axios from "axios";



export const logoutUser = async () => {
  const api = import.meta.env.VITE_API_BASE_URL;

  try {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const activityId = authUser.activityId

    const token = localStorage.getItem("token");
    if (!token || !activityId) return;

    await axios.post(
      `${api}/activity/logout`,
      { activityId },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
  } catch (err) {
    console.error("Logout API failed", err);
  }
};
