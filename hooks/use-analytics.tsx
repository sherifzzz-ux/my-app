"use client";

import { useEffect, useState } from 'react';
import {
  generateSalesData,
  getTopProducts,
  getCustomerMetrics,
  getRevenueMetrics,
  getCategoryData,
  getTrafficData,
  type SalesData,
  type ProductAnalyticItem,
  type CustomerMetrics,
  type RevenueMetrics,
} from '@/lib/analytics-data';

export interface AnalyticsData {
  salesData: SalesData[];
  topProducts: ProductAnalyticItem[];
  customerMetrics: CustomerMetrics;
  revenueMetrics: RevenueMetrics;
  categoryData: any[];
  trafficData: any[];
  loading: boolean;
  error: string | null;
}

export function useAnalytics(dateRange: string = '30d') {
  const [data, setData] = useState<AnalyticsData>({
    salesData: [],
    topProducts: [],
    customerMetrics: getCustomerMetrics(),
    revenueMetrics: getRevenueMetrics(),
    categoryData: [],
    trafficData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const load = async () => {
      setData((d) => ({ ...d, loading: true, error: null }));
      try {
        const res = await fetch(`/api/admin/analytics?period=${encodeURIComponent(dateRange)}`, { credentials: 'include' });
        if (!res.ok) throw new Error('failed');
        const json = await res.json();
        const salesData = json.salesByDay?.map((x: any) => ({ date: x.date, sales: x.orders, orders: x.orders, revenue: x.revenue })) ?? [];
        setData({
          salesData,
          topProducts: json.topProducts ?? getTopProducts(),
          customerMetrics: {
            totalCustomers: json.totals?.activeCustomers ?? 0,
            newCustomers: json.totals?.newCustomers ?? 0,
            returningCustomers: Math.max((json.totals?.activeCustomers ?? 0) - (json.totals?.newCustomers ?? 0), 0),
            averageOrderValue: json.totals?.ordersCount ? Math.round((json.totals.totalRevenue || 0) / json.totals.ordersCount) : 0,
            customerLifetimeValue: json.totals?.ordersCount ? Math.round(((json.totals.totalRevenue || 0) / json.totals.ordersCount) * 3) : 0,
          },
          revenueMetrics: {
            totalRevenue: json.totals?.totalRevenue ?? 0,
            monthlyGrowth:  json.totals ? 12.3 : 0,
            averageOrderValue: json.totals?.ordersCount ? Math.round((json.totals.totalRevenue || 0) / json.totals.ordersCount) : 0,
            totalOrders: json.totals?.ordersCount ?? 0,
            conversionRate: 3.2,
          },
          categoryData: json.geoSales ? json.geoSales.map((g: any) => ({ name: g.key, value: g.orders, revenue: g.revenue })) : getCategoryData(),
          trafficData: getTrafficData(),
          loading: false,
          error: null,
        });
      } catch (e) {
        setData({
          salesData: generateSalesData(),
          topProducts: getTopProducts(),
          customerMetrics: getCustomerMetrics(),
          revenueMetrics: getRevenueMetrics(),
          categoryData: getCategoryData(),
          trafficData: getTrafficData(),
          loading: false,
          error: 'Erreur lors du chargement des données',
        });
      }
    };
    load();
  }, [dateRange]);

  return data;
}


