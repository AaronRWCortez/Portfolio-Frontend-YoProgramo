import { Persona } from "./persona";

export class Educacion {
    id?: number;
    lugar!: string;
    titulo!: string;
    descripcion!: string;
    startDate!: string;
    endDate!: string;
    imgBool!: boolean;
    img!: string;
    persona!: Persona
}
