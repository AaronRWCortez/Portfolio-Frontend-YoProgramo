import { Persona } from "./persona";

export class InfoContacto {
    id?: number;
    nombre!: string;
    valor!: string;
    visibilidad!: boolean;
    persona!: Persona
}
