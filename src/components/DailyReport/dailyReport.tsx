import { useState, useEffect } from 'react';
import {Api} from '../../helpers/api';
import { Bar } from 'react-chartjs-2';
import LoadingSpinner from '../LoadingSpinner';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import {FaArrowDown} from 'react-icons/fa';
import { BarReportProps, DailyReportResponse } from '../../pages/Reports/ReportsInterfaces';
import './styles.css';

export interface DailyReportData {
    day: string;
    month: string;
    monthNumber: string;
    year: string;
    dailySum: number;
}

function DailyReport() {
    toast.configure();
    const defaultDate = new Date();
    const [statusFilter, setStatusFilter] = useState("0");
    const [startDate, setStartDate] = useState('2021-09-01');
    const [endDate, setEndDate] = useState(defaultDate.toISOString().split('T')[0]);
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

    function buildData(reportData: DailyReportData[]) {
        const buildReport = {} as BarReportProps;
        const labels = reportData.map(item => {
            return `${item.day}/${item.monthNumber}/${item.year}`;
        })

        buildReport.labels = labels;
        buildReport.datasets = [{
            label: "Quantidade de Pedidos/Dia",
            data: reportData.map(item => item.dailySum),
            backgroundColor: ['#00C06B'],
            borderWidth: 1
        }];

        setData(buildReport);
        setIsLoading(false);
    }

    async function getDailyReport(): Promise<void> {
        try {
            const response = await Api.apiOrders.get<DailyReportResponse>(`/reports/daily/${statusFilter}/${startDate}/${endDate}`);
            buildData(response.data.data.reportData);
        } catch (error) {
            toast.error("Erro ao buscar informações para montar o relatório");
        }

        return new Promise(resolve => resolve());
    }

    useEffect(() =>  {
        getDailyReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function updateReportParameters() {

        if (!validateMonthDiff())
            return;
        getDailyReport();
    }

    function validateMonthDiff() {

        const intial = new Date(startDate);
        const end = new Date(endDate);

        if (intial > end ){
            toast.error("A data de inicio deve ser menor do que a data de fim");
            return false;
        }

        let months = (end.getFullYear() - intial.getFullYear()) * 12;

        months -= intial.getMonth();
        months += end.getMonth();

        if( (months - 1) >= 6) {
            toast.error("O intervalo entre datas deve ser menor do que seis meses para esse relatório");
            return false;
        }

        return true;
    }

    return (
        <>
            {isLoading ?
                <LoadingSpinner />
                :
                <>
                    <header className="middle-report-header">
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

                       <div className="date-filters">
                           <div className="date-picker">
                                <label> Data de início: </label>
                                <input type="text" placeholder={startDate} value={startDate} onChange={e => setStartDate(e.target.value)}/>
                            </div>

                            <div className="date-picker">
                                <label> Data de fim: </label>
                                <input type="text" placeholder={endDate} value={endDate} onChange={e => setEndDate(e.target.value)}/>
                            </div>
                        </div>
                        <button onClick={() => updateReportParameters()}>Atualizar</button>
                    </header>

                    <section>
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

export default DailyReport;