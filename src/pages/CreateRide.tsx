import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { CreateRideForm } from "@/components/CreateRideForm";
import config from "@/config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar } from "lucide-react";

interface CreateRideContext {
  userType: "rider" | "driver";
}

interface RideData {
  origin: string;
  destination: string;
  arrival_time: string;
  cost_per_seat: number;
  seats: number;
}

export default function CreateRide() {
  const { userType } = useOutletContext<CreateRideContext>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RideData>({
    origin: "",
    destination: "",
    arrival_time: "",
    cost_per_seat: 0,
    seats: 1
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      // Log the data being sent
      console.log('Sending ride data:', {
        ...formData,
        token: token 
      });

      const response = await fetch(`${config.backendUrl}/rides/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token || ''
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create ride');
      }

      navigate('/rides'); // Redirect to rides list after success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create ride');
    }
  };

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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
            Pick-up Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="origin"
              type="text"
              placeholder="Origin"
              value={formData.origin}
              onChange={(e) => setFormData({...formData, origin: e.target.value})}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
            Drop-off Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="destination"
              type="text"
              placeholder="Destination"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="arrival_time" className="block text-sm font-medium text-gray-700">
            Arrival Time
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="arrival_time"
              type="datetime-local"
              value={formData.arrival_time}
              onChange={(e) => setFormData({...formData, arrival_time: e.target.value})}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="cost_per_seat" className="block text-sm font-medium text-gray-700">
            Cost per Seat (₹)
          </label>
          <Input
            id="cost_per_seat"
            type="number"
            placeholder="Enter amount"
            value={formData.cost_per_seat}
            onChange={(e) => setFormData({...formData, cost_per_seat: Number(e.target.value)})}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="available_seats" className="block text-sm font-medium text-gray-700">
            Number of Available Seats
          </label>
          <Input
            id="available_seats"
            type="number"
            placeholder="Enter number of seats"
            value={formData.available_seats}
            onChange={(e) => setFormData({...formData, available_seats: Number(e.target.value)})}
            min="1"
            max="10"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        
        <Button type="submit" className="w-full">Create Ride</Button>
      </form>
    </div>
  );
}
