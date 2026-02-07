import { useEffect } from "react";

export default function useTabCloseLogout() {
  useEffect(() => {
    const handleTabClose = () => {
      const token = localStorage.getItem("token");
      const authUser = JSON.parse(localStorage.getItem("authUser"));

      if (!token || !authUser?.activityId) return;

      const api = import.meta.env.VITE_API_BASE_URL;

      const payload = {
        activityId: authUser.activityId,
        token,
      };

      navigator.sendBeacon(
        `${api}/activity/logout`,
        new Blob([JSON.stringify(payload)], {
          type: "application/json",
        })
      );
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);
}
