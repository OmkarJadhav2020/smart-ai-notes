import {useState } from "react";

const WelcomeModal = () => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm transition-all duration-300 ease-in-out">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-2xl relative w-11/12 md:w-2/3 lg:w-1/2">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-2xl font-bold text-white hover:text-red-400 transition-colors duration-200"
            >
              &times;
            </button>

            <div className="flex flex-col items-center">
              {/* Modal Title */}
              <h2 className="text-2xl font-bold mb-4 text-center">
                Welcome to Aura Notes
              </h2>

              {/* Video Display */}
              <video
                className="w-full h-auto rounded-lg shadow-lg border border-gray-700"
                autoPlay={true}
                muted={true}
                loop={true}
              >
                <source src="/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Message Below the Video */}
              <p className="mt-4 text-sm md:text-base text-gray-400 text-center">
                Watch the quick intro video to learn more about our prodcut! <br />
                Note : Better viewed at device with large screen.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WelcomeModal;
