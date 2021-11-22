import { useState, useEffect } from 'react';
import {Api} from '../../helpers/api';
import { Bar } from 'react-chartjs-2';
import LoadingSpinner from '../LoadingSpinner';


import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {FaArrowDown} from 'react-icons/fa';
import { BarReportProps, HistoricalData } from '../../pages/Reports/ReportsInterfaces';

export interface ReportData {
    year: string;
    month: string;
    monthNumber: string;
    monthlySum: number;
}

function HistoricalReport() {
    toast.configure();
    const [statusFilter, setStatusFilter] = useState("0");
    const [data, setData] = useState({} as BarReportProps);
    const [isLoading, setIsLoading] = useState(true);
    const options = {
        animation: {
            duration: 1000
        }
    }

    function handleFilterSelection(e: React.FormEvent) {
        const target = e.target as HTMLSelectElement;

        setStatusFilter(target.value);
    }

    function buildData(reportData: ReportData[]){
        const buildData = {} as BarReportProps;
        const labels: string [] = [];
         reportData.forEach(item => {
            labels.push(`${item.year}/${item.month}`);
        });

        buildData.labels = labels;
        buildData.datasets =  [{
            label:  'Quantiade de Pedidos/Mês',
            data: reportData.map(item => item.monthlySum),
            backgroundColor: ['#00C06B'],
            borderWidth: 1
        }];
        setData(buildData);
        setIsLoading(false);
    }

    useEffect(() => {
        async function getHistorialReport(): Promise<void> {
            try {
                const response = await Api.apiOrders.get<HistoricalData>(`/reports/historical/${statusFilter}`);
                buildData(response.data.data.reportData);
            } catch (error) {
                toast.error("Erro ao buscar as informações para montar o relatório")
            }

            return new Promise(resolve => resolve());
        };
        getHistorialReport();
        
    }, [statusFilter]);

    return (
        <>
            {isLoading ?
                <LoadingSpinner />
                :
                <>
                <header className="first-report-header">
                    <div className="status-filters">
                        <span>Filtro de status das ordens: </span>
                        <select name="filters" id="report=filter" onChange={e => handleFilterSelection(e)}>
                            <option value="0">Todos</option>
                            <option value="2">Pagamento Pendente</option>
                            <option value="3">Finalizaos</option>
                            <option value="4">Cancelados</option>
                        </select>

                        <FaArrowDown />
                    </div>
                </header>

                <section className="first-report-section">
                    <div className='header'>
                        <h1 className='title'>Relatório de pedidos histórico</h1>
                    </div>
                
                    <Bar data={data} options ={options}/>
                </section>
                </>
            }
        </>
    );
}

export default HistoricalReport;