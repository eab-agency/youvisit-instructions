import React from "react";

function Container(props) {
  let containerType = props.type;
  if (containerType != "embed_steps") {
    return <div className={props.type}>{props.children}</div>;
  } else {
    return <ul className={props.type}>{props.children}</ul>;
  }
}

// const Container = (props) => {
//   return <div className={props.type}>{props.children}</div>;
// };

export default Container;
