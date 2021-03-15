import React from "react"

import Header from "./Header"
import Footer from "./Footer"

const Layout = props => {
  return (
    <div className="main_container">
      <Header
        title={props.title}
        path={props.path}
        locations={props.locations}
      />
      <div className="instructions">{props.children}</div>
      <Footer />
    </div>
  )
}

export default Layout
