import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './styles.css';
import defaultImage from '../../helpers/DefaultImage';
import { toast } from 'react-toastify';

import PageHeader from '../../components/PageHeader';
import { OrderStatus } from '../../components/Success';
import LoadingSpinner from '../../components/LoadingSpinner';
import {Api} from '../../helpers/api'
import { OrderBydIdReponsesDto } from '../../helpers/Responses/orders/ordersResponses';
import React from 'react';

interface RouteParams {
    id: string;
}

interface OrderGetResponse {
    success: boolean;
    data: OrderBydIdReponsesDto
}


interface EvaluatePut {
    productCode: string;
    ratePoints: number;
    comment: string;
}

function OrderEvaluate() {
    toast.configure();
    const {id} = useParams<RouteParams>();
    const [order, setOrder] = useState<OrderBydIdReponsesDto>({} as OrderBydIdReponsesDto);
    const [loading, setLoading] = useState(true);
    const [invalidRate, setInvalidRate]= useState('');
    const [invalidComment, setInvalidComment]= useState('');
    const [rate, setRate] = useState<number | null>(null);
    const [comment, setComment] = useState<string | null>(null);


    useEffect(() => {
        async function getOrderById() {
            const requestUrl = `/order?orderId=${id}`;
    
            try{
                const response = await Api.apiOrders.get<OrderGetResponse>(requestUrl);
                const orderResponse: OrderGetResponse = response.data;
                setOrder(orderResponse.data);
                setLoading(false);
                
            } catch(err) {
                console.log('error', err);
                toast.error("Ocorreu um problema ao recuperar as informações desse pedido");
            }
        }

        getOrderById();
    },[id]);

    function handleRateChange(e: React.FormEvent<HTMLInputElement>) {
        setRate(parseFloat(e.currentTarget.value.replace(',', '.')));
    }

    function handleCommentChange(e: React.FormEvent<HTMLTextAreaElement>) {
        setComment(e.currentTarget.value);
    }

    async function handleSendEvaluations(statusId: number, productId: string) {

        if (statusId !== 3 ) {
            toast.error(`Você não pode avaliar uma ordem do tipo: ${OrderStatus[statusId]}`)
            return;
        }

        const rateIsValid = validateRate();
        const commentIsValid = validateComment();

        if (!rateIsValid || !commentIsValid) {
            toast.error("Você deve verificar os campos marcados de vermelho!")
            return;
        }

        const url = "/commodities/product/evaluate"
        const body: EvaluatePut = {
            productCode: productId,
            comment: comment as string,
            ratePoints: rate as number
        }

        try {
            await Api.apiProducts.put(url, body);
        } catch (error) {
            toast.error("Erro ao salvar sua avaliação tente novamente mais tarde!")
        }
    }

    function validateRate(): boolean {
        if (rate === null || rate > 5 || rate < 0) {
            setInvalidRate('invalid');
            return false;
        }
        setInvalidRate('');
        return true;
    }

    function validateComment(): boolean {
        if (comment === null || comment.length > 350) {
            setInvalidComment('invalid');
            return false;
        }

        setInvalidComment('');
        return true;
    }

    return (
        <>
            <PageHeader />
            <div className="my-order-container">
                {loading ?
                    <>
                        <LoadingSpinner />
                    </>
                    :
                    <>
                        <header>
                            <p>Status do pedido:</p>
                            <span>{OrderStatus[order.orderStatusId]}</span>
                        </header>
                        
                        <div className="horizontal-separator"></div>
                        <section>
                            <header>
                                <h3>Produto</h3>
                                <h3>Total</h3>
                            </header>

                            <div className="horizontal-separator"></div>
                            
                            <div className="order-items">
                                {order.orderItems.map(item => (
                                    <React.Fragment key={item.productId}>
                                        <div className="item">
                                            <div className="img-container">
                                                <img src={defaultImage} alt="imagem do produtos" />
                                                <div className="item-info">
                                                    <span>{item.productName}</span>
                                                    <span>Quantidade: {item.quantity}</span>
                                                </div>
                                            </div>

                                            <span className="price">R$ {(item.price * item.quantity).toLocaleString('pt-br')}</span>
                                        </div>

                                        {/* <div className="horizontal-separator"></div> */}
                                        <div className="evaluation">
                                            <h3>Avalie esse produto</h3>
                                            <div>
                                                <label> De sua opnião sobre o produto:</label>
                                                <textarea 
                                                    cols={70} rows={3} 
                                                    className={`${invalidComment}`}
                                                    onChange={handleCommentChange}
                                                    onPaste={handleCommentChange}
                                                />
                                            </div>

                                            <div>
                                                <label className="rate">De uma nota <span>(números entre 0 e 5)</span>:</label>
                                                <input 
                                                    type="text" 
                                                    onChange={handleRateChange} 
                                                    onPaste={handleRateChange}
                                                    className={`${invalidRate}`}
                                                />
                                            </div>

                                            <button className="button" onClick={() => handleSendEvaluations(order.orderStatusId, item.productId)}>Enviar</button>
                                        </div>
                                        <div className="horizontal-separator"></div>
                                    </ React.Fragment>
                                ))}
                            </div>
                        </section>
                    </>
                }
            </div>
        </>
    );
}

export default OrderEvaluate;
