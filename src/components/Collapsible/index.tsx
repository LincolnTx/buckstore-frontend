import {useState} from 'react';
import {FaChevronUp, FaChevronDown } from 'react-icons/fa'

import './styles.css'

interface Props {
    open?: boolean;
    title: string;
}

const Collapsible: React.FC<Props> = ({open, title, children}) => {
    const [isOpen, setIsOpen] = useState(open);

    function handleFilterOpening() {
        setIsOpen((prev) => !prev);
    }

    return(
        <div className="collaps-contaier">
            <div className="card">
            <div>
            <div className="collapsible-header-edonec" onClick={handleFilterOpening}>
                <h4 className="title-text-edonec">{title}</h4>
                <button type="button" className="collapsible-icon-button-edonec" >
                {!isOpen ? (
                    <FaChevronDown color="#048243"/>
                ) : (
                    <FaChevronUp color="#048243"/>
                )}
                </button>
            </div>
            </div>

            <div className="collapsible-content-edonec">
            <div>{isOpen && <div className="collapsible-content-padding-edonec">{children}</div>}</div>
            </div>
        </div>
        </div>
    );
}

export default Collapsible;