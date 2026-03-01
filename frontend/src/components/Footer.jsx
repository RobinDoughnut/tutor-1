import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="max-padd-container bg-gray-900 text-white py-10">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8">
        {/* ABOUT SECTION */}
        <div className="max-w-sm">
          {/* logo */}
          <Link to={"/"} className="bold-24 flex-1 flex mb-4">
            <span className="inline-flex">
              <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-tertiary -rotate-[31deg] rounded-full">
                P
              </span>
              rimeTutor
            </span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            We connect students with certified online tutors from around the
            globe. Whether you’re preparing for exams or mastering new skills,
            our platform helps you learn with confidence.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="h4 mb-4">Explore</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/tutors" className="hover:text-white transition">
                Tutors
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* CONTACT SECTION */}
        <div>
          <h4 className="h4 mb-4">Get in Touch</h4>
          <p className="text-gray-400 text-sm">+92-000-000-000</p>
          <p className="text-gray-400 text-sm">support@primetutors.com</p>
        </div>
      </div>
      <hr className="border-none h-[1px] bg-white/50 mt-12" />
      <div className="mt-10 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} primetutors. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
