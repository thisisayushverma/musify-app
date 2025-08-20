import config from "../config/config.ts";


const createPlaylistHandler = async (formData:FormData)=>{
    try {
        const response = await fetch(`${config.backendUrl}/playlist/create`,{
            credentials:"include",
            method:"POST",
            body:formData
        })

        if(!response.ok) throw new Error("error while creating playlist");

        const data = await response.json();
        return data;

    } catch (error) {
        alert(error);
        return null;
    }
}


export {
    createPlaylistHandler
}