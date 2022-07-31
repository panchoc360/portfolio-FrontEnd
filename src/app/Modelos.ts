export interface Persona{
    idPersona?: number;
    nombre: string;
    email: string;
    telefono: string;
    acercade: string;
    urlImagenPerfil: string;
    urlImagenPortada: string;
}
export interface Experiencia{
    idExperiencia?: number;
    nombreLugar: string;
    cargoOcupado: string;
    inicio: string;
    fin: string;
    descripcion: string;
    urlLogo: string;
    urlWebPage: string;
}
export interface Educacion{
    idEducacion: number;
    nombreInstitucion: string;
    titulo: string;
    inicio: string;
    fin: string;
    urlImagen: string;
}
export interface Skill{
    idSkill?: number;
    skill: string;
    nivel: number;
}
export interface Proyecto{
    idProyecto?: number;
    nombre: string;
    fecha: number;
    descripcion: string;
    url: string;
    urlImagen: string;
}