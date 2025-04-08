import { useOutletContext } from "react-router-dom";
import Explore from "@/pages/Explore"; // Import the Explore page
import { RideCard, RideProps } from "@/components/RideCard";

// Sample data for driver content
const driverHomeContent = (
  <div>
    <h1 className="text-2xl font-bold mb-6">Your Driver Dashboard</h1>
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2">Driver Stats</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-500">12</p>
          <p className="text-sm text-gray-600">Rides</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-500">4.7</p>
          <p className="text-sm text-gray-600">Rating</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-500">$450</p>
          <p className="text-sm text-gray-600">Earnings</p>
        </div>
      </div>
    </div>
  </div>
);

interface HomeContext {
  userType: "rider" | "driver";
}

export default function Home() {
  const { userType } = useOutletContext<HomeContext>();

  return (
    <div className="pt-4">
      {userType === "rider" ? (
        <Explore /> // Render the Explore page for riders
      ) : (
        driverHomeContent
      )}
    </div>
  );
}