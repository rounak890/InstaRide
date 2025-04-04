
import { useOutletContext } from "react-router-dom";
import { RideCard, RideProps } from "@/components/RideCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for different ride types
const upcomingRides = [
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
];

const pastRides = [
  {
    id: "3",
    driver: {
      name: "Michael Chen",
      avatar: "https://randomuser.me/api/portraits/men/57.jpg",
      rating: 4.9,
    },
    origin: "Chicago, IL",
    destination: "Detroit, MI",
    date: "Apr 1, 2025",
    time: "09:15 AM",
    price: 30,
    seats: {
      available: 0,
      total: 4,
    },
  },
  {
    id: "4",
    driver: {
      name: "Emily Davis",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 4.7,
    },
    origin: "Seattle, WA",
    destination: "Portland, OR",
    date: "Mar 28, 2025",
    time: "11:00 AM",
    price: 25,
    seats: {
      available: 0,
      total: 3,
    },
  },
];

interface MyRidesContext {
  userType: "rider" | "driver";
}

export default function MyRides() {
  const { userType } = useOutletContext<MyRidesContext>();
  
  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold mb-6">
        {userType === "rider" ? "Your Bookings" : "Your Rides"}
      </h1>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
          <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcomingRides.length > 0 ? (
            upcomingRides.map((ride) => (
              <RideCard key={ride.id} {...ride} userType={userType} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No upcoming rides found.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {pastRides.length > 0 ? (
            pastRides.map((ride) => (
              <RideCard key={ride.id} {...ride} userType={userType} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No past rides found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
