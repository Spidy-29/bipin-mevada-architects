import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="min-h-screen flex items-center justify-center">
        <div className="container">
          <div className="max-w-xl mx-auto text-center space-y-8">
            {/* 404 */}
            <div className="relative">
              <span className="font-serif text-[10rem] md:text-[14rem] font-light leading-none text-muted">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-px bg-line" />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-4 -mt-12">
              <h1 className="font-serif text-heading font-light">
                Page not found
              </h1>
              <p className="text-body text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* CTA */}
            <Button variant="architectural" asChild>
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
