import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function Admin() {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Administration - Flawless Beauty</title>
        <meta name="description" content="Interface d'administration pour Flawless Beauty" />
      </Helmet>
      
      <AdminDashboard />
    </>
  );
}