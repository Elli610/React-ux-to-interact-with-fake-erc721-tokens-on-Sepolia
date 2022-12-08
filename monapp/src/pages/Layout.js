import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/chain-info">Chain Info</Link>
          </li>
          <li>
            <Link to="/fakeBayc">Fake BAYC</Link>
          </li>
          <li>
            <Link to="/FakeBaycTokenInfo">Fake BAYC Token Info</Link>
          </li>
          <li>
            <Link to="/fakeNefturians">Fake Nefturians</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;