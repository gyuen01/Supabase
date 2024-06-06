import supabase from "../src/config/supabaseClient";
import { useEffect, useState } from "react";

const Home = () => {
    const [fetchError, setFetchError] = useState(null);
    const [models, setModels] = useState(null);
    console.log(supabase);
    
    useEffect(() => {
        const fetchModels = async () => {  // Corrected function name and 'async' keyword
            const { data, error } = await supabase
                .from('Models')
                .select();

            if (error) {
                console.error("Fetch Error:", error);
                setFetchError('Could not fetch the models');  // Corrected typo in the error message
                setModels(null);
                console.log(error);
            }
            if (data) {
                console.log("Data:", data);
                setModels(data);
                setFetchError(null);
            }
        };
        
        fetchModels();

    }, []);
    //console.log("data", data);
    return (
        <div className="page Home">
            <h2>Home Gary</h2>
            {fetchError && (<p>{fetchError}</p>)}
            {models && (
                <div className="Models">
                    {models.map(model => (
                        <div key={model.id}>
                            <p>Model Name: {model.modelname}</p>
                            <p>Created Date: {new Date(model.createdDate).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;

