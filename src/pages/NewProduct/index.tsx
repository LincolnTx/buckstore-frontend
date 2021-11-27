import { useState } from 'react';
import { FaArrowDown, FaPlusSquare } from 'react-icons/fa';
import PageHeader from '../../components/PageHeader';
import Dropzone from 'react-dropzone'
import './styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Api } from '../../helpers/api';


export interface ProductCategory {
    id: string;
    name: string;
}

interface MyFile extends File{
}
function NewProduct() {
    toast.configure();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [initialStock, setInitialStock] = useState("");
    const [category, setCategory] = useState("0");
    const [images, setImages] = useState<MyFile[]>([]);



    const categories:ProductCategory[] = [
        {id: "0", name: "Selecionar"},
        {id: "1", name: "Gamer"},
        {id: "2", name: "SmartPhones"},
        {id: "3", name: "Pc"},
        {id: "4", name: "Gadgets"},
        {id: "5", name: "Hardware"},
        {id: "6", name: "Office"}
    ];

    function handleImageDrop(files: MyFile[]) {
        console.log('files', files)
        
        files.map(file => setImages([...images, file]));
    }

    function getFileUrl(file: File): string {
        console.log(URL.createObjectURL(file))

        return URL.createObjectURL(file);
    }

    async function handleProductCreation() {
        if (category === "0") {
            toast.error("Dados inválidos verifique e tente novamente");
            return;
        }
        const body = new FormData();
        body.append("name", name);
        body.append("description", description);
        body.append("price", priceFormatter());
        body.append("initialStock", initialStock);
        body.append("category", category.toString());

        images.map(image => body.append("images", image));

        try {
            await Api.apiManager.post("/product", body);
            toast.success("Produto cadastrado com sucesso");
        } catch (error) {
            toast.error("Ocorreu um erro ao cadastrar este produto, tente novamento");
        }
    }

    function priceFormatter(): string {
        const fixedPrice = parseFloat(price.toString().replace(',', '.'));

        return fixedPrice.toString();
    }
    function handleCategorySelection(e: React.FormEvent) {
        const target = e.target as HTMLSelectElement;

        setCategory(target.value)
    }

    return(
        <>
        <PageHeader />
        <div className="register-employee-container">
            <header>
                <FaPlusSquare />
                <h2> Cadastrar produto</h2>
            </header>
            
            <section>
                <div className="employee-filters">
                    <span>Categoria: </span>
                    <select name="filters" id="employee-filters" onChange={e => handleCategorySelection(e)}>
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
                    />
                    <input type="text"
                        required={true}
                        placeholder="Preço" 
                        onChange={e => setPrice(e.target.value)}
                        onPaste={e => setPrice(e.currentTarget.value)} 
                    />
                    <input type="text"
                        required={true}
                        placeholder="Estoque" 
                        onChange={e => setInitialStock(e.target.value)}
                        onPaste={e => setInitialStock(e.currentTarget.value)} 
                    />
                     <div>
                        <textarea name="description" 
                            id="description"
                            cols={50} 
                            rows={8}
                            placeholder={"Descrição"}
                            onChange={e => setDescription(e.target.value)}
                            onPaste={e => setDescription(e.currentTarget.value)}
                        >
                        </textarea>
                    </div>
                   
                   {/* imagens vem aqui */}

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
                                   <img src={getFileUrl(file)} alt="" />
                                   <strong>{file.name}</strong>
                               </li>
                           ))}
                       </ul>
                   </div>

                    <div className="button-container">
                        <button className="button">
                            Voltar
                        </button>
                        <button className="button" type="submit" onClick={handleProductCreation}>Cadastrar</button>
                    </div>
                   
                </form>
            </section>
        </div>
   </>
    )
}

export default NewProduct;