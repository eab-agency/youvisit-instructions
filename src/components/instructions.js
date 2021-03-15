import React, { useEffect, useRef, useState } from "react";
import { usePageHeadingsTree } from "use-page-headings-tree";
import { PrismCode } from "./YouVisitIWC/prismcode";
import { YouVisitIWC } from "@ux_bob/yv-iwc";
import { gql, useQuery } from "@apollo/client";

// import Layout from "../components/Layout"
import LayoutInstructions from "./LayoutInstructions";
// import SelectInput from "@material-ui/core/Select/SelectInput"

export const query = gql`
  query Institution($institutionID: String!) {
    institutions(instID: $institutionID) {
      locations {
        loc_id
        name
        experience_type
        cover_photo {
          thumb
          full
        }
        stops {
          stopid
          title
          panoramas {
            smallurl
            thumburl
          }
        }
      }
      name
      inst_id
    }
  }
`;

const InstructionsPage = ({ institutionID }) => {
  // const headingsContainerRef = useRef();

  // const [pageHeadingNodes, setPageHedingNodes] = useState([]);
  // const [pageHeadingTree, setPageHeadingTree] = useState(null);

  // useEffect(() => {
  //   const headingNodes = headingsContainerRef.current.querySelectorAll("h2,h3");
  //   setPageHedingNodes(headingNodes);
  // }, []);

  // usePageHeadingsTree(pageHeadingNodes, setPageHeadingTree, false);

  const { error, loading, data } = useQuery(query, {
    variables: { institutionID },
  });
  if (loading) return <p>Loading Institution...</p>;
  if (error) return `Error! ${error}`;

  const renderNodeList = (node) => (
    <li key={node.id}>
      <a href={"#" + node.id}>{node.text}</a>
      {node.childNodes.length > 0 ? (
        <ul>{node.childNodes.map(renderNodeList)}</ul>
      ) : null}
    </li>
  );

  const datum = data.institutions;
  // const name = datum.name
  // const title = `Virtual Tour Installation Instructions for ${name}`
  const title = datum.name;
  const firstLocation = datum.locations[0].loc_id;
  let locations = datum.locations;

  let filtered_locations_arr = process.env.GATSBY_LOCATIONS;
  if (
    // first check if env variable is set
    filtered_locations_arr === undefined ||
    filtered_locations_arr.length === 0
  ) {
    console.log(locations);
  } else {
    filtered_locations_arr = filtered_locations_arr.split`,`.map((x) => +x);
    locations = locations.filter((el) => {
      return filtered_locations_arr.some((f) => {
        return f === el.loc_id;
      });
    });
  }

  const experience_type = datum.locations[0].experience_type;
  const allStops = datum.locations[0].stops;
  let stops = "";
  if (experience_type === "vt") {
    stops = allStops.map((stop, index) => {
      return (
        <div key={index}>
          {/* <h4>{stop.title}</h4> */}
          <YouVisitIWC
            containerWidth="100%"
            containerHeight="500px"
            title={locations.name}
            institution={datum.inst_id}
            type="hover-panel"
            location={locations.loc_id}
            showCode="false"
            dataStopid={stop.stopid}
          />
        </div>
      );
    });
  }

  let stopsCodes = "";
  if (experience_type === "vt") {
    stopsCodes = allStops.map((stop, index) => {
      const immersiveBannerCode = `
  <a alt="Launch Experience" href="https://www.youvisit.com/#/vte/?data-platform=v&data-link-type=immersive&data-inst=${datum.inst_id}&data-image-width=100%&data-image-height=100%&data-loc=${stop.stopid}&">Launch Experience</a>
  `;
      const hyperlinkCode = `
  <a alt="Launch Experience" href="https://www.youvisit.com/#/vte/?data-platform=v&data-inst=${datum.inst_id}&data-image-width=100%&data-image-height=100%&data-loc=${stop.stopid}&">Launch Experience</a>

  `;
      return (
        <tr key={index}>
          {/* <pre>{JSON.stringify(allStops, null, 4)}</pre> */}
          <td>
            {stop.title}
            {stop.panoramas.length >= 1 && (
              <figure>
                <img src={stop.panoramas[0].thumburl} alt={stop.title} />
              </figure>
            )}
          </td>
          <td>
            {/* <PrismCode code={immersiveBannerCode} language="html" /> */}
            <code>{immersiveBannerCode}</code>
          </td>
          <td>
            {/* <PrismCode code={hyperlinkCode} language="html" /> */}
            <code>{hyperlinkCode}</code>
          </td>
        </tr>
      );
    });
  }

  // const institutionID = institutionID;
  const yvcode = `
          <script async="async" defer="defer" src="https://www.youvisit.com/tour/Embed/js3"></script>
          `;

  return (
    <LayoutInstructions title={title} locations={locations}>
      <div className="intro">
        <div className="wrapper centered">
          <h1>
            Virtual Tour Installation Instructions for <i>{datum.name}</i>
          </h1>
          <p>
            Congratulations on the launch of your virtual tour! Now let’s set
            you up to get the most out of it.
          </p>
        </div>
      </div>
      {/* <nav className="instructions_nav">
        {pageHeadingTree ? (
          <ul>{pageHeadingTree.map(renderNodeList)}</ul>
        ) : null}
      </nav>
      <div ref={headingsContainerRef}> */}
      <div>
        <section className="unlocking_the_power">
          <div className="wrapper centered">
            <h2 id="unlocking-the-power" className="section-title">
              Unlocking The Power of Your Virtual Tour
            </h2>
            <div className="group tracking-launching">
              <header>
                <h3
                  id="unlocking-the-power-tracking"
                  className="section-subtitle"
                >
                  <span className="anchor">
                    Tracking, Launching, and Attributing
                  </span>
                </h3>
                <p>
                  The <b>YouVisit Tag </b>is a script that is needed to
                  successfully collect audience insights, launch a virtual tour,
                  and measure attributions. It is a critical piece to your
                  installation, and it is imperative that the YouVisit Tag be
                  used correctly for an optimal launch and successful tracking
                  of engagement and attributions.
                </p>
              </header>

              <div className="group_content">
                <div className="content-wrapper">
                  <div className="youvisit_tag step">
                    <div className="step_graph">
                      <div className="yvtag">YouVisit Tag</div>
                    </div>
                    <div className="step_description">
                      <h4>Collect Audience Insights</h4>
                      <p>
                        When installed alone on a webpage, the{" "}
                        <strong>YouVisit Tag</strong> tracks visitors
                      </p>
                      <h5>Partner benefits:</h5>
                      <ul>
                        <li>
                          Map out how your audiences engage with different pages
                          on your website and their activity
                        </li>
                      </ul>
                      <small>
                        This tracking is foundational to future data
                        enhancements we are exploring around linking users
                        throughout the EAB Network across all our offerings
                      </small>
                    </div>
                  </div>

                  <div className="yvtag-embed step">
                    <div className="step_graph">
                      <div className="yvtag">YouVisit Tag</div>
                      <div className="embedcodetag">Embed Code</div>
                    </div>

                    <div className="step_description">
                      <h4>Launch Virtual Tour</h4>
                      <p>
                        To embed and launch a Virtual Tour on a webpage, the
                        <strong>YouVisit Tag</strong> is required to be
                        installed with a separate
                        <strong>Embed Code</strong> that tells the YouVisit Tag
                        how the Virtual Tour should be rendered (width, height,
                        default destination, etc...)
                      </p>
                      <h5>Partner Benefits:</h5>
                      <ul>
                        <li>
                          Ensure proper attribution to inquiry source (your .edu
                          site rather than YouVisit)
                        </li>
                        <li>
                          Ensure accurate tracking of audiences who engage with
                          your online content in our analytics product
                        </li>
                        <li>
                          Receive automatic updates when enhancements are rolled
                          out
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="yvtag-successcode step">
                    <div className="step_graph">
                      <div className="yvtag">YouVisit Tag</div>
                      <div className="successcode">Success Code</div>
                    </div>
                    <div className="step_description">
                      <h4>Measure Attribution</h4>
                      <p>
                        To quantify the impact of your Virtual Tour and show how
                        many visitors got to a success page (i.e completed
                        application) after visiting your Virtual Tour, the
                        <strong>YouVisit Tag</strong> and a separate{" "}
                        <strong>Success Code</strong> is required to be
                        installed
                      </p>
                      <h5>Partner Benefits:</h5>
                      <ul>
                        <li>
                          Quantify the impact of virtual tours&nbsp;by showing
                          how many visitors&nbsp;got to a page you deem a
                          success after visiting the Virtual Tour vs. without
                          visiting the Virtual Tour
                        </li>
                        <li>See the conversion lift Virtual Tour brings</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ================================================== */}

            <div className="group high-impact-action">
              <header>
                <h3 id="high-impact-action-steps" className="section-subtitle">
                  <span className="anchor">High-Impact Action Steps</span>
                </h3>
              </header>

              <div className="group_content">
                <div className="content-wrapper">
                  <div className="step instal_on_website">
                    <div className="step_data">
                      <h4>Install On Your Website</h4>
                      <p>
                        College websites continue to be a top focal point of
                        student search, so make sure your virtual tour is
                        prominently displayed.
                      </p>
                      <h5>Questions to Consider:</h5>
                      <ul>
                        <li>
                          Where should we have an immersive banner vs. a
                          hyperlink?
                        </li>
                        <li>
                          Where should we launch into the main experience vs.
                          specific scenes?
                        </li>
                      </ul>
                    </div>
                    <aside className="step_description">
                      <p>
                        For the highest engagement, we recommend leveraging an
                        eye-catching immersive banner in places, such as the
                        body and footer of web pages, as well as hyperlinks in
                        other relevant spots, such as the navigation menu.
                      </p>
                      <p>
                        In addition, we recommend that you use immersive banners
                        that launch into specific tour stops on relevant pages.
                        For example, embed Athletics tour stop on Athletics
                        page; embed Student Center/Dining Hall on Student Life,
                        embed Residence Halls on Housing page, key program stops
                        on relevant academic program pages, etc.)
                      </p>
                    </aside>
                  </div>

                  <div className="step include_in_marketing">
                    <div className="step_data">
                      <h4>Include In Your Marketing</h4>
                      <p>
                        Consider how you can leverage your Virtual Tour to bring
                        your marketing campaigns to life.
                      </p>
                      <h5>Questions to Consider:</h5>
                      <ul>
                        <li>Where are we reaching out to students? &nbsp;</li>
                        <li>How are we conducting virtual visits?&nbsp;</li>
                        <li>
                          How are we enabling students and families to conduct
                          self-guided tours on campus?&nbsp;
                        </li>
                      </ul>
                    </div>
                    <aside className="step_description">
                      <p>
                        Add the Virtual Tour to email, text, and social
                        communications
                      </p>
                      <p>
                        Host live Virtual Tour walkthroughs with a Student
                        Ambassador and/or faculty member
                      </p>
                      <p>
                        Leverage self guided options available based on your
                        partnership
                      </p>
                    </aside>
                  </div>

                  <div className="step keep_it_fresh">
                    <div className="step_data">
                      <h4>Keep it Fresh</h4>
                      <p>
                        Meet with your Partner Success team quarterly and
                        revisit your placement &amp; promotion strategy,
                        informed by your evolving strategy and tour/tour stop
                        performance.
                      </p>
                      <h5>Questions to Consider:</h5>
                      <ul>
                        <li>
                          Did we see spikes in performance on a particular point
                          of interest and/or time frame?
                        </li>
                        <li>Have we received student feedback?</li>
                        <li>
                          How might it make sense to tweak the tour itself using
                          existing content to support our evolving
                          strategy?&nbsp;
                        </li>
                      </ul>
                    </div>
                    <aside className="step_description">
                      <p>Monitor performance to optimize content</p>
                      <p>
                        Ask students for feedback on if the tour was easy to
                        find or what was the most interesting about it?
                      </p>
                      <p>
                        Consider new buildings or programs, seasonal events, or
                        new voices that might resonate most with prospective
                        students
                      </p>
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="directly_on_website">
          <div className="wrapper centered">
            <h2 id="directly-on-website" className="section-title">
              Directly on Website
            </h2>

            <div className="group">
              <header>
                <h3 id="directly-on-website-embed" className="section-subtitle">
                  <span className="anchor">Embed and Launch</span>
                </h3>
                <p>
                  The <span className="embedcodetag">Embed Code</span> and
                  <span className="yvtag">YV TAG</span>
                  can be directly embedded in multiple locations per page, on
                  multiple pages, and there are two ways to launch the virtual
                  tour on your website:
                </p>
              </header>
              <div className="group_content">
                <div className="content">
                  <h4>Immersive Banner</h4>

                  <ul className="embed_steps">
                    <li>
                      {stops[0]}
                      <div className="step_content">
                        Place this{" "}
                        <span className="embedcodetag">Embed Code</span> on your
                        respective pages to install the experience
                      </div>
                      <PrismCode
                        code={`
                      <a alt="Launch Experience" href="https://www.youvisit.com/#/vte/?data-platform=v&data-link-type=immersive&data-inst=${datum.inst_id}&data-image-width=100%&data-image-height=100%&">Launch Experience</a>`}
                        language="html"
                      />
                      <div className="important_note">
                        <p>
                          Change the <strong>%</strong> to alter the size of the
                          banner
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="step_content">
                        Place the <span className="yvtag">YV TAG</span> above
                        the <code>&lt;/body&gt;</code>
                        tag on each page you place the code
                      </div>
                      <PrismCode code={yvcode} language="html" />
                      <div className="important_note">
                        <p>
                          The script <strong>must go</strong> below the link to
                          successfully launch
                        </p>
                      </div>
                    </li>
                  </ul>

                  <div className="need_help">
                    <p>Need more help?&nbsp;</p>
                    <a href="https://www.youvisit.com/squarespace-embed/">
                      View Our Instructional Video
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* =============================================== */}
            <div className="group">
              <header>
                <h3
                  id="directly-on-website-tracking-success"
                  className="section-subtitle"
                >
                  <span className="anchor">Tracking Success</span>
                </h3>
                <p>
                  Once the virtual tour is successfully embedded on your
                  website, you will want to track the success. Adding the{" "}
                  <span className="successcode">SUCCESS CODE</span> and{" "}
                  <span className="yvtag">YV TAG</span> to your website is as
                  simple as adding 2 lines of javascript code in your funnel
                  confirmation page.
                </p>
              </header>
              <div className="group_content">
                <div className="content">
                  <h4>Installation</h4>
                  <ul className="embed_steps">
                    <li>
                      <div className="step_content">
                        URLS for Call to Action targets (typically a form) - Ex:
                        URL of a form complete 'thank you' page
                      </div>
                      <PrismCode
                        code={`
<script>
    var yv_launch_success=true,
    yv_instid=${institutionID},
    yv_locid=${firstLocation};
</script>
<script src="https://www.youvisit.com/tour/Success/js3"></script>
                      `}
                        language="html"
                      />

                      <div className="important_note">
                        <p>Paste the provided script tag above the body tag:</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="content">
                  <h4>Advanced Instructions</h4>
                  <p>
                    If you don't have a success/confirmation page or need to
                    call the success tag on demand, the YouVisit script can
                    accommodate such scenarios. For example, if you show
                    Javascript confirmation pop-up rather than forwarding the
                    user to a success page after registering, then you can
                    follow these steps to call the success tag on demand.
                  </p>
                  <ul className="embed_steps">
                    <li>
                      <div className="step_content">
                        Paste the provided script tag above the &lt;/body&gt;
                        tag:
                      </div>
                      <PrismCode
                        code={`
<script>
    var yv_launch_success=true,
    yv_instid=${institutionID},
    yv_locid=${firstLocation};
</script>
<script src="https://www.youvisit.com/tour/Success/js3"></script>
                          `}
                        language="html"
                      />
                    </li>
                    <li>
                      <div className="step_content">
                        Once the success condition is met, execute the following
                        Javascript call
                      </div>
                      <PrismCode
                        code={`
                          SuccessScript.embedSuccess();
                          `}
                        language="javascript"
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          {/* Wrapper Centered */}
        </section>

        <section className="directly_on_website">
          <div className="wrapper centered">
            <h2 id="google-tag-manager" className="section-title">
              Google Tag Manager
            </h2>
            <div className="group">
              <header>
                <h3
                  id="google-tag-manager-installing-the-tag"
                  className="section-subtitle"
                >
                  <span className="anchor">Installing the Tag</span>
                </h3>
                <p>
                  The following is the set of steps needed to install the{" "}
                  <span className="yvtag">YV TAG</span>.The tag is a tracking
                  script that reads your{" "}
                  <span className="embedcodetag">Embed Code</span> to launch
                  your virtual tour. We recommend triggering the tag to run on
                  all pages in order to eliminate needing to include it with
                  each <span className="embedcodetag">Embed Code</span> and for
                  enhanced tracking.
                </p>
              </header>
              <div className="group_content">
                <div className="content">
                  <h4>Login to GTM</h4>
                  <ul className="embed_steps">
                    <li>
                      <div className="step_content">
                        <a
                          href="https://tagmanager.google.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          https://tagmanager.google.com
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="content">
                  <h4>Create a tag in GTM</h4>
                  <p>Workspace &gt; Tags &gt; New &gt; Custom HTML</p>
                  <ul className="embed_steps">
                    <li>
                      <div className="step_content">
                        Add a title to the tag – Ex: “Virtual Tour Tracking”
                      </div>
                    </li>
                    <li>
                      <div className="step_content">Tag Configuration</div>
                      <div className="important_note">
                        Paste the following{" "}
                        <span className="yvtag">YV TAG</span> in the custom HTML
                        field:
                      </div>
                      <PrismCode
                        code={`
                              <script src="https://www.youvisit.com/tour/Success/js3"></script>
                              `}
                        language="html"
                      />
                    </li>
                    <li>
                      <div className="step_content">
                        Triggering
                        <div className="important_note">
                          Define the URLs/Patterns for the locations you want
                          the tag to be included.{" "}
                          <strong>
                            Include <span className="yvtag">YV TAG</span> on all
                            pages
                          </strong>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="step_content">
                        Hit ”Save” in upper right-hand corner
                      </div>
                    </li>
                    <li>
                      <div className="step_content">
                        Be sure to publish the changes through the main GTM page
                      </div>
                    </li>
                  </ul>
                  <div className="important_note">
                    The tag must be successfully installed in order to be able
                    to launch your experience and track success.
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <header>
                <h3
                  id="google-tag-manager-launching"
                  className="section-subtitle"
                >
                  <span className="anchor">Launching</span>
                </h3>
                <p>
                  Once the is <span className="yvtag">YV TAG</span> running on
                  your site, you need to add the{" "}
                  <span className="embedcodetag">Embed Code</span> into the html
                  of the pages you want your virtual tour to display on. Your
                  virtual tour can be embedded in multiple locations per page,
                  on multiple pages, and there are two ways to launch the
                  virtual tour on your website:
                </p>
              </header>
              <div className="group_content">
                <div className="content">
                  <h4>Immersive Banner</h4>
                  {stops[0]}
                  <ul className="embed_steps">
                    <li>
                      <div className="step_content">
                        Write text on the page where you’d like the immersive
                        banner to display – Ex: “Virtual Tour”
                      </div>
                    </li>
                    <li>
                      <div className="step_content">
                        Hyperlink the text on your page to the below{" "}
                        <span className="embedcodetag">Embed Code</span> URL:
                      </div>
                      <PrismCode
                        code={`
                      <a alt="Launch Experience" href="https://www.youvisit.com/#/vte/?data-platform=v&data-link-type=immersive&data-inst=${datum.inst_id}&data-image-width=100%&data-image-height=100%&">Launch Experience</a>
                      `}
                        language="html"
                      />
                    </li>
                    <li>
                      <div className="step_content">
                        Done. Now the tag will search the page, see the link,
                        and transform it into an immersive banner
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="group">
              <header>
                <h3
                  id="google-tag-manager-tracking-success"
                  className="section-subtitle"
                >
                  <span className="anchor">Tracking Success</span>
                </h3>
                <p>
                  Once the <span className="yvtag">YV TAG</span> is running on
                  your site and you’ve successfully launched your virtual tour,
                  you will want to track the success via the Success Tag.
                </p>
              </header>
              <div className="group_content">
                <div className="content">
                  <h4>Required Items</h4>
                  <ul className="embed_steps">
                    <li>
                      <div className="step_content">
                        <span className="successcode">Success Code</span> script
                      </div>
                    </li>
                    <li>
                      <div className="step_content">
                        URL’s for CTA targets (typically a form) – EX: URL of
                        “thank you” page
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="content">
                  <h4>Login to GTM</h4>
                  <ul className="embed_steps">
                    <li>
                      <div className="step_content">
                        <a
                          href="https://tagmanager.google.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          https://tagmanager.google.com
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="content">
                  <h4>Create a tag in GTM</h4>
                  <p>Workspace &gt; Tags &gt; New &gt; Custom HTML</p>

                  <ul className="embed_steps">
                    <li>
                      <div className="step_content">
                        Add a title to the tag – Ex: “Virtual Tour Success”
                      </div>
                    </li>
                    <li>
                      <div className="step_content">Tag Configuration</div>
                      <PrismCode
                        code={`
<script>
    var yv_launch_success=true, yv_instid=123, yv_locid=123;
</script>
<script src="https://www.youvisit.com/tour/Success/js3"></script>
                      `}
                        language="html"
                      />
                      <div className="important_note">
                        Paste the provided script tag into the HTML text area:
                      </div>
                    </li>
                    <li>
                      <div className="step_content">Triggering</div>
                      <div className="important_note">
                        Add the URLs of pages that you have deemed a ‘success’
                        or a conversion - EX: “Schedule campus visit”
                        confirmation page
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Wrapper Centered */}
        </section>

        <section className="directly_on_website">
          <div className="wrapper centered">
            <h2 id="additional-embed-codes" className="section-title">
              Additional Embed Codes
            </h2>
            <div className="group">
              <header>
                <p>
                  You can embed your Virtual Tour to launch directly into
                  specific scenes. Using the same installation methods outlined
                  in this document, alter the code with custom location id’s to
                  launch directly into the destination relevant to the page it
                  lives on.{" "}
                </p>
              </header>
              <div className="group_content">
                <div className="content">
                  <h4>Example</h4>
                  <p>
                    For example, embed your tour so that it launches directly
                    into your “Music Program” destination from your Music
                    Program page.
                  </p>
                </div>
                <div className="content">
                  <h4>Embed Codes</h4>
                  <p>
                    See custom <span className="embedcodetag">Embed Codes</span>{" "}
                    for each Destination on your virtual tour below.
                  </p>
                  <div className="additional-embed-codes">
                    <table>
                      <thead>
                        <tr>
                          <th>Destination Name</th>
                          <th>Immersive Banner</th>
                          <th>Hyperlink</th>
                        </tr>
                      </thead>
                      <tbody>{stopsCodes}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Wrapper Centered */}
        </section>
      </div>
    </LayoutInstructions>
  );
};

export default InstructionsPage;
