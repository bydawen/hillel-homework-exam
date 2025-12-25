import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

export default function RouteProtector({ children }) {
  const token = useSelector(state => state.authorization.token);

  if (!token) {
    return (
      <Navigate to="/login" replace />
    );
  }

  return children;
}
