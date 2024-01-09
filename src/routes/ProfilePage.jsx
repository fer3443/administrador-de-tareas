import React from "react";
import { UserProfile } from "../components/profile/UserProfile";
import { PrivateRoute } from "../router/PrivateRoute";

export const ProfilePage = () => {
  return (
    <PrivateRoute>
      <UserProfile />
    </PrivateRoute>
  );
};
