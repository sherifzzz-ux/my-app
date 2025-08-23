import { useState } from "react";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  Mail, 
  Settings,
  Package,
  BarChart3,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AdminSidebar } from "./AdminSidebar";
import { AdminOverview } from "./AdminOverview";
import { AdminOrders } from "./AdminOrders";
import { AdminUsers } from "./AdminUsers";
import { AdminMessages } from "./AdminMessages";
import { AdminNewsletter } from "./AdminNewsletter";
import { AdminProducts } from "./AdminProducts";
import { AdminAnalytics } from "./AdminAnalytics";
import { AdminSettings } from "./AdminSettings";

type AdminPage = 'overview' | 'orders' | 'users' | 'messages' | 'newsletter' | 'products' | 'analytics' | 'settings';

const menuItems = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { id: 'orders', label: 'Commandes', icon: ShoppingCart },
  { id: 'users', label: 'Utilisateurs', icon: Users },
  { id: 'products', label: 'Produits', icon: Package },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'newsletter', label: 'Newsletter', icon: Mail },
  { id: 'analytics', label: 'Analyses', icon: BarChart3 },
  { id: 'settings', label: 'Paramètres', icon: Settings },
];

export function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState<AdminPage>('overview');
  const { signOut, user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'overview':
        return <AdminOverview />;
      case 'orders':
        return <AdminOrders />;
      case 'users':
        return <AdminUsers />;
      case 'messages':
        return <AdminMessages />;
      case 'newsletter':
        return <AdminNewsletter />;
      case 'products':
        return <AdminProducts />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar 
          menuItems={menuItems}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page as AdminPage)}
          user={user}
          onSignOut={handleSignOut}
        />

        {/* Main Content */}
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Administration Flawless Beauty
              </h1>
              <p className="text-muted-foreground">
                Gérez votre boutique en ligne et vos clients
              </p>
            </div>
            
            {renderCurrentPage()}
          </div>
        </main>
      </div>
    </div>
  );
}