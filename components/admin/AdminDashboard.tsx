"use client";

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
	Tags,
	CreditCard,
	TrendingDown,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AdminSidebar } from "./AdminSidebar";
import { AdminOverview } from "./AdminOverview";
import { AdminOrders } from "./AdminOrders";
import { AdminUsers } from "./AdminUsers";
import { AdminMessages } from "./AdminMessages";
import { AdminNewsletter } from "./AdminNewsletter";
import { AdminProducts } from "./AdminProducts";
import { AdminAnalytics } from "./AdminAnalytics";
import { AdminSettings } from "./AdminSettings";
import { CategoriesPage } from "./CategoriesPage";
import { BrandsPage } from "./BrandsPage";
import { StockFaiblePage } from "./StockFaiblePage";

type AdminPage = 'overview' | 'orders' | 'users' | 'messages' | 'newsletter' | 'products' | 'categories' | 'brands' | 'stock' | 'analytics' | 'settings';

const menuItems = [
	{ id: 'overview', label: "Vue d'ensemble", icon: LayoutDashboard },
	{ id: 'orders', label: 'Commandes', icon: ShoppingCart },
	{ id: 'users', label: 'Utilisateurs', icon: Users },
	{ id: 'products', label: 'Produits', icon: Package },
	{ id: 'categories', label: 'Catégories', icon: Tags },
	{ id: 'brands', label: 'Marques', icon: CreditCard },
	{ id: 'stock', label: 'Stock Faible', icon: TrendingDown },
	{ id: 'messages', label: 'Messages', icon: MessageSquare },
	{ id: 'newsletter', label: 'Newsletter', icon: Mail },
	{ id: 'analytics', label: 'Analyses', icon: BarChart3 },
	{ id: 'settings', label: 'Paramètres', icon: Settings },
];

export function AdminDashboard() {
	const [currentPage, setCurrentPage] = useState<AdminPage>('overview');
	const { signOut, user } = useAuth();

	const handleSignOut = async () => {
		try {
			console.log('🔄 Déconnexion demandée depuis AdminDashboard...');
			await signOut();
			console.log('✅ Déconnexion réussie depuis AdminDashboard');
		} catch (error) {
			console.error('❌ Erreur lors de la déconnexion depuis AdminDashboard:', error);
			// En cas d'erreur, essayer de rediriger manuellement
			window.location.href = '/';
		}
	};

	const renderCurrentPage = () => {
		switch (currentPage) {
			case 'overview':
				return <AdminOverview onPageChange={setCurrentPage} />;
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
			case 'categories':
				return <CategoriesPage />;
			case 'brands':
				return <BrandsPage />;
			case 'stock':
				return <StockFaiblePage />;
			case 'analytics':
				return <AdminAnalytics />;
			case 'settings':
				return <AdminSettings />;
			default:
				return <AdminOverview onPageChange={setCurrentPage} />;
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
					user={user as { email?: string | null } | null}
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


