import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { AdminContext } from "../../context/AdminContext";

const TutorsList = () => {
  const { tutors, getAllTutors, aToken, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      // console.log(tutors);
      getAllTutors();
    }
  }, [aToken]);

  return (
    <div className="px-2 sm:px-8 py-12 m-2 h-[98vh] rounded-xl overflow-y-scroll lg:w-11/12">
      {/* Container */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tutors?.map((tutor, i) => (
          <div key={i} className="rounded-xl overflow-hidden relative group">
            <div>
              <img src={tutor.image} alt="" className="overflow-hidden" />
              <div className="absolute inset-0 bg-black/15"></div>
            </div>
            <div className="p-3 absolute bottom-0 text-white group-hover:hidden">
              <span className="flex items-baseline gap-x-1 text-xs">
                {tutor.available ? (
                  <div className="flex items-center gap-2">
                    <p className="min-w-2.5 h-2.5 rounded-full bg-green-500"></p>
                    <span>Available</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="min-w-2.5 h-2.5 rounded-full bg-red-500"></p>
                    <span>Unavailable</span>
                  </div>
                )}
              </span>
              <h5 className="h5">{tutor.name}</h5>
              <p className="text-white/80">{tutor.subject}</p>
            </div>
            <div className="absolute inset-0 flex items-end bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 z-10">
              <div className="flex flex-col w-full gap-2 p-4">
                <button
                  onClick={() => changeAvailability(tutor._id)}
                  className="btn-white !font-bold !text-xs !p-2"
                >
                  Switch Availability
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorsList;
