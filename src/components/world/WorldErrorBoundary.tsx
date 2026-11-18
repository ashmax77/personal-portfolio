"use client";

import { Component, type ReactNode } from "react";

type WorldErrorBoundaryProps = {
  onError: () => void;
  children: ReactNode;
};

type WorldErrorBoundaryState = {
  hasError: boolean;
};

/** Catches failures in the 3D layer so the HTML portfolio stays usable. */
export default class WorldErrorBoundary extends Component<
  WorldErrorBoundaryProps,
  WorldErrorBoundaryState
> {
  state: WorldErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): WorldErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("[Ashen's World] 3D layer failed:", error);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
