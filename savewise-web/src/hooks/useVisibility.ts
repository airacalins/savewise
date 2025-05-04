import { useState } from "react";

// TODO: Removed and replaced with useBoolean
interface Visibility {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
}

export const useVisibility = (): Visibility => {
  const [isShown, setIsShown] = useState(false);

  return {
    isVisible: isShown,
    show: () => setIsShown(true),
    hide: () => setIsShown(false),
    toggle: () => setIsShown(!isShown),
  };
};
