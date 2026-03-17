import * as React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/** Limite de erro para mostrar mensagem em vez de tela em branco. */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-destructive">
          <p className="font-medium">Algo deu errado ao carregar este conteúdo.</p>
          <p className="mt-2 text-sm">{this.state.error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
