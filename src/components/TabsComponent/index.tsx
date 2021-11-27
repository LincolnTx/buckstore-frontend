import {useState} from 'react';
import HistoricalReport from '../HistoricalReport/historicalReport';
import DailyReport from '../DailyReport/dailyReport';
import QuantityValueReport from '../QuantityValueReport/quantityOrdersReport';
import { jsPDF } from "jspdf";
import './styles.css';

function TabsComponents() {
    const [activeTab, setActiveTab] = useState(1);
    const bgColorPlugin = {
        id: 'bgColor',
        beforeDraw: (chart: any, options: any) => {
            const { ctx, width, height } = chart;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        }
    }

    function handlePdfChart(elementId: string, reportName: string, title: string) {
        const canvas = document.getElementById(elementId) as any;

        const canvasImage = canvas?.toDataURL('image/jpeg', 1.0);
        
        let pdf = new jsPDF('landscape');
        pdf.setFontSize(20);
        pdf.text(title, 12, 12);
        pdf.addImage(canvasImage, 'JPEG', 15, 15, 280, 150);
        pdf.save(`${reportName}.pdf`);
    }

    function handleTabExibition() {
        switch(activeTab) {
            case 1: 
                return(
                    <HistoricalReport plugins={bgColorPlugin} handlePdfChart={handlePdfChart}/>
                );
            case 2:
                return(
                    <DailyReport plugins={bgColorPlugin} handlePdfChart={handlePdfChart}/>
                );
            case 3 :
                return(
                    <QuantityValueReport plugins={bgColorPlugin} handlePdfChart={handlePdfChart}/>
                );
            default:
                return(
                    <HistoricalReport plugins={bgColorPlugin} handlePdfChart={handlePdfChart}/>
                );
        }
    }
    return(
        <div className="tabs">
            <ul className="nav">
                <li 
                    className={activeTab === 1 ? 'active' : ''}
                    onClick={() => setActiveTab(1)}
                >
                    Relatório Histórico
                </li>
                
                <li 
                    className={activeTab === 2 ? 'active' : ''}
                    onClick={() => setActiveTab(2)}
                >
                    Relatório diário
                </li>

                <li 
                    className={activeTab === 3 ? 'active' : ''}
                    onClick={() => setActiveTab(3)}
                >
                    Relátorio de Vendas 
                </li>
            </ul>

            <div className="outlet">
                {handleTabExibition()}                
            </div>
        </div>
    );
}

export default TabsComponents;