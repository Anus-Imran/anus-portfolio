import { About, Contact, Experience, Feedbacks, Hero, Tech, Works, StarsCanvas, Divider, Education, Navbar } from './index';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="bg-[url('/src/assets/herobg.png')] bg-cover bg-no-repeat bg-center min-h-screen w-full flex flex-col justify-between items-center relative z-10">
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
                <StarsCanvas />
            </div>
        </>
    );
};

export default HomePage;