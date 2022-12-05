import { Outlet, Link } from "react-router-dom";

import "./menu.css";

export default function Root() {
  /*
  return (
    <div className="menu">
      <div className="HomePage">
        <a href="/">Home</a>
      </div>
      <div className="edit">
        <div class="container text-center">
          <a href="edit/">Edit </a>
        </div>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </div>
  );
}

*/
  return (
    <>
      <h1>Menu</h1>

      <br></br>
      <a href="/">Home</a>
      <br></br>
      <a href="edit/">Edit </a>

      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
