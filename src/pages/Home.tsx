
import { useOutletContext } from "react-router-dom";
import { RideCard, RideProps } from "@/components/RideCard";

// Sample data
const sampleRides = [
  {
    id: "1",
    driver: {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
    },
    origin: "San Francisco, CA",
    destination: "Los Angeles, CA",
    date: "Apr 10, 2025",
    time: "08:00 AM",
    price: 35,
    seats: {
      available: 3,
      total: 4,
    },
  },
  {
    id: "2",
    driver: {
      name: "Sarah Williams",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.6,
    },
    origin: "New York, NY",
    destination: "Boston, MA",
    date: "Apr 12, 2025",
    time: "10:30 AM",
    price: 28,
    seats: {
      available: 2,
      total: 3,
    },
  },
  {
    id: "3",
    driver: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/57.jpg",
      rating: 4.9,
    },
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    date: "Apr 15, 2025",
    time: "09:15 AM",
    price: 30,
    seats: {
      available: 1,
      total: 4,
    },
  },
];

const riderHomeContent = (
  <div>
    <h1 className="text-2xl font-bold mb-6">Available Rides</h1>
    <div className="space-y-4">
      {sampleRides.map((ride) => (
        <RideCard key={ride.id} {...ride} userType="rider" />
      ))}
    </div>
  </div>
);

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
      {userType === "rider" ? riderHomeContent : driverHomeContent}
    </div>
  );
}
