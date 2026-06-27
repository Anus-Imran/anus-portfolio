import { About, Contact, Experience, Feedbacks, Hero, Tech, Works, StarsCanvas, Divider, Education, Navbar } from './index';

const HomePage = () => {
    return (
        <>
            <div className="bg-[url('/src/assets/herobg.png')] bg-cover bg-no-repeat bg-center h-[750px] w-full flex flex-col justify-between items-center">
                <Navbar />
                <Hero />
            </div>
            <Divider />
            <About />
            <Divider />
            <Education />
            <Divider />
            <Experience />
            <Divider />
            <Tech />
            <Divider />
            <Works />
            {/* <Feedbacks /> */}
            <div className="relative z-0">
                <Divider />
                <Contact />
                {/* <StarsCanvas /> */}
            </div>
        </>
    );
};

export default HomePage;