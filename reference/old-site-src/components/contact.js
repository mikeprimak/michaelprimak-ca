
import React from 'react'
import IMAGES from '../images/index.js'

function Contact(props) {
    return (
    
<section id="contact"  ref={props.refContact}>
        <p className="section__text__p1">Get in Touch</p>
        <h1 className="title">Contact Me</h1>
        <div className="contact-info-upper-container">
          <div className="contact-info-container">
            <img
              src={IMAGES.email}
              alt="Email icon"
              className="icon contact-icon email-icon"
            />
            <p><a href="mailto:michaelsprimak@gmail.com">michaelsprimak@gmail.com</a></p>
          </div>
          <div className="contact-info-container">
            <img
              src={IMAGES.linkedin}
              alt="LinkedIn icon"
              className="icon contact-icon"
            />
            <p><a href="https://www.linkedin.com/in/michael-primak/" target="_blank">LinkedIn</a></p>
          </div>
      
        </div>
        
      </section>


    )
}

export default Contact
