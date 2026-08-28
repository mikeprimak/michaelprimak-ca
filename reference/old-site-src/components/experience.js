import React from 'react'
import IMAGES from '../images/index.js'

function Experience(props) {
   
   
    return (
        

<section id="experience"  ref={props.refExperience}>
        <p className="section__text__p1">Explore My</p>
        <h1 className="title">Experience</h1>
        <div className="experience-details-container">
          <div className="about-containers">
            <div className="details-container">
              <h2 className="experience-sub-title">Frontend Development</h2>
              <div className="article-container">
                <article>
                  <img
                    src={IMAGES.checkmark}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>Javascript</h3>
                    <p>Experienced</p>
                  </div>
                </article>
                <article>
                  <img
                    src={IMAGES.checkmark}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>React</h3>
                    <p>Intermediate</p>
                  </div>
                </article>
                <article>
                  <img
                    src={IMAGES.checkmark}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>SQL</h3>
                    <p>Experienced</p>
                  </div>
                </article>
                <article>
                  <img
                    src={IMAGES.checkmark}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>Wordpress</h3>
                    <p>Intermediate</p>
                  </div>
                </article>
                <article>
                  <img
                    src={IMAGES.checkmark}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>CSS</h3>
                    <p>Experienced</p>
                  </div>
                </article>
                <article>
                  <img
                    src={IMAGES.checkmark}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>Git</h3>
                    <p>Intermediate</p>
                  </div>
                  
                </article>
                

              </div>
            </div>
            <div className="details-container">
              <h2 className="experience-sub-title">Backend Development</h2>
              <div className="article-container">
                <article>
                  <img
                    src={IMAGES.checkmark}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>Python</h3>
                    <p>Intermediate</p>
                  </div>
                </article>

                <article>
                  <img
                    src={IMAGES.checkmark}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>MySQL</h3>
                    <p>Experienced</p>
                  </div>
                </article>

                <article>
                  <img
                    src={IMAGES.checkmark}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>PHP </h3>
                    <p>Intermediate</p>
                  </div>
                </article>

                <article>
                  <img
                    src={IMAGES.checkmark}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>Node JS</h3>
                    <p>Intermediate</p>
                  </div>
                </article>

                
                <article>
                  <img
                    src={IMAGES.checkmark}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>Scraping</h3>
                    <p>Intermediate</p>
                  </div>
                  
                </article>

                <article>
                  <img
                    src={IMAGES.checkmark}
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>Analytics</h3>
                    <p>Intermediate</p>
                  </div>
                  
                </article>


              </div>
            </div>
          </div>
        </div>
        <img
          src={IMAGES.arrow}
          alt="Arrow icon"
          className="icon arrow"
          onClick={props.goToProjects}
        />
      </section>


    )
}

export default Experience
