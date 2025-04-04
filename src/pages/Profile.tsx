
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserRound, LogOut } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <UserRound className="h-8 w-8 text-primary" />
          </div>
          <div>
            <CardTitle>{user?.name}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">User Type</p>
              <p className="capitalize">{user?.userType}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardFooter>
      </Card>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <Card>
            <CardContent className="p-6">
              <Button variant="outline" className="w-full justify-start" onClick={() => toast.info("Feature coming soon")}>
                Edit profile
              </Button>
              <Button variant="outline" className="w-full justify-start mt-2" onClick={() => toast.info("Feature coming soon")}>
                Change password
              </Button>
              <Button variant="outline" className="w-full justify-start mt-2" onClick={() => toast.info("Feature coming soon")}>
                Notification settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
