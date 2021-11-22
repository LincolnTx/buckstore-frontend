import {useState} from 'react';
import HistoricalReport from '../HistoricalReport/historicalReport';
import DailyReport from '../DailyReport/dailyReport';
import QuantityValueReport from '../QuantityValueReport/quantityOrdersReport';
import './styles.css';

function TabsComponents() {
    const [activeTab, setActiveTab] = useState(1);

    function handleTabExibition() {
        switch(activeTab) {
            case 1: 
                return(
                    <HistoricalReport />
                );
            case 2:
                return(
                    <DailyReport />
                );
            case 3 :
                return(
                    <QuantityValueReport />
                );
            default:
                return(
                    <HistoricalReport />
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