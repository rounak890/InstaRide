
import { cn } from "@/lib/utils";

interface UserTypeToggleProps {
  userType: "rider" | "driver";
  onUserTypeChange: (type: "rider" | "driver") => void;
}

export function UserTypeToggle({ userType, onUserTypeChange }: UserTypeToggleProps) {
  return (
    <div className="bg-white border-b border-gray-200 py-3 sticky top-0 z-10">
      <div className="container max-w-md mx-auto px-4">
        <div className="flex items-center justify-center space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              userType === "rider"
                ? "bg-white text-blue-500 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
            onClick={() => onUserTypeChange("rider")}
          >
            Passenger
          </button>
          <button
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              userType === "driver"
                ? "bg-white text-blue-500 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
            onClick={() => onUserTypeChange("driver")}
          >
            Driver
          </button>
        </div>
      </div>
    </div>
  );
}
