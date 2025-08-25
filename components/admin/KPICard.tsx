import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
	title: string;
	value: string | number;
	icon: LucideIcon;
	trend?: {
		value: number;
		isPositive: boolean;
		period: string;
	};
	className?: string;
	iconColor?: string;
	valueColor?: string;
}

export function KPICard({
	title,
	value,
	icon: Icon,
	trend,
	className,
	iconColor = "text-muted-foreground",
	valueColor = "text-foreground"
}: KPICardProps) {
	return (
		<Card className={cn("border-l-4", className)}>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Icon className={cn("h-4 w-4", iconColor)} />
			</CardHeader>
			<CardContent>
				<div className={cn("text-2xl font-bold", valueColor)}>
					{value}
				</div>
				{trend && (
					<p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
						{trend.isPositive ? (
							<TrendingUp className="h-3 w-3 text-green-500" />
						) : (
							<TrendingDown className="h-3 w-3 text-red-500" />
						)}
						<span className={trend.isPositive ? "text-green-600" : "text-red-600"}>
							{trend.isPositive ? "+" : ""}{trend.value}%
						</span>
						{trend.period}
					</p>
				)}
			</CardContent>
		</Card>
	);
}
