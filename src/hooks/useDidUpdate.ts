import { useEffect, useRef } from "react";

const useDidUpdate = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      const clearup = func();
      if (typeof clearup === "function") return clearup;
    } else {
      didMount.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useDidUpdate;
