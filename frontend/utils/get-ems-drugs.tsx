import axios from "axios";

export interface EmsDrugs {
    id: number,
    name: string,
    latin_name: string,
}

export async function getEmsDrugs(){
    try {
        const result = await axios.get('https://40dd-2a02-a317-a036-9e00-904f-29b-e4e2-3a46.eu.ngrok.io/api/ems/drugs', {
          headers: {
            "ngrok-skip-browser-warning":"any"
          }
        });
        return result.data
    } catch (error) {
        console.log(error);
    }
}