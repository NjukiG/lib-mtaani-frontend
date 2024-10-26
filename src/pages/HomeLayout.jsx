import { Outlet, useNavigate } from "react-router-dom";
// import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
const HomeLayout = () => {
  const navigation = useNavigate();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-5">
          <Outlet />
        </section>
      )}
    </>
  );
};
export default HomeLayout;
