import React from "react";

const Section = ({ title }) => {
  return (
    <section className="directly_on_website">
      <div className="wrapper centered">
        <h2 id="" className="section-title">
          {title}
        </h2>
      </div>
    </section>
  );
};

export default Section;
