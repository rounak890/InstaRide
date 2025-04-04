
import { Home, Car, Search, User, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, to, isActive, onClick }: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center px-3 py-2",
        isActive ? "text-blue-500" : "text-gray-600"
      )}
      onClick={onClick}
    >
      <div className="w-6 h-6">{icon}</div>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export function BottomNavigation() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleClick = (path: string) => {
    setActiveTab(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center px-3 z-10">
      <NavItem
        icon={<Home size={24} />}
        label="Home"
        to="/"
        isActive={activeTab === "/"}
        onClick={() => handleClick("/")}
      />
      <NavItem
        icon={<Search size={24} />}
        label="Explore"
        to="/explore"
        isActive={activeTab === "/explore"}
        onClick={() => handleClick("/explore")}
      />
      <NavItem
        icon={<Car size={24} />}
        label="Create"
        to="/create-ride"
        isActive={activeTab === "/create-ride"}
        onClick={() => handleClick("/create-ride")}
      />
      <NavItem
        icon={<MapPin size={24} />}
        label="My Rides"
        to="/my-rides"
        isActive={activeTab === "/my-rides"}
        onClick={() => handleClick("/my-rides")}
      />
      <NavItem
        icon={<User size={24} />}
        label="Profile"
        to="/profile"
        isActive={activeTab === "/profile"}
        onClick={() => handleClick("/profile")}
      />
    </div>
  );
}
