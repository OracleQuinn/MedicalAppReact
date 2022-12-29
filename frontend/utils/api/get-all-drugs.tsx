import axios from "axios";
import { config } from "../../config";

export interface Drugs {
    id: number, 
    name: string, 
    used_name: string, 
    type: string, 
    previous_name: string, 
    target_species: string, 
    power: string, 
    pharmaceutical_form: string, 
    active_substance: string,
}

export async function getAllDrugs(){
    try {
        const result = await axios.get(`${config.website}/api/drugs`, {
          headers: {
            "ngrok-skip-browser-warning":"any"
          }
        });
        return result.data
    } catch (error) {
        console.log(error);
    }
}