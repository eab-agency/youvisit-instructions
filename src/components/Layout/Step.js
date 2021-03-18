import React from "react";

// function GroupHeader(props) {
//   let theHeader = props.subtitle;
//   if (theHeader) {
//     return (
//       <header>
//         <h3 id={props.groupAnchor} className="section-subtitle">
//           <span className="anchor">{props.subtitle}</span>
//         </h3>
//         {props.children}
//       </header>
//     );
//   } else {
//     return <header>{props.children}</header>;
//   }
// }

const Step = (props) => {
  return (
    <li>
      <div className="step_content">{props.children}</div>
    </li>
  );
};

export default Step;
