import { useState } from "react";
import Alex from "/public/reviewer/Alex.png";
import David from "/public/reviewer/David.png";
import Maria from "/public/reviewer/Maria.png";
import Sam from "/public/reviewer/Sam.png";
import Sarah from "/public/reviewer/Sarah.png";
import quote from "/public/quote.png";
import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";

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
    <main className=" bg-richBlack text-textColor">
      <NavBar />
      {/* Hero section  */}
      <section className="px-20 pt-32 " id="home">
        <h1 className="text-3xl font-inter">
          Take Control of Your Finances with Ease
        </h1>
        <p className="text-xl pt-3 font-roboto">
          Track your income, manage expenses, and stay on top of your insurance
          — all in one with FinTrack.
        </p>
      </section>

      {/* About us section  */}
      <section className="pt-20 px-20" id="about">
        <h1 className="text-3xl text-center font-inter">About us</h1>
        <p className="text-xl pt-3 text-center font-roboto leading-8">
          At FinTrack, we believe managing money should be simple, stress-free,
          and accessible to everyone. Our platform helps you track your income,
          monitor expenses, and keep your insurance details organized—all in one
          place. Designed with ease of use and security in mind, FinTrack gives
          you clear insights into your financial habits so you can make smarter
          decisions for a stronger financial future.
        </p>
      </section>

      {/* why choose us section  */}
      <section
        id="choose-us"
        className="pt-20 px-20 flex flex-col justify-center "
      >
        <h1 className="text-3xl text-center font-inter  ">Why Choose Us</h1>

        <div className="flex justify-between pt-10 font-roboto">
          <div className="bg-textColor text-richBlack rounded-xs px-4 py-4 w-md">
            <h3 className="text-xl">All-in-One Management</h3>
            <p className="max-w-md pt-3">
              Track income, expenses, and insurance together in a single,
              easy-to-use platform.
            </p>
          </div>
          <div className="bg-textColor text-richBlack rounded-xs px-4 py-4 w-md">
            <h3 className="text-xl">Smart Insights</h3>
            <p className="max-w-md pt-3 ">
              Get clear charts and reports that help you understand and improve
              your financial habits.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center pt-10">
          <div className="bg-textColor text-richBlack rounded-xs px-4 py-4 w-md">
            <h3 className="text-xl">Secure & Private</h3>
            <p className="max-w-md pt-3 ">
              Your financial data is protected with bank-level security and
              encryption.
            </p>
          </div>
        </div>

        <div className="flex justify-between pt-10 ">
          <div className="bg-textColor text-richBlack rounded-xs px-4 py-4 w-md">
            <h3 className="text-xl">User-Friendly Experience</h3>
            <p className="max-w-md pt-3">
              Simple design built for everyone, whether you`re just starting or
              already managing multiple accounts.
            </p>
          </div>
          <div className="bg-textColor text-richBlack rounded-xs px-4 py-4 w-md">
            <h3 className="text-xl">Insurance Renewal Reminders.</h3>
            <p className="max-w-md pt-3">
              Never miss a renewal with timely alerts for your policies.
            </p>
          </div>
        </div>
      </section>
      {/* Testimonial section  */}
      <section id="testimonial" className="px-20 pt-20 pb-32">
        <h1 className="text-center text-3xl font-inter">Testimonials</h1>

        <div className="mt-8 flex flex-col items-center justify-center  ">
          {reviews
            .filter((review) => review.id === reviewers.reviewerId)
            .map((review, index) => (
              <div
                key={index}
                className="max-w-5xl rounded-md border border-textColor flex flex-col items-center justify-center px-10 py-8  md:max-w-full "
              >
                <div className="mb-4">
                  <img src={quote} alt="quote" className="h-auto w-10 sm:w-8" />
                </div>
                <p className="pt-8 text-center max-w-4xl text-xl font-roboto">
                  {review.review}
                </p>
                <p className="mt-4 font-medium text-lg font-inter">
                  {review.name}
                </p>
              </div>
            ))}

          <div className="flex items-center justify-center gap-5 pt-12 text-center">
            {reviews?.map((review) => (
              <div
                className={`${
                  reviewers.reviewerId === review.id
                    ? "opacity-100"
                    : "opacity-30"
                } cursor-pointer`}
              >
                <img
                  src={review.img}
                  alt="No Image"
                  onClick={() => setReviewers({ reviewerId: review.id })}
                  className={`rounded-full h-10 w-10  ${
                    reviewers.reviewerId === review.id ? "h-12 w-12 " : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default LandingPage;
