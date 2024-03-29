import { useState } from 'react';
import { FaArrowDown, FaPlusSquare, FaTimesCircle } from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';
import Dropzone from 'react-dropzone'
import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Api } from '../../helpers/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import {useHistory} from 'react-router-dom';
import { AuthenticationRoutes } from '../../helpers/Authentication/authenticationRoutes';


export interface ProductCategory {
    id: string;
    name: string;
}

interface MyFile extends File{
}
function NewProduct() {
    toast.configure();
    const history = useHistory();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [initialStock, setInitialStock] = useState("");
    const [category, setCategory] = useState("0");
    const [images, setImages] = useState<MyFile[]>([]);
    const [isLoading, setLoading] = useState(false);



    const categories:ProductCategory[] = [
        {id: "0", name: "Selecionar"},
        {id: "1", name: "Gamer"},
        {id: "2", name: "SmartPhones"},
        {id: "3", name: "Pc"},
        {id: "4", name: "Periféricos"},
        {id: "5", name: "Hardware"},
        {id: "6", name: "Office"}
    ];

    function handleImageDrop(files: MyFile[]) {
        files.map(file => setImages([...images, file]));
    }

    function getFileUrl(file: File): string {
        return URL.createObjectURL(file);
    }

    async function handleProductCreation(e: any) {
        e.preventDefault();
        if (category === "0") {
            toast.error("Dados inválidos verifique e tente novamente");
            return;
        }

        if (description.length > 300) {
            toast.warning(`A descrição do produto pode ter no máximo 300 caracteres. ${description.length}`);
            return;
        }
        const body = new FormData();
        body.append("name", name);
        body.append("description", description);
        body.append("price", price.toString().replace(",", "."));
        body.append("initialStock", initialStock);
        body.append("category", category.toString());

        images.map(image => body.append("images", image));

        try {
            setLoading(true);
            await Api.apiManager.post("/product", body);
            handleCleanState();
            setLoading(false);
            toast.success("Produto cadastrado com sucesso");
        } catch (error) {
            setLoading(false);
            toast.error("Ocorreu um erro ao cadastrar este produto, tente novamento");
        }
    }

    function handleCleanState() {
        setName("");
        setDescription("");
        setPrice("");
        setInitialStock("");
        setCategory("");
        setImages([]);
        setCategory("0");
    }

    function handleCategorySelection(e: React.FormEvent) {
        const target = e.target as HTMLSelectElement;

        setCategory(target.value)
    }

    function handleBack() {
        history.push(AuthenticationRoutes.productManagement)
    }

    function handleImageRemove(imageName: string) {
        setImages([...images.filter(item => item.name !== imageName)]);
    }

    return(
    <>
        <PageHeader />
        <>
            <LoadingSpinner visible={isLoading}/>
            <div className={`register-employee-container ${isLoading ? 'invisible' : 'visible'}` }>
                <header>
                    <FaPlusSquare />
                    <h2> Cadastrar produto</h2>
                </header>
                
                <section>
                    <div className="employee-filters">
                        <span>Categoria: </span>
                        <select name="filters" id="employee-filters" onChange={e => handleCategorySelection(e)} value={category}>
                            {categories.map(value => (
                                <option value={value.id}>{value.name}</option>
                            ))}
                        </select>

                        <FaArrowDown />
                    </div>
                    
                    <form >
                        <input type="text" 
                            required={true}
                            placeholder="Nome"
                            onChange={e => setName(e.target.value)}
                            onPaste={e => setName(e.currentTarget.value)} 
                            value={name}
                        />
                        <input type="text"
                            required={true}
                            placeholder="Preço" 
                            onChange={e => setPrice(e.target.value)}
                            onPaste={e => setPrice(e.currentTarget.value)}
                            value={price} 
                        />
                        <input type="text"
                            required={true}
                            placeholder="Estoque" 
                            onChange={e => setInitialStock(e.target.value)}
                            onPaste={e => setInitialStock(e.currentTarget.value)} 
                            value={initialStock}
                        />
                        <div>
                            <textarea name="description" 
                                id="description"
                                cols={50} 
                                rows={8}
                                placeholder={"Descrição"}
                                onChange={e => setDescription(e.target.value)}
                                onPaste={e => setDescription(e.currentTarget.value)}
                                value={description}
                            >
                            </textarea>
                        </div>
                    
                    <div id="images-container">
                        <Dropzone onDropAccepted={handleImageDrop}>
                                {({getRootProps, getInputProps}) => (
                                    <div className="upload" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Arraste um arquivo ou clique aqui!</p>
                                    </div>
                                )}
                        </Dropzone>

                        <ul>
                            {images.map(file => (
                                <li key={file.name}>
                                    <div>
                                    <FaTimesCircle onClick={() => handleImageRemove(file.name)}/>
                                    <img src={getFileUrl(file)} alt="" />
                                    </div>
                                    <strong>{file.name}</strong>
                                </li>
                            ))}
                        </ul>
                    </div>

                        <div className="button-container">
                            <button className="button" onClick={handleBack}>
                                Voltar
                            </button>
                            <button className="button" type="submit" onClick={handleProductCreation}>Cadastrar</button>
                        </div>
                    
                    </form>
                </section>
            </div>
        </>
    </>
    )
}

export default NewProduct;