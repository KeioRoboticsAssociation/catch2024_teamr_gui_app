import React, { useEffect, useCallback } from "react";

const AllScrollLock = React.memo(() => {
  const scrollNo = useCallback((e: { preventDefault: () => void }) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    document.addEventListener("touchmove", scrollNo, { passive: false });

    return () => {
      document.removeEventListener("touchmove", scrollNo);
    };
  }, [scrollNo]); // Include 'scrollNo' in the dependency array

  return <></>;
});

export default AllScrollLock;
