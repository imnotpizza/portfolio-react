import React from "react";
import "../sass/BgText.scss";

export default ({ main, sub }) => {
  return (
    <div id="bg-text">
      <div id="bg-text-main">{main}</div>
      <div id="bg-text-sub">{sub}</div>
    </div>
  );
};
