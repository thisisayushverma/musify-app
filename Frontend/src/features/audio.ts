import config from "../config/config"

const backendUrl = config.backendUrl + "/audio";


interface IUploadFileCredentials {
    file:File
}
const uplaodAudioFile = async ({file}:IUploadFileCredentials)=>{
    try {
        const formData = new FormData();
        formData.append("audio",file)
        const response = await fetch(backendUrl+"/upload-audio",{
            credentials:"include",
            method:"POST",
            body:formData
        })
        .then((res)=>res.json())
        .then((result)=>{
            console.log("result",result);
            return result
        })
        return response;
    } catch (error) {
        throw error
    }
}




interface IAudioSchema{
    title:string,
    genre:string[],
    isPublic:boolean,
    thumbnail:File,
    tags:string[],
    audioId:string,
    duration:number
}
const createAudioSchema = async ({title,genre,isPublic,duration,thumbnail,tags,audioId}:IAudioSchema)=>{
    try {
        const formData = new FormData();
        formData.append("thumbnail",thumbnail)
        formData.append("duration",JSON.stringify(duration))
        formData.append("audioUuId",audioId)
        formData.append("title",title)
        // formData.append("genre",JSON.stringify(genre))
        genre.forEach((genre)=>{
            formData.append("genre",genre)
        })
        formData.append("isPublic",JSON.stringify(isPublic))
        // formData.append("tags",JSON.stringify(tags))
        tags.forEach((tag)=>{
            formData.append("tags",tag)
        })
        const response = await fetch(backendUrl+"/create-audio",{
            credentials:"include",
            method:"POST",
            body:formData
        })
        .then((res)=>res.json())
        .then((data)=> data)

        console.log("audio schema created",response);
        return response;
    } catch (error) {
        throw error
    }
}


const getAllYourAudio = async()=>{
    try {
        const response = await fetch(config.backendUrl+"/audio/your-library",{
            credentials:"include",
            method:"GET"
        })
        .then((res)=> res.json())
        .then((data)=>{
            return data;
        })

        if(response.status !== 201){
            throw new Error(response.message)
        }

        return response;
    } catch (error) {
        alert("error while getting your audio" + error);
    }
}

const getTopHits = async()=>{
        try {
            const response = await fetch(config.backendUrl+"/audio/top-hits",{
                credentials:"include",
                method:"GET"
            })
            
            if(!response.ok){
                throw new Error("error while getting top hits"+response);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            
        }
}

const getNewReleases = async()=>{
    try {
        const response = await fetch(config.backendUrl+"/audio/new-releases",{
            credentials:"include",
            method:"GET"
        })

        if(!response.ok){
            throw new Error("error while getting top hits"+response);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export {
    uplaodAudioFile,
    createAudioSchema,
    getAllYourAudio,
    getTopHits,
    getNewReleases
}