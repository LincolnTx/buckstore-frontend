import ReactLoading from 'react-loading';

import './styles.css';

interface Props {
    visible?: boolean;
}
function LoadingSpinner({visible = true}: Props) {
    return(
       <div className={`spinner-container ${visible ? 'set' : 'unset'}`}>
            <ReactLoading
            type="spinningBubbles"
            color="#048243"
            height="100px"
            width="100px"
        />
       </div>
    )
}

export default LoadingSpinner;