import axios from "axios";
import { config } from "../../config";

export interface EmsDrugs {
    id: number,
    name: string,
    latin_name: string,
    dose?: string,
    route?: string,
}

export async function getEmsDrugs(){
    try {
        const result = await axios.get(`${config.website}/api/ems/drugs`, {
          headers: {
            "ngrok-skip-browser-warning":"any"
          }
        });
        return result.data
    } catch (error) {
        console.log(error);
    }
}