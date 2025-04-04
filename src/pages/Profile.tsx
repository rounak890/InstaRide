
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, LogOut, Star, Calendar, MapPin, 
  CreditCard, Bell, Shield, HelpCircle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  return (
    <div className="pt-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-20 w-20">
          <img 
            src="https://randomuser.me/api/portraits/women/44.jpg" 
            alt="Profile" 
            className="h-full w-full object-cover"
          />
        </Avatar>
        
        <div>
          <h2 className="text-xl font-semibold">Sarah Williams</h2>
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>4.8</span>
          </div>
          <Badge className="mt-1 bg-blue-100 text-blue-800 hover:bg-blue-100">Verified User</Badge>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-4">Account Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8">
                <MapPin className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">San Francisco, CA</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8">
                <Calendar className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium">April 2024</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8">
                <CreditCard className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Methods</p>
                <p className="font-medium">Visa •••• 4242</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-1 mb-6">
        <Button variant="ghost" className="w-full justify-start pl-2 py-6">
          <Bell className="h-5 w-5 mr-3 text-gray-500" />
          <span>Notifications</span>
        </Button>
        <Separator />
        <Button variant="ghost" className="w-full justify-start pl-2 py-6">
          <Shield className="h-5 w-5 mr-3 text-gray-500" />
          <span>Privacy & Security</span>
        </Button>
        <Separator />
        <Button variant="ghost" className="w-full justify-start pl-2 py-6">
          <HelpCircle className="h-5 w-5 mr-3 text-gray-500" />
          <span>Help & Support</span>
        </Button>
      </div>
      
      <Button variant="outline" className="w-full flex items-center justify-center text-red-500 border-red-200 hover:bg-red-50">
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}
