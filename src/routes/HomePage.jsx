import React from "react";
import { Home } from "../components/inicio/Home";
import { PrivateRoute } from "../router/PrivateRoute";
export const HomePage = () => {
  return (
    <>
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    </>
  );
};
