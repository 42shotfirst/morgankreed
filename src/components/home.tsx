import Hero from "./landing/hero";
import Nav from "./landing/nav";
import About from "./landing/about";
import Clients from "./landing/clients";
import Skills from "./landing/skills";
import Experience from "./landing/experience";
import Projects from "./landing/projects";
import Contact from "./landing/contact";

function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1 pt-14">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Clients />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default Home;
