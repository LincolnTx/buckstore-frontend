import { ProductEvaluation } from '../../helpers/Responses/products/productsResponses';
import './styles.css';

interface Props {
    averageRate: number;
    evaluations: ProductEvaluation[]
}

function CommentArea({evaluations, averageRate}: Props) {
    return(
        <>
            <header>
                <h1>Avaliaçãoes dos Usuários</h1>
                <div className="average-rate-area">
                    <span>{averageRate}</span>
                    <div className="rate-area-count">
                        <span>estrlas</span>
                        <span>{evaluations.length}</span>
                    </div>
                </div>
            </header>
            <main>
                {evaluations.map(evaluation => (
                    <>
                        <div className="comment-info" key={evaluation.rateId}>
                            <div className="horizontal-separator"></div>
                            <span>Nome</span>
                            <span> Opinião: </span> <span>comment</span>
                        </div>
                        <div className="rate"></div>
                    </>
                ))}
            </main>
        </>
    );
}

export default CommentArea;