import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";

function ErrorPage(): JSX.Element {
  return (
    <>
      This page not found!
      <br />
      <Link to={ROUTES.Home}>Go Home</Link>
    </>
  );
}

export default ErrorPage;
