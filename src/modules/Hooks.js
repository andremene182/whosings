import React from "react";

export const useAsyncError = () => {
  // eslint-disable-next-line
  const [_, setError] = React.useState();
  return React.useCallback(
    e => {
      setError(() => {
        throw e;
      });
    },
    [setError],
  );
};