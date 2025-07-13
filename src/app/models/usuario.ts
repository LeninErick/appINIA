export interface USUARIO {
    id?: string;
    nombUsua: string;
    apelUsua: string;
    rolUsua: 'Admin' | 'Técnico' | 'Consultor' | 'Vendedor';
    teleUsua: string;
    dniUsua: string;
    corrUsua: string;
    estaUsua: boolean;
    fotoUsua: string; // URL en Cloudinary
}
