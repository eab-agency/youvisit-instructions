import React from "react";

const Container = (props) => {
  return <div className={props.type}>{props.children}</div>;
};

export default Container;
