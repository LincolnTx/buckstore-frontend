import PageHeader from '../../components/PageHeader';
import TabsComponent from '../../components/TabsComponent';

import './styles.css';

function Reports() {
    return (
        <>
            <PageHeader />
            <div className="reports-container">
                <TabsComponent />
            </div>
        </>
    );
}

export default Reports;