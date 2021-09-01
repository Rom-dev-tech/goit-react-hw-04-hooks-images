import React from 'react';
import '../AboutAppInfo/AboutAppInfo.scss';

const AboutAppInfo = () => {
  return (
    <div className="about">
      <h2 className="about__title">About this API</h2>
      <p className="about__description">
        Good day, my friend! I wanted to tell you a little bit about this app.
        This application for searching images by search word. To start using,
        enter the text in the search. To loade more images, you will see a
        button to loade more. If no images are displayed for your request, you
        will see notifications. Re-enter your request. When you enter a blank
        value in the search field, you will also see a notification. You can
        also download in your Device the image you like. I wish you a pleasant
        use. Thank you for reading this information to the end!
      </p>

      <a className="anchor__link" href="#anchor">
        Get Start
      </a>
    </div>
  );
};

export default AboutAppInfo;
