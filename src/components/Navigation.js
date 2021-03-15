import React from "react";

const Navigation = ({ locations }) => {
  const navItems =
    locations &&
    locations.map((location, index) => <li key={index}>{location.name}</li>);

  return (
    <div className="navBar">
      <nav role="navigation">
        <ul className="no-list">
          <li>
            <ul>{navItems}</ul>
          </li>
          <li></li>
        </ul>
      </nav>
    </div>
  );
};
export default Navigation;
