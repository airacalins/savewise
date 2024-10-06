import { useState } from "react";

interface BooleanState {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

export const useVisibilityState = (): BooleanState => {
  const [isShown, setIsShown] = useState(false);

  return {
    isVisible: isShown,
    show: () => setIsShown(true),
    hide: () => setIsShown(false),
    toggle: () => setIsShown(!isShown),
  };
};
