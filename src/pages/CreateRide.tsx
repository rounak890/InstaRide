
import { useOutletContext } from "react-router-dom";
import { CreateRideForm } from "@/components/CreateRideForm";

interface CreateRideContext {
  userType: "rider" | "driver";
}

export default function CreateRide() {
  const { userType } = useOutletContext<CreateRideContext>();
  
  // Only show create ride for drivers
  if (userType === "rider") {
    return (
      <div className="pt-6 text-center">
        <h1 className="text-xl font-semibold mb-2">Passenger Mode</h1>
        <p className="text-gray-600">Please switch to driver mode to create a ride.</p>
      </div>
    );
  }
  
  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold mb-6">Create a New Ride</h1>
      <CreateRideForm />
    </div>
  );
}
