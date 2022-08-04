import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultImagesService {
  
  logoAP = "https://github.com/AaronRWCortez/Portfolio-Imagenes-YoProgramo/blob/main/Header/APLogo.png?raw=true";
  redSocial = "https://github.com/AaronRWCortez/Portfolio-Imagenes-YoProgramo/blob/main/Header/Default-RedSocial.png?raw=true";
  banner = "https://github.com/AaronRWCortez/Portfolio-Imagenes-YoProgramo/blob/main/Acerca-De/Default-Banner.jpg?raw=true";
  perfil = "https://github.com/AaronRWCortez/Portfolio-Imagenes-YoProgramo/blob/main/Acerca-De/Default-Perfil.jpg?raw=true";
  experiencia = "https://raw.githubusercontent.com/AaronRWCortez/Portfolio-Imagenes-YoProgramo/a58b0b67d72f8c53f9ab440130fbfba23a3b9cec/Experiencia/exp.svg";
  educacion = "https://raw.githubusercontent.com/AaronRWCortez/Portfolio-Imagenes-YoProgramo/a58b0b67d72f8c53f9ab440130fbfba23a3b9cec/Educacion/Default-Edu.svg";
  skill = "https://github.com/AaronRWCortez/Portfolio-Imagenes-YoProgramo/blob/main/Skills/PH.png?raw=true";
  proyecto = "https://github.com/AaronRWCortez/Portfolio-Imagenes-YoProgramo/blob/main/Proyectos/Default-Proyecto.jpg?raw=true"



  constructor() { }
}
