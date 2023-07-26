import React, { FC, useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleComponentError = () => {
      setHasError(true);
    };

    window.addEventListener('error', handleComponentError);
    return () => {
      window.removeEventListener('error', handleComponentError);
    };
  }, []);

  if (hasError) {
    return <h2>Something went wrong.</h2>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
