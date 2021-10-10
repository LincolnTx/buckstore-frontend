import ReactLoading from 'react-loading';

import './styles.css';

function LoadingSpinner() {
    return(
       <div className="spinner-container">
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