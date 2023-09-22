// src/components/ErrorComponent.tsx
import React from "react";

interface ErrorComponentProps {
  error: Error | null;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return <div>Error: {error.message}</div>;
};

export default ErrorComponent;
