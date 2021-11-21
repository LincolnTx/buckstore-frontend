import { DailyReportData } from "../../components/DailyReport/dailyReport";
import { ReportData } from "../../components/HistoricalReport/historicalReport";

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
