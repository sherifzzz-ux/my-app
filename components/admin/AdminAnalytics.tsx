"use client";

import { useState } from 'react';
import { useAnalytics } from '@/hooks/use-analytics';
import { AnalyticsOverview } from './analytics/AnalyticsOverview';
import { SalesChart } from './analytics/SalesChart';
import { ProductAnalytics } from './analytics/ProductAnalytics';
import { CustomerAnalytics } from './analytics/CustomerAnalytics';
import { RevenueMetrics } from './analytics/RevenueMetrics';
import { AnalyticsFilters } from './analytics/AnalyticsFilters';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, BarChart3 } from "lucide-react";

export function AdminAnalytics() {
  const [dateRange, setDateRange] = useState('30d');
  const { salesData, topProducts, customerMetrics, revenueMetrics, categoryData, trafficData, loading, error } = useAnalytics(dateRange);

  const handleRefresh = () => { window.location.reload(); };
  const handleExport = () => {
    const dataToExport = { periode: dateRange, revenus: revenueMetrics, ventes: salesData, produits: topProducts, clients: customerMetrics, date_export: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `analytics-${dateRange}-${new Date().toISOString().split('T')[0]}.json`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Analyses et Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert><AlertCircle className="h-4 w-4" /><AlertDescription>{error}. Les données simulées sont affichées.</AlertDescription></Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Analyses et Statistiques</CardTitle></CardHeader>
        <CardContent>
          <AnalyticsFilters dateRange={dateRange} onDateRangeChange={setDateRange} onRefresh={handleRefresh} onExport={handleExport} />
        </CardContent>
      </Card>
      <AnalyticsOverview metrics={revenueMetrics} loading={loading} />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2"><SalesChart data={salesData} loading={loading} /></div>
        <RevenueMetrics metrics={revenueMetrics} salesData={salesData} loading={loading} />
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <ProductAnalytics products={topProducts} loading={loading} />
        <div className="md:col-span-2"><CustomerAnalytics metrics={customerMetrics} categoryData={categoryData} trafficData={trafficData} loading={loading} /></div>
      </div>
    </div>
  );
}


