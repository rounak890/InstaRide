import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { RideCard } from "@/components/RideCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, MapPin } from "lucide-react";
import config from "@/Config";

// Interface for ride data from backend
interface Ride {
  id: number;
  rider_id: number;
  driver_id: number | null;
  origin: string;
  destination: string;
  status: string;
}

// /rides/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJramJAZ21haWwuY29tIiwiZXhwIjoxNzQ0MTMxMDI1fQ.xxynLrE2TUYFnGUI3VOJjpjVCmX1qq6ZAz1gpNy1P5U HTTP/1.1" 200 OK

export default function Explore() {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [rides, setRides] = useState<Ride[]>([]);
  const [filteredRides, setFilteredRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("Fetching rides with token from localStorage", localStorage.getItem('token')); // Debugging line

  // Fetch rides from backend
  useEffect(() => {
    const fetchRides = async () => {
      const storedToken = localStorage.getItem('token');
      try {
        const response = await fetch(`${config.backendUrl}/rides/?token=${storedToken}`);

        if (!response.ok) {
          throw new Error('Failed to fetch rides');
        }

        const data = await response.json();
        console.log("Fetched rides:", data);
        setRides(data.rides);
        setFilteredRides(data.rides);
      } catch (err) {
        console.error("Error fetching rides:", err);
        setError(err instanceof Error ? err.message : 'Failed to fetch rides');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchRides();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Initialize filteredRides with all rides
    setFilteredRides(rides);
  }, [rides]);

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = rides.filter(
      (ride) =>
        ride.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ride.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRides(filtered);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error: {error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  // Only show explore for riders
  if (user.userType === "driver") {
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
          <RideCard 
            key={ride.id} 
            {...ride}
            userType={user?.userType || 'rider'}
          />
        ))}
      </div>
    </div>
  );
}