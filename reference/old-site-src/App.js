import './App.css';
import './script.js';

import { useRef, useState } from 'react';
import { HashRouter } from 'react-router-dom'
import About from './components/about.js'
import Experience from './components/experience.js'
import Profile from './components/profile.js'
import Projects from './components/projects.js'
import Contact from './components/contact.js'
import Navbar from './components/navbar.js'
import Footer from './components/footer.js'




function App() {



  const [showNavbar, setShowNavbar] = useState(false)

  const refProfile = useRef(null);
  const refAbout = useRef(null);
  const refExperience = useRef(null);
  const refProjects = useRef(null);
  const refContact = useRef(null);
  
  const scrollFunction = (scrollToTarget) => {
    scrollToTarget.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const goToAbout = () => {
    scrollFunction(refAbout)
    setShowNavbar(false)
  };

  const goToExperience = () => {
    scrollFunction(refExperience)
    setShowNavbar(false)
  };

  const goToProjects = () => {
    scrollFunction(refProjects)
    setShowNavbar(false)
  };


  const goToContact = () => {
    
    scrollFunction(refContact)
    setShowNavbar(false)
    return false;
  };

  
  const goToProfile = () => {
    scrollFunction(refContact)
    setShowNavbar(false)
  };





  return (




    <>

      

      
      <HashRouter>
   
      <Navbar showNavbar={showNavbar} setShowNavbar={setShowNavbar} goToAbout={goToAbout} goToExperience={goToExperience} goToProjects={goToProjects} goToContact={goToContact}/>
      
      <Profile  refProfile={refProfile} goToAbout={goToAbout} goToContact={goToContact}/>

      
      <About refAbout={refAbout} goToExperience={goToExperience} goToProjects={goToProjects}/>

      {/* <Experience refExperience={refExperience} goToProjects={goToProjects} /> */}


      <Projects refProjects={refProjects} goToContact={goToContact} />

      <Contact refContact={refContact} goToProfile={goToProfile}/>

      <Footer goToAbout={goToAbout} goToExperience={goToExperience} goToProjects={goToProjects} goToContact={goToContact} />
      </HashRouter>

     


    </>




  );
}

export default App;
