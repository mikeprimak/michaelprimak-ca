import React from 'react'
import IMAGES from '../images/index.js'

function About(props) {
    
    return (
        
<section id="about" ref={props.refAbout}>
        <p className="section__text__p1">Get To Know More</p>
        <h1 className="title">About Me</h1>
        <div className="section-container">
          <div className="section__pic-container secondary-pic">
            <img
              src={IMAGES.mikeAndDaughter}
              alt="Profile picture"
              className="about-pic"
            />
            
          </div>
          <div className="about-details-container">
            <div className="about-containers">
              <div className="details-container">
                <img
                  src={IMAGES.experience}
                  alt="Experience icon"
                  className="icon"
                />
                <h3>Experience</h3>
                <br/>
                <p>6+ Years Web Development</p>
              </div>
              <div className="details-container">
                <img
                  src={IMAGES.education}
                  alt="Education icon"
                  className="icon"
                />
                <h3>Education</h3>
                <br/>
                <p>College Diploma - Data Analytics
                  <br />
                  College Diploma - Osteopathy
                  <br />
                  Bachelors Degree - Human Kinetics
                </p>
              </div>
            </div>
            <div className="text-container">
              <p>

                I’m a talented web developer looking to help companies improve their web presence. 
                I can build new from scratch or upgrade your existing project. 
                I can design, advise and code your business' perfect website.
                I work well as a solo advisor or as a member of a developer team. 

              </p>
              <br />
              <p>
                I have worked for software companies in developer roles and coordinator roles - so I have experience writing the code and managing a team.
                I have experience with a wide variety of projects and technologies, so I will be comfortable with any technology you require.
                My core competencies include basic business websites, interactive web-apps, web-scrapers, APIs,
                data analysis and more. I am confident I can be the developer your team needs.

              </p>
              
            </div>
          </div>
        </div>
        <img
          src={IMAGES.arrow}
          alt="Arrow icon"
          className="icon arrow"
          onClick={props.goToProjects}
          // onClick={props.goToExperience}
        />
      </section>

        
    )
}

export default About



