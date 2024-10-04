import FeaturedJob from "./Components/FeaturedJobs";
import TopCompany from "./Components/TopCompany";
import Testmonial from "./Components/Testimonial";
import BottomPanel from "./Components/BottomPanel";
import Footer from "../../Component/Footer";
import LandingSection from "./Components/LandingSection";
const Home = () => {

	return (
		<>
			<main>
				<LandingSection />
				<FeaturedJob />
				<TopCompany />
				<Testmonial />
				<BottomPanel />
			</main>
			<Footer />
		</>

	)
}

export default Home;