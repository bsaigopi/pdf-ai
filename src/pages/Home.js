import LandingSection from './Landing';
import Tools from './Tools';
import AiPdfChat from './AiPdfChat';

const Home = () => {
  return (
    <>
      <section id="landing">
        <LandingSection />
      </section>


      <section id="tools">
        <Tools />
      </section>

      <section id="aiPdfChat">
        <AiPdfChat />
      </section>




    </>
  );
};

export default Home;
