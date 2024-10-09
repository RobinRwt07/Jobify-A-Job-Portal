import { FeaturedJob, LandingSection, TopCompany, Testmonial, BottomPanel, Footer, FeaturedCompanies, HowItWorks } from "./components";

const Home = () => {

	return (
		<>
			<main>
				<LandingSection />
				<FeaturedCompanies />
				<FeaturedJob />
				<TopCompany />
				<HowItWorks />
				<Testmonial />
				<BottomPanel />
			</main>
			<Footer />
		</>

	)
}

export default Home;