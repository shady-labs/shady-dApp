import HomeHero from "../components/HomeHero";
import TrackSection from "../components/TrackSection";
import ArtistSection from "../components/ArtistSection";
import Header from "../components/Header";
import Footer from "../components/Footer"
import Genres from "../components/Genres";

const HomePage = () => {
	return (
    <div className="grid grid-cols-1 lg:grid-cols-8 min-h-screen max-w-screen pl-2 md:pl-14 lg:pl-12 xl:pl-0 pb-24 pt-10 md:pt-1">
      <div className="col-span-8 pl-0">
        <Header />
        <HomeHero />
        <TrackSection title="New Releases" />
        <ArtistSection />
        <Genres />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
