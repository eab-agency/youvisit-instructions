import React from "react";
import Container from "./Container";

const Section = (props) => {
  return (
    <section className="directly_on_website">
      <div className="wrapper centered">
        <h2 id={props.sectionAnchor} className="section-title">
          {props.sectionTitle}
        </h2>
        {/* <Container
          subtitle={props.subtitle}
          groupAnchor={props.groupAnchor}
          sectionHeadParagraph={props.sectionHeadParagraph}
        >
          {props.children}
        </Container> */}
        {props.children}
      </div>
    </section>
  );
};

export default Section;
