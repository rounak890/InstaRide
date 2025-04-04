
import { BottomNavigation } from "./BottomNavigation";
import { UserTypeToggle } from "./UserTypeToggle";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  const [userType, setUserType] = useState<"rider" | "driver">("rider");

  const handleUserTypeChange = (type: "rider" | "driver") => {
    setUserType(type);
  };

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      <UserTypeToggle userType={userType} onUserTypeChange={handleUserTypeChange} />
      <main className="container max-w-md mx-auto px-4 pt-2 pb-20">
        <Outlet context={{ userType }} />
      </main>
      <BottomNavigation />
    </div>
  );
}
