import React from "react";
import fb from "../../assets/facebook.png";
import twt from "../../assets/twitter.png";
import gmail from "../../assets/gmail.png";
import wa from "../../assets/WhatsApp_icon.png";
import linkedin from "../../assets/linkedin.png";
import tokokita from "../../assets/tokokita.png";

const FooterDesktop = () => {
  return (
    <div className="hidden lg:grid lg:justify-start lg:relative lg:bottom-0 lg:w-full lg:h-52 lg:bg-green-footer">
      <div className="lg:col-span-2 lg:bg-green-footer lg:w-96 mx-32">
        <div className=" bg-inherit">
          <img src={tokokita} alt="" className="lg:w-52 lg:bg-inherit" />
          <div className="lg:w-6 lg:flex lg:gap-3 lg:mt-3 lg:bg-inherit">
            <img src={fb} alt="" className="lg:bg-inherit" />
            <img src={twt} alt="" className="lg:bg-inherit" />
            <img src={gmail} alt="" className="lg:bg-inherit" />
            <img src={wa} alt="" className="lg:bg-inherit" />
            <img src={linkedin} alt="" className="lg:bg-inherit" />
          </div>
          <div className="lg:bg-inherit lg:mt-3">
            <h1 className="lg:bg-inherit lg:text-xs">Address</h1>
            <h1 className="lg:bg-inherit lg:text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
              vitae est pariatur
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterDesktop;
