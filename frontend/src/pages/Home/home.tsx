import AdsDisplay from "../AdsDisplay/AdsDisplay";
import AboutSports from "./About";
import CompetitionCards from "./CompetitionCards";
import HeroSection from "./HeroSection";
import ProcessSteps from "./ProcessSteps";


const Home = () => {
  return (
    <>
    <AdsDisplay/>
     <HeroSection/>
     <AboutSports/>
     <CompetitionCards/>
     <ProcessSteps/>
    </>
  );
};

export default Home;