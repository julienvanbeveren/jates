import React from "react";
import { useEffect } from "react";

export default () => {
  useEffect(() => {
    history.replaceState(null, "Docs", "/docs/intro");
    window.location.href = "/docs/intro";
  }, []);
  return <></>;
};
