import React from 'react';
import './AboutContainer.scss';

const About = props => {
  return (
      <div>
        <div className="row">
          <div className="col-sm-8">
            <h1>Boring back story</h1>
            <p>
              In a former life I was a music teacher. Often times I found my students, even ones as old as high school
              age wouldn't know how to read music. Instead of learning note names they would memorize the corresponding
              fingering on their respective instruments. While this was fine for educators focused on performances, for
              those of us attempting to create life-long musicians it was problematic.
            </p>
            <p>
              Inspired by the memory of <em>Mad Minute Math</em> worksheets that filled my elementary years during the
              mid to late eighties, I set out to create similar worksheets for learning music notes. At first I created
              them by hand. This quickly became tedious and time consuming. I had enough experience with HTML at the
              time to layout a basic web app, I just didn't have the skillset at the time to create a system that would
              randomly pick notes and show them on a page. I asked an acquaintance that just happened to be a programmer
              to help finish the parts of the app that I couldn't. <em>Mad Minute Music</em> was born. I used the site
              for a while, until I stopped teaching, and then almost completely forgot about it.
            </p>
            <p>
              Several years later someone contacted me on Facebook, they were actually using the tool for their
              students. I was inspired. Now that I have the skillset to tackle a project like this on my own, I have
              picked it back up and completely re-written it, that is what you find here: <em>Mad Minute Music 2</em>.
            </p>
          </div>
          <div className="col-sm-4">
            <h1>Find Me</h1>
            <ul>
              <li>
                <a className="btn btn-small btn-primary" href="https://twitter.com/smykes">
                    <i className="fab fa-twitter-square"></i> Follow Me
                </a>
              </li>
              <li>
                <a className="btn btn-small btn-primary" href="http://www.linkedin.com/pub/jeff-smykil/8/940/7b0">
                    <i className="fab fa-linkedin"></i> Linked In
                </a>
              </li>
              <li>
                <a className="btn btn-small btn-primary" href="https://www.facebook.com/jeff.smykil">
                    <i className="fab fa-facebook-square"></i> Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default About;
