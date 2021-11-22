import { DailyReportData } from "../../components/DailyReport/dailyReport";
import { ReportData } from "../../components/HistoricalReport/historicalReport";
import { QuantityReportData } from "../../components/QuantityValueReport/quantityOrdersReport";

export interface HistoricalData {
    success: boolean;
    data: {
        reportData: ReportData[];
    }
}

export interface DailyReportResponse {
    success: boolean;
    data: {
        reportData: DailyReportData[]
    }
}

export interface BarReportProps {
    labels: string[];
    datasets: [
        {
          label: string,
          data: number[],
          backgroundColor: string[];
          borderWidth: number,
        },
      ],
}

export interface QuantityReportResponse {
    success: boolean;
    data: {
        reportData: QuantityReportData[]
    }
}
