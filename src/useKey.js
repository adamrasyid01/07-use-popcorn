import { useEffect } from "react";

export function useKey(key, action) {
  // Saat pencet Esc detail film ketutup
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, action]);
}
