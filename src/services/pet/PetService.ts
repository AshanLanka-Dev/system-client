import axios from 'axios';


const PetService = () => {

    const baseUrl = import.meta.env.VITE_BASE_URL;


    const getAllPets = async () => {
        return axios.get(baseUrl,{withCredentials:true});
    }

    const createPet = async (pet:any) => {
        return axios.post(`${baseUrl}/pets/register`, {...pet},{withCredentials:true})
    }

    const updatePet = async (pet:any, petId:string) => {
        return axios.put(`${baseUrl}/pets/update/${petId}`, {...pet},{withCredentials:true})
    }

    const deletePet = async (petId:string) => {
        return axios.delete(`${baseUrl}/$${petId}`,{withCredentials:true});
    }

}

export default PetService;