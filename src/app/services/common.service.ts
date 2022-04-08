import { Injectable } from "@angular/core";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";

@Injectable({
  providedIn: "root"
})
export class CommonService {

  constructor() { }

  about = {
      nombres: "Aaron Ramiro Waldemar",
      apellidos: "Cortez",
      titulo: "Full Stack Developer Jr",
      lugar: "Cordoba(Argentina)",
      descripcion: "Tengo 19 años y estudio programacion, me gusta dibujar y me interesa el desarrollo de videojuegos.",

  }

  exp = [
    { lugar: "Mis Soles",
      puesto: "Diseñador Grafico",
      startDate:  2015,
      endDate: "actualidad",
      descripcion: "Diseño y digitalización de logos para eventos y agrupaciones.",
    },
      { lugar : "Pasteleria LiLu",
      puesto: "Ayudante de pasteleria",
      startDate:  2019,
      endDate: "actualidad",
      descripcion: "Auxiliar de pastelero y envasado de productos.",
    },
/*    { lugar : "",
      puesto: "",
      startDate:  "",
      endDate: "",
      descripcion: "",
    }*/
  ]

  edu = [
    { lugar : "Argentina Programa (#SeProgramar - #YoProgramo)",
      titulo: "Full Stack Developer Jr",
      startDate:  2021,
      endDate: 2022,
      descripcion: "",
      img: "../../../assets/APicon.png"
    },
    { lugar : "IPEA y M 224 Leopoldo Lugones",
      titulo: "Bachiller en Ciencias Naturales",
      startDate:  "2014",
      endDate: "2020",
      descripcion: "",
      img: "../../../assets/APicon.png"
    },
    /*{ lugar : "",
      titulo: "",
      startDate:  "",
      endDate: "",
      descripcion: "",
    },*/
  ]

  proj = [
    { titulo: "Portafolio Web",
      fecha: 2022,
      descripcion: "Proyecto final integrador de Argentina Programa",
      img: "../../../assets/portPrj.png",
    },
    { titulo: "Placeholder",
      fecha: 2022,
      descripcion: "Descripcion Placeholder",
      img:"../../../assets/portPrj.png",
    },
    /*{ titulo: "",
      fecha: ,
      descripcion: "",
      img:"",
    },*/
  ]

  skills = [
    { titulo: "HTML",
      percent: "90",
      color: "#ff3300",
      colorGr:"#ff9500",
      img: "../assets/HTML5.svg"
    },
    { titulo: "CSS",
      percent: "85",
      color: "#144ac8",
      colorGr:"#00d5ff",
      img: "../assets/CSS3.svg"
    },
    { titulo: "JavaScript",
      percent: "70",
      color: "#ffea00",
      colorGr:"#ffae52",
      img: "../assets/JS.svg",
      customW: 70,
      customH:70,
    },
    { titulo: "Ingles",
      percent: "50",
      color: "#144ac8",
      colorGr:"#00d5ff",
      img: "../assets/ingles.png",
    },
    { titulo: "PlaceHolder",
      percent: "95",
      color: "#242424",
      colorGr:"#7a7a7a",
      img: "../assets/PH.png",
    },
    { titulo: "PlaceHolder2",
      percent: "95",
      color: "#242424",
      colorGr:"#7a7a7a",
      img: "../assets/PH.png",
    },
  ]

  traerAbout(){
    return(this.about);
  }

  traerExp(){
    return(this.exp);
  }
  traerEdu(){
    return(this.edu);
  }
  traerProj(){
    return(this.proj);
  }
  traerSkills(){
    return(this.skills);
  }
}



