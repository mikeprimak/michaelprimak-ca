import { useState, useRef, useEffect } from 'react'



const Navbar = (props) => {
  
  console.log(props)
  const refOne = useRef(null);
  const refTwo = useRef(null);
  
  
  // const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    
    let newNavValue = (!props.showNavbar)

    props.setShowNavbar(!props.showNavbar)
    alternateClickHandler(newNavValue)
    
    
  }

const alternateClickHandler = (newNavValue) => {
  console.log(props.showNavbar) 
if(newNavValue === true){
  document.addEventListener("click", handleClick, true)
  
}

}


  const handleClick = (e) => {
    console.log('clicked...' + e.target.className)
    if((!refOne.current.contains(e.target)) && ((!refTwo.current.contains(e.target)))){
      // click was outside menu and also was not on the hamburger icon.
      props.setShowNavbar(false)
      document.removeEventListener("click", handleClick, true) 
      console.log("removed event listener")
      console.log("click was outside menu")  
    }

    }





  return (
    <nav className="navbar">
      
        
        <div className="logo">Mike Primak</div>
        
        
          
        <div ref={refTwo} className="hamburger-icon" onClick={handleShowNavbar}>
             <span></span>
             <span></span>
             <span></span>
           </div>


        <div ref={refOne} className={`nav-elements  ${props.showNavbar && 'active'}`}>
          <ul>
          <li onClick={props.goToAbout}>About Me</li>
          {/* <li onClick={props.goToExperience}>Experience</li> */}
          <li onClick={props.goToProjects}>Projects</li>
          <li onClick={props.goToContact}>Contact</li>
          </ul>
        </div>

    </nav>
  )
}

export default Navbar



// import React, {useState} from 'react'

// function Navbar(props) {

//   const [showNavbar, setShowNavbar] = useState(false)

//   const handleShowNavbar = () => {
//     setShowNavbar(!showNavbar)
    
//   }

//     return (
//         <>
//         <nav id="desktop-nav">
//         <div className="logo">Mike Primak</div>
//         <div>
//           <ul className="nav-links">
//             <li onClick={props.goToAbout}>About</li>
//             <li onClick={props.goToExperience}>Experience</li>
//             <li onClick={props.goToProjects}>Projects</li>
//             <li onClick={props.goToContact}>Contact</li>
//           </ul>
//         </div>
//       </nav>
//       <nav id="hamburger-nav">
//         <div className="logo">Mike Primak</div>
//         <div className="hamburger-menu">
//           <div className="hamburger-icon" onClick={handleShowNavbar}>
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//           <div className={`menu-links  ${showNavbar && 'active'}`}>
//             <li><a href="#about" onclick={handleShowNavbar}>About</a></li>
//             <li><a href="#experience" onclick={handleShowNavbar}>Experience</a></li>
//             <li><a href="#projects" onclick={handleShowNavbar}>Projects</a></li>
//             <li><a href="#contact" onclick={handleShowNavbar}>Contact</a></li>
//           </div>
//         </div>
//       </nav>
//       </>
    
//     )
// }

// export default Navbar
