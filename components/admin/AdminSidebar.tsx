"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MenuItem {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface AdminSidebarProps {
	menuItems: MenuItem[];
	currentPage: string;
	onPageChange: (page: string) => void;
	user: { email?: string | null } | null;
	onSignOut: () => void;
}

export function AdminSidebar({ 
	menuItems, 
	currentPage, 
	onPageChange, 
	user, 
	onSignOut 
}: AdminSidebarProps) {
	return (
		<aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border shadow-lg">
			{/* Header */}
			<div className="p-6 border-b border-border">
				<h2 className="text-xl font-bold text-primary">Admin Panel</h2>
				<p className="text-sm text-muted-foreground">Flawless Beauty</p>
			</div>

			{/* Navigation */}
			<nav className="p-4 space-y-2">
				{menuItems.map((item) => {
					const Icon = item.icon;
					return (
						<Button
							key={item.id}
							variant={currentPage === item.id ? "default" : "ghost"}
							className="w-full justify-start"
							onClick={() => onPageChange(item.id)}
						>
							<Icon className="mr-3 h-4 w-4" />
							{item.label}
						</Button>
					);
				})}
			</nav>

			{/* User Profile & Sign Out */}
			<div className="absolute bottom-0 w-full p-4 border-t border-border bg-card">
				<div className="flex items-center space-x-3 mb-3">
					<Avatar className="h-8 w-8">
						<AvatarFallback className="bg-primary text-primary-foreground">
							{user?.email?.charAt(0)?.toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium text-foreground truncate">
							Admin
						</p>
						<p className="text-xs text-muted-foreground truncate">
							{user?.email}
						</p>
					</div>
				</div>
				
				<Button
					variant="outline"
					size="sm"
					className="w-full"
					onClick={onSignOut}
				>
					<LogOut className="mr-2 h-4 w-4" />
					Déconnexion
				</Button>
			</div>
		</aside>
	);
}


