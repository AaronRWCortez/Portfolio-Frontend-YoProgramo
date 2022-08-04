import { Persona } from "./persona";

export class Proyecto {
    id?: number;
    titulo!: string;
    fecha!: string;
    descripcion!: string;
    enlace!: string;
    img!: string;
    persona!: Persona
}
