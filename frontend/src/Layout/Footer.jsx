const Footer = () => {
  return (
    <footer className="  text-textColor pt-10 bg-richBlack ">
      <div className=" pb-10  ">
        <div className="flex justify-center content-center text-center items-center py-2">
          <div className="flex-grow h-0.5 bg-textColor ml-[13%]"></div>
          <div className="mx-4">
            <a href="#home">
              <h1 className="text-textColor font-inter text-3xl">FinTrack</h1>
            </a>
          </div>
          <div className="flex-grow h-0.5 bg-textColor mr-[13%]"></div>
        </div>
        <div className="flex gap-6 justify-center items-center mt-8 ">
          <div className=" flex justify-center items-center  w-10 h-10 smallest:w-12 smallest:h-12 bg-black hover:bg-lightGreen  rounded-full cursor-pointer">
            <img
              width={30}
              className="h-auto"
              src="/socialMedia/darkinstagram.svg"
              alt="Loading Img"
            />
          </div>
          <div className="flex justify-center items-center w-10 h-10 smallest:w-12 smallest:h-12 bg-black hover:bg-lightGreen  rounded-full cursor-pointer">
            <img
              width={30}
              className="h-auto"
              src="/socialMedia/darkfacebook.svg"
              alt="Loading Img"
            />
          </div>
          <div className=" flex justify-center items-center  w-10 h-10 smallest:w-12 smallest:h-12 bg-black hover:bg-lightGreen  rounded-full cursor-pointer">
            <img
              width={30}
              className="h-auto"
              src="/socialMedia/darktwitter.svg"
              alt="Loading Img"
            />
          </div>
        </div>
        <div className="mt-8 leading-[1.70] flex justify-center items-center text-center  text-base max-galaxyFold:px-5 px-10 lg:px-20">
          <div className="max-w-6xl">
            <span className="font-semibold max-sm:text-lg sm:text-xl font-inter">
              © 2025 FinTrack.com All rights reserved.
            </span>

            <p className="mt-4 text-base sm:max-md:text-lg lg:text-lg font-roboto">
              The content and imgs used on this site are copyright protected and
              copyrights vests with the respective owners. The usage of the
              content and imgs on this website is intended to promote the works
              and no endorsement of the artist shall be implied. Unauthorized
              use is prohibited and punishable by law.
            </p>
          </div>
        </div>
      </div>
      <hr className=" h-[2px] " />
      <div className="font-roboto flex max-sm:flex-col justify-between p-4 px-10 lg:px-20  min-[2000px]:mx-auto min-[2000px]:max-w-[100rem] text-center">
        <div className="flex flex-col md:flex-row md:space-x-4 max-md:space-y-2">
          <p>info@FinTrack.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4 max-md:space-y-2">
          <p> Privacy Policy </p>
          <p>Terms of use</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
