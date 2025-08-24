export interface SalesData {
  date: string;
  sales: number;
  orders: number;
  revenue: number;
}

export interface ProductAnalyticItem {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  views: number;
  conversion: number;
}

export interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
}

export interface RevenueMetrics {
  totalRevenue: number;
  monthlyGrowth: number;
  averageOrderValue: number;
  totalOrders: number;
  conversionRate: number;
}

export const generateSalesData = (): SalesData[] => {
  const data: SalesData[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const baseRevenue = 1500000 + Math.random() * 1000000; // CFA
    const orders = Math.floor(baseRevenue / 15000 + Math.random() * 50);
    data.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(baseRevenue),
      orders,
      sales: orders,
    });
  }
  return data;
};

export const getTopProducts = (): ProductAnalyticItem[] => [
  { id: '1', name: 'Crème Hydratante Premium', category: 'Soin du Visage', sales: 245, revenue: 1225000, views: 1850, conversion: 13.2 },
  { id: '2', name: 'Sérum Anti-Âge', category: 'Soin du Visage', sales: 189, revenue: 1890000, views: 2100, conversion: 9.0 },
  { id: '3', name: 'Parfum Floral 50ml', category: 'Parfumerie', sales: 156, revenue: 1560000, views: 980, conversion: 15.9 },
  { id: '4', name: 'Shampooing Nutritif', category: 'Cheveux', sales: 134, revenue: 402000, views: 1200, conversion: 11.2 },
  { id: '5', name: 'Rouge à Lèvres Mat', category: 'Maquillage', sales: 128, revenue: 384000, views: 1560, conversion: 8.2 },
];

export const getCustomerMetrics = (): CustomerMetrics => ({
  totalCustomers: 3547,
  newCustomers: 289,
  returningCustomers: 892,
  averageOrderValue: 78500,
  customerLifetimeValue: 234800,
});

export const getRevenueMetrics = (): RevenueMetrics => ({
  totalRevenue: 147850000,
  monthlyGrowth: 12.3,
  averageOrderValue: 78500,
  totalOrders: 1883,
  conversionRate: 3.2,
});

export const getCategoryData = () => [
  { name: 'Soin du Visage', value: 35, revenue: 52000000 },
  { name: 'Parfumerie', value: 25, revenue: 37000000 },
  { name: 'Maquillage', value: 18, revenue: 26000000 },
  { name: 'Cheveux', value: 12, revenue: 18000000 },
  { name: 'Corps & Bain', value: 10, revenue: 14000000 },
];

export const getTrafficData = () => [
  { source: 'Recherche Directe', visitors: 2840, percentage: 45 },
  { source: 'Réseaux Sociaux', visitors: 1580, percentage: 25 },
  { source: 'Email Marketing', visitors: 950, percentage: 15 },
  { source: 'Publicité Payante', visitors: 632, percentage: 10 },
  { source: 'Autres', visitors: 316, percentage: 5 },
];


