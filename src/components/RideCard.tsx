import { MapPin, Calendar, Users, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

// Backend data interface
interface BackendRide {
  id: number;
  rider_id: number;
  driver_id: number | null;
  origin: string;
  destination: string;
  status: string;
  userType: string;
}

// Rich UI data interface
interface UIRide {
  driver?: {
    name: string;
    avatar: string;
    rating: number;
  };
  date?: string;
  time?: string;
  price?: number;
  seats?: {
    available: number;
    total: number;
  };
}

// Combined props interface
type RideCardProps = BackendRide & Partial<UIRide>;

export function RideCard({ 
  id, 
  rider_id,
  driver_id,
  origin, 
  destination, 
  status,
  userType,
  // Optional UI enrichment props
  driver = {
    name: "Driver Pending",
    avatar: "https://ui-avatars.com/api/?name=Driver+Pending",
    rating: 0,
  },
  date = "Pending",
  time = "Pending",
  price = 0,
  seats = {
    available: 4,
    total: 4,
  }
}: RideCardProps) {
  const [distance, setDistance] = useState<string>("10 km");

  // Set fixed distance instead of API call
  useEffect(() => {
    setDistance("10 km");
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Avatar>
              <img src={driver.avatar} alt={driver.name} className="h-10 w-10 rounded-full object-cover" />
            </Avatar>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">{driver.name}</h3>
              {driver.rating > 0 && (
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="text-xs text-gray-600 ml-1">{driver.rating.toFixed(1)}</span>
                </div>
              )}
              <span className="text-xs text-gray-500">Status: {status}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold text-gray-900">${price}</span>
            <p className="text-xs text-gray-600">per seat</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-medium">{origin}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-900 font-medium">{destination}</p>
              {distance && (
                <p className="text-xs text-gray-500">Distance: {distance}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs mb-4">
          <div className="flex items-center">
            <Calendar size={14} className="text-gray-500 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="text-gray-500 mr-1" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <Users size={14} className="text-gray-500 mr-1" />
            <span>{seats.available} of {seats.total} seats</span>
          </div>
        </div>

        {userType === "rider" ? (
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={status !== "pending"}
          >
            {status === "pending" ? "Book Seat" : "Ride " + status}
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-1"
              disabled={status !== "pending"}
            >
              Edit
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 text-red-500 border-red-200 hover:bg-red-50"
              disabled={status !== "pending"}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}