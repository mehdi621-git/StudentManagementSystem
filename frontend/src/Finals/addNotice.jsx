import React, { useContext, useState } from "react";
import { Context } from "../context";

const AddNotice= () => {
  const [isOpen, setIsOpen] = useState(false);
  const [headline, setHeadline] = useState("");
  const [text, setText] = useState("");
  const {NoticeOverlay,setNoticeOverlay} =useContext(Context)
console.log(NoticeOverlay)
  const toggleOverlay = () => {
    setNoticeOverlay(!NoticeOverlay)
  };
console.log(true)
  return (
<>  
      {NoticeOverlay &&(
        <div className="fixed inset-0 flex items-center z-50 justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            {/* Close Button */}
            <button
              onClick={toggleOverlay}
              className="text-red-500 float-right text-xl font-bold"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">Enter Details</h2>
            <form>
              {/* Headline Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter headline"
                />
              </div>

              {/* Text Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Text
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-3 py-2 border resize-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter text"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={() => {
                  console.log({ headline, text });
                  toggleOverlay();
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
              >
                Share
              </button>
            </form>
          </div>
        </div>
      )}
</>
  );
};

export default AddNotice;

