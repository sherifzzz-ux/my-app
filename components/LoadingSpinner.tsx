"use client";

interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg";
	className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: "h-4 w-4",
		md: "h-6 w-6",
		lg: "h-8 w-8",
	}[size];

	return (
		<div className={`animate-spin rounded-full border-2 border-muted-foreground border-t-transparent ${sizeClasses} ${className}`} />
	);
}


