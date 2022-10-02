import { Outlet } from "react-router-dom";
import Header from "../header/header";
import "./layout.scss";

function Layout(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="main-wrapper">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
