import React from 'react'

function Footer(props) {
    return (
        
<footer>
        <nav>
          <div className="nav-links-container">
            <ul className="nav-links">
            
            <li onClick={props.goToAbout}>About Me</li>
            {/* <li onClick={props.goToExperience}>Experience</li> */}
            <li onClick={props.goToProjects}>Projects</li>
            <li onClick={props.goToContact}>Contact</li>
              
              {/* <li><a href="#about">About</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li> */}

            </ul>
          </div>
        </nav>
        <p>Copyright &#169; 2023 Mike Primak. All Rights Reserved.</p>
      </footer>

    )
}

export default Footer
