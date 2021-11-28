import PageHeader from '../../components/PageHeader';
import './styles.css';

function AboutUs() {
    return(
        <>
        <PageHeader />
        <div className="container-aboutus">
            <header>
                <h2>Quem Somos</h2>
            </header>
            
            <section>
                <p>Fundada no ano de 2020, a <strong>Buckstore</strong> é uma empresa que trabalha com os mais variados produtos, atuando principalmente no setor de informática e equipamentos eletrônicos em geral, área bastante competitiva e em constante crescimento, onde qualidade, variedade, garantia e eficiência são critérios importantíssimos para total satisfação, confiança e preferência de nossos consumidores.</p>

                <p>Procuramos acima de tudo oferecer o que há de melhor, os melhores fornecedores, os mais atualizados produtos, o mais atencioso dos atendimentos, juntamente com os preços mais competitivos e atraentes do mercado para que nosso público encontre não apenas variedade e qualidade, mas também uma empresa que se preocupa com a felicidade e total satisfação de seus clientes e por que não, amigos!</p>

                <p>Aproveite nossos serviços!</p>
            </section>
        </div>
    </>
    );
}

export default AboutUs;