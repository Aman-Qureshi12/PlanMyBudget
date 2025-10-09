import { useState } from "react";
import HeroImage from "/public/dashboardImage.png";
import Alex from "/public/reviewer/Alex.png";
import David from "/public/reviewer/David.png";
import Maria from "/public/reviewer/Maria.png";
import Sam from "/public/reviewer/Sam.png";
import Sarah from "/public/reviewer/Sarah.png";
import quote from "/public/quote.png";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import { motion } from "motion/react";

const LandingPage = () => {
  const [reviewers, setReviewers] = useState({
    reviewerId: 3,
  });
  const reviews = [
    {
      id: 1,
      img: Alex,
      name: "Alex",
      review:
        "FinTrack has completely changed the way I manage my money. Tracking income from multiple clients and keeping my expenses in check is now so easy!",
    },
    {
      id: 2,
      img: Maria,
      name: "Maria",
      review:
        "I love how everything is in one place—expenses, income, and even my insurance policies. The renewal reminders are a lifesaver!",
    },
    {
      id: 3,
      img: David,
      name: "David ",
      review:
        "The reports and charts give me a clear picture of where my money goes. FinTrack has helped me cut unnecessary spending and save more.",
    },
    {
      id: 4,
      img: Sarah,
      name: "Sarah",
      review:
        "As a student, budgeting was always tough. With FinTrack, I can set limits and actually stick to them. The dashboard is super easy to use.",
    },
    {
      id: 5,
      img: Sam,
      name: "Sam",
      review:
        "Managing family expenses used to be messy, but FinTrack makes it simple. I can track household spending and keep all our insurance details organized.",
    },
  ];
  return (
    <main className=" bg-[#121010] text-textColor min-[2000px]:mx-auto min-[2000px]:max-w-[100rem]">
      <NavBar />
      {/* Hero section  */}
      <section
        className="max-sm:px-5 sm:px-20 pt-32 sm:pt-48 text-center "
        id="home"
      >
        <motion.h1
          className="max-sm:text-2xl sm:text-4xl lg:text-5xl font-inter"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Take Control of Your Finances with Ease
        </motion.h1>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-sm sm:text-xl pt-6 font-roboto sm:max-w-md max-sm:max-w-xs">
            Track your income, manage expenses, and stay on top of your
            insurance — all in one with FinTrack.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <img
            src={HeroImage}
            alt="DashBoard"
            className="rounded-sm lg:w-[80%] shadow-2xl shadow-textColor"
          />
        </motion.div>
      </section>

      {/* About Us Section */}
      <section className="pt-36 max-sm:px-5 max-md:px-10 md:px-20" id="about">
        <motion.h1
          className="text-3xl text-center font-inter"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          About us
        </motion.h1>

        <motion.p
          className="max-sm:text-base sm:text-xl pt-3 text-center font-roboto leading-8"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          At FinTrack, we believe managing money should be simple, stress-free,
          and accessible to everyone. Our platform helps you track your income,
          monitor expenses, and keep your insurance details organized—all in one
          place. Designed with ease of use and security in mind, FinTrack gives
          you clear insights into your financial habits so you can make smarter
          decisions for a stronger financial future.
        </motion.p>
      </section>

      {/* Why Choose Us Section */}
      <section
        id="choose-us"
        className="pt-36 max-sm:px-5 max-md:px-10 md:px-20 flex flex-col justify-center"
      >
        <motion.h1
          className="text-3xl text-center font-inter"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Why Choose Us
        </motion.h1>

        <div className="max-lg:flex  max-lg:overflow-x-auto gap-5 ">
          <motion.div
            className="flex  max-lg:gap-5 lg:justify-between pt-10 font-roboto min-h-[190px]"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-textColor text-richBlack rounded-xs px-4 py-4 w-sm">
              <h3 className="text-xl">All-in-One Management</h3>
              <p className="max-w-md pt-3">
                Track income, expenses, and insurance together in a single,
                easy-to-use platform.
              </p>
            </div>
            <div className="bg-textColor text-richBlack rounded-xs px-4 py-4 w-sm">
              <h3 className="text-xl">Smart Insights</h3>
              <p className="max-w-md pt-3 ">
                Get clear charts and reports that help you understand and
                improve your financial habits.
              </p>
            </div>
            <div className="lg:hidden bg-textColor text-richBlack rounded-xs px-4 py-4 w-sm">
              <h3 className="text-xl">Secure & Private</h3>
              <p className="max-w-md pt-3 ">
                Your financial data is protected with bank-level security and
                encryption.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:flex  justify-center items-center pt-10 "
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-textColor text-richBlack rounded-xs px-4 py-4 w-sm">
              <h3 className="text-xl">Secure & Private</h3>
              <p className="max-w-md pt-3 ">
                Your financial data is protected with bank-level security and
                encryption.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex max-lg:gap-5 lg:justify-between pt-10"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-textColor text-richBlack rounded-xs px-4 py-4 w-sm">
              <h3 className="text-xl">User-Friendly Experience</h3>
              <p className="max-w-md pt-3">
                Simple design built for everyone, whether you`re just starting
                or already managing multiple accounts.
              </p>
            </div>
            <div className="bg-textColor text-richBlack rounded-xs px-4 py-4 w-sm">
              <h3 className="text-xl">Insurance Renewal Reminders.</h3>
              <p className="max-w-md pt-3">
                Never miss a renewal with timely alerts for your policies.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Testimonial section  */}
      <section
        id="testimonial"
        className="max-sm:px-5 max-md:px-10 md:px-20 pt-36 pb-32"
      >
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-inter"
        >
          Testimonials
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col items-center justify-center"
        >
          {reviews
            .filter((review) => review.id === reviewers.reviewerId)
            .map((review) => (
              <div
                key={review.id}
                className="rounded-md border border-textColor px-10 py-8 max-w-5xl md:max-w-full"
              >
                <div className="mb-4 flex justify-center">
                  <img src={quote} alt="quote" className="h-auto w-10 sm:w-8" />
                </div>

                <motion.div
                  key={reviewers.reviewerId}
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center"
                >
                  <p className="pt-8 text-center max-w-4xl text-xl font-roboto">
                    {review.review}
                  </p>
                  <p className="mt-4 font-medium text-lg font-inter">
                    {review.name}
                  </p>
                </motion.div>
              </div>
            ))}

          {/* Reviewer images */}
          <div className="flex items-center justify-center gap-5 pt-12 text-center">
            {reviews?.map((review) => (
              <div
                key={review.id}
                className={`${
                  reviewers.reviewerId === review.id
                    ? "opacity-100"
                    : "opacity-30"
                } cursor-pointer`}
              >
                <motion.img
                  whileTap={{ scale: 0.9 }}
                  src={review.img}
                  alt="No Image"
                  onClick={() => setReviewers({ reviewerId: review.id })}
                  className={`rounded-full h-10 w-10 transition-all ${
                    reviewers.reviewerId === review.id ? "h-12 w-12" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default LandingPage;
