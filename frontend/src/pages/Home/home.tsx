import AdsDisplay from "../AdsDisplay/AdsDisplay";
import HeroSection from "./HeroSection";
import MarathonCategories from "./MarathonCategories";
import HomeRegistration from "./HomeRegistration";
import EventHighlights from "./EventHighlights";
import MarathonGallery from "./MarathonGallery";
import Sponsors from "./Sponsors";


const Home = () => {
  return (
    <>
    <AdsDisplay/>
     <HeroSection/>
     <MarathonCategories/>
    <HomeRegistration/>
     <EventHighlights/>
     <MarathonGallery/>
     <Sponsors/>
    </>
  );
};

export default Home;