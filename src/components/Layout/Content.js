import React from "react";

function Content(props) {
  let theSubTitle = props.subtitle;
  if (theSubTitle) {
    return (
      <div className="content">
        <h4>{props.subtitle}</h4>
        {props.children}
      </div>
    );
  } else {
    return <div className="content">{props.children}</div>;
  }
}

export default Content;
