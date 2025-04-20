// For Statistics Section
interface Statistics {
    totalDonors: number;
    totalActiveDonors: number;
    totalDonationCount: number;
    thisMonthDonations: number;
  }
  
  // For Individual Blood Inventory Item
  interface BloodInventoryItem {
    bloodGroup: string;
    units: number;
    status: 'critical' | 'low' | 'stable' | 'normal'; // assuming possible statuses
  }
  
  // For Blood Distribution Data (used in chart)
  interface BloodDistributionData {
    labels: string[];
    data: number[];
  }
  
  // Blood Inventory Section
  interface BloodInventory {
    bloodDistributionData: BloodDistributionData;
    inventory: BloodInventoryItem[];
  }
  
  // For Recent Donation
  interface Donation {
    _id: string;
    userId: string;
    donationDate: string; // ISO Date
    recipient: string;
    recipientName: string;
    createdAt: string; // ISO Date
    updatedAt: string; // ISO Date
    __v: number;
  }
  
  // For Donation Chart Data
  interface DonationsChartData {
    labels: string[];
    data: number[];
  }
  
  // Main Dashboard Data Interface
  interface DashboardData {
    statistics: Statistics;
    bloodInventory: BloodInventory;
    recentDonations: Donation[];
    donationsChartData: DonationsChartData;
  }
export default DashboardData;  