import { Link } from "react-router-dom";
import bannerImg from "../assets/banner.png";

const hero1 =
  "https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const hero2 =
  "https://images.unsplash.com/photo-1665569102899-be105a0bb5f3?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const hero3 =
  "https://images.unsplash.com/photo-1598618443855-232ee0f819f6?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const hero4 =
  "https://images.unsplash.com/photo-1657630399502-c56a39bed97a?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const carouselImages = [hero1, hero2, hero3, hero4];
const Hero = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl ">
          New Releases This Week{" "}
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8">
          Its time to update your reading list with some of the latest and most
          exciting releases in the world. From heart pumping thrillers, romantic
          escapades and memoirs, this week's new releases offer something for
          everyone.
        </p>
        <div className="mt-10 ">
          <Link to="products" className="btn btn-primary ">
            Subscribe
          </Link>
        </div>
      </div>
      <div className="hidden  h-[28rem] lg:carousel carousel-center   p-4 space-x-4 bg-neutral rounded-box">
        {carouselImages.map((image, index) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                className="rounded-box h-full w-80  object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Hero;
