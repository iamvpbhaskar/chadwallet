"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("ErrorBoundary caught an unhandled error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex items-center justify-center p-8 min-h-[300px] w-full">
          <div className="max-w-md w-full rounded-3xl border border-white/[0.06] bg-[#0c0d12]/60 p-8 text-center backdrop-blur-2xl shadow-2xl relative select-none">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-5">
              <AlertTriangle className="h-6 w-6 text-amber-400" />
            </div>
            
            <h2 className="font-outfit text-lg font-bold text-white tracking-tight mb-2">
              Something went wrong
            </h2>
            
            <p className="text-xs text-slate-400 font-inter leading-relaxed mb-6">
              A layout component or widget encountered an unexpected error. Please try reloading the page or trading terminal.
            </p>

            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
              className="inline-flex h-11 items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#08090d] hover:bg-white/[0.03] px-5 text-xs font-semibold text-white transition-all duration-200 cursor-pointer shadow-md mx-auto"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
