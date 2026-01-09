import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl text-muted-foreground mb-8">Page not found</p>
            <Button asChild>
                <Link to="/">Return Home</Link>
            </Button>
        </div>
    );
};
export default NotFound;
