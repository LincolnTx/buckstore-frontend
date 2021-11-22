import { useState, useEffect } from 'react';
import {Api} from '../../helpers/api';
import { Bar } from 'react-chartjs-2';
import LoadingSpinner from '../LoadingSpinner';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { BarReportProps, QuantityReportResponse } from '../../pages/Reports/ReportsInterfaces';
import './styles.css';

export interface QuantityReportData {
    totalOrders: number;
    totalValue: number;
    dateSpell: string;
    year: string;
}

function QuantityValueReport() {
    toast.configure();
    const defaultDate = new Date();
    const [minValue, setMinValue] = useState('1,0');
    const [isLoading, setIsLoading] = useState(true);
    const [startDate, setStartDate] = useState('2021-09-01');
    const [endDate, setEndDate] = useState(defaultDate.toISOString().split('T')[0]);
    const [data, setData] = useState({} as BarReportProps);
    const options = {
        animation: {
            duration: 1000
        }
    }

    function updateReportParameters() {

        if (!validateMonthDiff())
            return;
        getOrderQuantityReport();
    }

    function buildData(reportData: QuantityReportData[]) {
        const buildReport = {} as BarReportProps;
        const labels = reportData.map(item => {
            return `${item.dateSpell}/${item.year}`;
        })

        buildReport.labels = labels;
        buildReport.datasets = [{
            label: "Quantide de Pedidos/Dia",
            data: reportData.map(item => item.totalOrders),
            backgroundColor: ['#00C06B'],
            borderWidth: 1
        }];

        setData(buildReport);
        setIsLoading(false);
    }

    async function getOrderQuantityReport(): Promise<void> {
        try {
            const response = await Api.apiOrders.get<QuantityReportResponse>(`/reports/${minValue}/${startDate}/${endDate}`);
            buildData(response.data.data.reportData);
            
        } catch (error) {
            toast.error("Erro ao buscar informações para montar o relatório");
        }
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

        if( (months - 1) >= 3) {
            toast.error("O intervalo entre datas deve ser menor do que três meses para esse relatório");
            return false;
        }

        return true;
    }

    useEffect(() => {
        getOrderQuantityReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isLoading ?
                <LoadingSpinner />
                :
                <>
                    <header className="middle-report-header">
                       <div className="date-filters">
                       <div className="date-picker">
                                <label> Valor mínimo R$: </label>
                                <input type="text" placeholder={minValue} value={minValue} onChange={e => setMinValue(e.target.value.replace(',', '.'))}/>
                            </div>
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

export default QuantityValueReport;