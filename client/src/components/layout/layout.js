import React from "react";
import Header from "./header";
import Footer from "./footer";


function Layout({ children }) {
  return (
    <div>
    
      <Header></Header>
      <main style={{ height: "77.5vh" }} className="overflow-auto">{children}</main>

      <Footer></Footer>
    </div>
  );
}

export default Layout;
