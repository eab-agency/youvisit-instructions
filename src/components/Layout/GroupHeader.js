import React from "react";

function GroupHeader(props) {
  let theHeader = props.subtitle;
  if (theHeader) {
    return (
      <header>
        <h3 id={props.groupAnchor} className="section-subtitle">
          <span className="anchor">{props.subtitle}</span>
        </h3>
        {props.children}
      </header>
    );
  } else {
    return <header>{props.children}</header>;
  }
}

// const GroupHeader = (props) => {
//   return (
//     <header>
//       <h3 id={props.groupAnchor} className="section-subtitle">
//         <span className="anchor">{props.subtitle}</span>
//       </h3>
//       {props.children}
//     </header>
//   );
// };

export default GroupHeader;
