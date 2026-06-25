import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <ul className="contact-desc">
              <li>
                <a
                  href="https://www.linkedin.com/in/mohd98zaid/"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                >
                  LinkedIn - mohd98zaid
                </a>
              </li>
            </ul>
            <h4>Education</h4>
            <ul className="contact-desc">
              <li>
                B.Tech - Computer Science and Engineering <br />
                Dr. APJ Abdul Kalam Technical University, Lucknow - 2015-2019
              </li>
              <li>
                Intermediate - Mathematics <br />
                SSV Inter College, Ayodhya - 2013-2015
              </li>
            </ul>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/mohd98zaid"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/mohd98zaid/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="mailto:mohd98zaid@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              WhatsApp <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Architected &amp; Engineered <br /> by <span>Mohammad Zaid</span>
            </h2>
            <h5>
              <MdCopyright /> {new Date().getFullYear()}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
