import Hero from "../components/Hero";
import News from "../components/News";
import Recomended from "../components/Recomended";
import TopSellers from "../components/TopSellers";

const Landing = () => {
  return (
    <>
      <Hero />
      <br />
      <TopSellers />
      <br />
      <Recomended />
      <br />
      <News />
    </>
  );
};
export default Landing;
