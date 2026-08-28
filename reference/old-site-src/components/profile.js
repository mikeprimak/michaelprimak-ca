import React from 'react'
import IMAGES from '../images/index.js'
import CV from '../files/Michael-Primak-Resume-Cover-Letter-Web-Developer.pdf'

function Profile(props) {
    console.log(props)


    
    return (
        

<section id="profile" ref={props.refProfile}>
        <div className="section-container">
          <div className="section__pic-container">
            <img src={IMAGES.michaelPrimakProfilePic} alt="Mike Primak profile picture" />



          </div>
          <div className="section__text">
            <p className="section__text__p1">Hello, I'm</p>
            <h1 className="title">Mike Primak</h1>
            <p className="section__text__p2">Web Developer</p>
            <p className="section__text__p1">Front-end, Back-end, Wordpress, Data Analytics</p>
            <br/>

            <div className="logos">
              <div className="logos-slide">
                
                <img src={IMAGES.html5Icon} />
                <img src={IMAGES.css3Icon} />
                <img src={IMAGES.javascriptIcon} />
                <img src={IMAGES.wordpressIcon} />
                <img src={IMAGES.reactIcon} />
                <img src={IMAGES.pythonIcon} />
              
             
                

                <img src={IMAGES.sqlIcon} />
                <img src={IMAGES.phpIcon} />
                <img src={IMAGES.bootstrapIcon} />
                <img src={IMAGES.gitIcon} />

              </div>

              <div className="logos-slide">
                
                <img src={IMAGES.html5Icon} />
                <img src={IMAGES.css3Icon} />
                <img src={IMAGES.javascriptIcon} />
                <img src={IMAGES.wordpressIcon} />
                <img src={IMAGES.reactIcon} />
                <img src={IMAGES.pythonIcon} />
                
                
                

                <img src={IMAGES.sqlIcon} />
                <img src={IMAGES.phpIcon} />
                <img src={IMAGES.bootstrapIcon} />
                <img src={IMAGES.gitIcon} />
              </div>
            </div>



            <div className="btn-container">
            <a href={CV} target="_blank">
              <button
                className="btn btn-color-2"
                
              >
                Download CV
              </button>
              </a>
              <button className="btn btn-color-1" onClick={props.goToContact}>
                Contact Info
              </button>
            </div>
            <div id="socials-container">
              <a href="https://linkedin.com/in/michael-primak" target="_blank">
                <img
                  src={IMAGES.linkedin}
                  alt="My LinkedIn profile"
                  className="icon"

                />
              </a>
              <a href='https://github.com/mikeprimak' target="_blank">
                <img
                  src={IMAGES.github}
                  alt="My Github profile"
                  className="icon"
                />
              </a>
            </div>

          </div>
        </div>


        <img
          src={IMAGES.arrow}
          alt="Arrow icon"
          className="icon arrow firstArrow"
          onClick={props.goToAbout}
        />

      </section>



    )
}

export default Profile

