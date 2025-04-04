
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { RideCard, RideProps } from "@/components/RideCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, MapPin } from "lucide-react";

// Sample data
const allRides = [
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
  {
    id: "4",
    driver: {
      name: "Emily Davis",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 4.7,
    },
    origin: "Seattle, WA",
    destination: "Portland, OR",
    date: "Apr 18, 2025",
    time: "11:00 AM",
    price: 25,
    seats: {
      available: 3,
      total: 3,
    },
  },
  {
    id: "5",
    driver: {
      name: "David Wilson",
      avatar: "https://randomuser.me/api/portraits/men/62.jpg",
      rating: 4.5,
    },
    origin: "Austin, TX",
    destination: "Houston, TX",
    date: "Apr 20, 2025",
    time: "07:30 AM",
    price: 22,
    seats: {
      available: 2,
      total: 4,
    },
  },
];

interface ExploreContext {
  userType: "rider" | "driver";
}

export default function Explore() {
  const { userType } = useOutletContext<ExploreContext>();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRides, setFilteredRides] = useState(allRides);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter rides based on search query
    const filtered = allRides.filter(
      (ride) =>
        ride.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ride.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredRides(filtered);
  };

  // Only show explore for riders
  if (userType === "driver") {
    return (
      <div className="pt-6 text-center">
        <h1 className="text-xl font-semibold mb-2">Driver Mode</h1>
        <p className="text-gray-600">Explore is only available for passengers.</p>
      </div>
    );
  }

  return (
    <div className="pt-4">
      <h1 className="text-2xl font-bold mb-4">Find a Ride</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="space-y-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by origin or destination"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input type="date" className="pl-10" />
            </div>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </form>
      
      <div className="space-y-4">
        {filteredRides.map((ride) => (
          <RideCard key={ride.id} {...ride} userType={userType} />
        ))}
        
        {filteredRides.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No rides found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
