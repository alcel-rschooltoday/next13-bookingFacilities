"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import Modal from "./Modal";

interface Booking {
  name: string;
  date: Date;
  time: string;
  facility: string;
}
interface EditBookingFormProps {
  id: string;
  name: string;
  date: string; // Assuming 'date' is a string received from props
  time: string;
  facility: string;
}

const EditBookingForm: React.FC<EditBookingFormProps> = ({
  id,
  name,
  date,
  time,
  facility,
}) => {
  const [formData, setFormData] = useState<Booking>({
    name,
    date: new Date(date), // Convert 'date' string to Date
    time,
    facility,
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if there are any empty values in the form data
    let msg = "";

    if (formData.name.trim() === "") {
      msg += "Name, ";
    }
    if (formData.facility.trim() === "") {
      msg += "Facility, ";
    }
    if (formData.time.trim() === "") {
      msg += "Time, ";
    }

    // Remove the trailing comma and space if there's a message
    msg = msg.replace(/,\s*$/, "");
    if (msg) {
      setShowModal(true);
      setModalMessage(msg + " are required fields.");
      return; // Don't proceed with form submission
    }

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update booking");
      }

      router.refresh();
      router.push("/bookings");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "date" ? new Date(value) : value,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBackButtonClick = () => {
    router.back();
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg mx-auto">
      <h1 className="text-3xl">Edit Booking</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block font-medium">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleInputChange}
            value={formData.date.toISOString().split("T")[0]}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newTime" className="block font-medium">
            Time:
          </label>
          <input
            type="time"
            id="time"
            name="time"
            onChange={handleInputChange}
            value={formData.time}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="facility" className="block font-medium">
            Facility:
          </label>
          <input
            type="text"
            id="facility"
            name="facility"
            onChange={handleInputChange}
            value={formData.facility}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          <span className="flex justify-between items-center">
            <FaSave /> Save
          </span>
        </button>
        <button
          onClick={handleBackButtonClick}
          className="bg-gray-400 text-white px-4 py-2 mb-4 ml-2"
        >
          <span className="flex justify-between items-center">
            <FaArrowLeft /> Back
          </span>
        </button>
      </form>
      <Modal isOpen={showModal} onClose={handleCloseModal} title="Required">
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default EditBookingForm;
