import { Persona } from "./persona";

export class Experiencia {
    id?: number;
    lugar!: string;
    puesto!: string;
    descripcion!: string;
    startDate!: string;
    endDate!: string;
    imgBool!: boolean;
    img!: string;
    persona!: Persona
}
