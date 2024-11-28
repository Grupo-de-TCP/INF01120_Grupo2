import React from "react";

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  errorMessage?: string;
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  // print error to console
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (process.env.ENV_MODE !== "production") {
      console.error(error, errorInfo);
      console.error("ErrorBoundary: \n", `Custom error message: ${this.props.errorMessage} \n`, error);
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback || null : this.props.children;
  }
}
