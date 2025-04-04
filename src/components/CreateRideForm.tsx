
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Clock, DollarSign, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export function CreateRideForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    price: "",
    seats: "1"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normally we would send this data to an API
    console.log("Creating ride with data:", formData);
    
    toast({
      title: "Ride created!",
      description: "Your ride has been successfully created.",
    });
    
    // Redirect to my rides page
    navigate("/my-rides");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="origin">Departure Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="origin"
              name="origin"
              placeholder="From where?"
              value={formData.origin}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              id="destination"
              name="destination"
              placeholder="To where?"
              value={formData.destination}
              onChange={handleChange}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price per seat</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="25"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="seats">Available seats</Label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                id="seats"
                name="seats"
                type="number"
                placeholder="1"
                min="1"
                max="8"
                value={formData.seats}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
        Create Ride
      </Button>
    </form>
  );
}
