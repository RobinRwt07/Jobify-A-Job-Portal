import LandingSection from "./Components/LandingSection";
import FeaturedJob from "./Components/FeaturedJobs";
import TopCompany from "./Components/TopCompany";
import Testmonial from "./Components/Testimonial";
import BottomPanel from "./Components/BottomPanel";

const Home = () => {
	return (
		<main>
			<LandingSection />
			<FeaturedJob />
			<TopCompany />
			<Testmonial />
			<BottomPanel />
		</main>
	)
}

export default Home;