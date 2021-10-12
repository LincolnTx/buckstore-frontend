import { ProductEvaluation } from '../../helpers/Responses/products/productsResponses';
import StarRatings from 'react-star-ratings';

import './styles.css';

interface Props {
    averageRate: number;
    evaluations: ProductEvaluation[]
}

function CommentArea({evaluations, averageRate}: Props) {
    return(
        <>
            <div className={`comment-area ${evaluations.length === 0 ? "disabled" : ""}`}>
                <header>
                    <h2>Avaliaçãoes dos Usuários</h2>
                    <div className="average-rate-area">
                        <span>{averageRate}</span>
                        <div className="rate-area-count">
                            <StarRatings
                                starDimension="16px"
                                starSpacing="4px"
                                rating={averageRate}
                                starRatedColor="rgb(255 101 0)"
                                star-ratings
                                numberOfStars={5}
                                name='rating'
                            />
                            <span>({evaluations.length} avaliações)</span>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="horizontal-separator"></div>
                    {evaluations.map(evaluation => (
                        <>
                            <div  key={evaluation.rateId} className="comment-container">
                            
                                <div className="comment-info" >
                                    <span>{evaluation.userName}</span>
                                    <p>
                                        <span> Opinião: </span>
                                        <span>{evaluation.comment}</span>
                                    </p>
                                </div>
                               
                                <StarRatings 
                                    starDimension="16px"
                                    starSpacing="2px"
                                    rating={evaluation.rateValue}
                                    starRatedColor="rgb(255 101 0)"
                                    star-ratings
                                    numberOfStars={5}
                                    name='rating'
                                />
                            </div>

                            <div className="horizontal-separator"></div>
                        </>
                    ))}
                </main>
            </div>

            <div className={`empty-area ${evaluations.length > 0 ? "disabled": ""}`}>
                <h2> Esse Produto ainda não possui avaliações</h2>
            </div>
        </>
    );
}

export default CommentArea;