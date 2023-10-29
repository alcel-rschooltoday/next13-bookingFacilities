import EditBookingForm from "@/app/components/EditBookingForm";
import { GetServerSideProps } from "next";

interface EditBookingProps {
  params: {
    id: string;
    // Other properties if present in the params object
  };
}

const getBookingById = async (id: any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/bookings/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch booking");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error; // Re-throw the error so it's propagated to the caller
  }
};

const EditBooking: GetServerSideProps<EditBookingProps> = async (context) => {
  try {
    const params = context.params as { id: string }; // Safely access 'id' property

    if (!params || !params.id) {
      throw new Error("ID not provided");
    }

    const { id } = params;
    const booking = await getBookingById(id);
    const { name, date, time, facility } = booking;

    return (
      <EditBookingForm
        id={id}
        name={name}
        date={date}
        time={time}
        facility={facility}
      />
    );
  } catch (error) {
    console.error("Error in EditBooking:", error);
    // Handle the error gracefully, e.g., show an error message to the user
    return <div>Error: Failed to fetch booking</div>;
  }
};

export default EditBooking;
