import React, { useEffect } from "react";
import Header from "./Header/header";
import Footer from "./Footer/footer";

function Layout({ children }) {
  return (
    <div>
      <Header></Header>
      <main
        style={{ height: "90vh", scrollbarWidth: "none" }}
        className="overflow-auto"
      >
        {children}
      </main>

      <Footer></Footer>
    </div>
  );
}

export default Layout;
