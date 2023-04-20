import React, { useState } from "react";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    // Perform deletion logic here
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete</button>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="bg-white rounded-lg p-8">
              <p>Are you sure you want to delete this item?</p>

              <div className="mt-4 flex justify-end">
                <button
                  className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
