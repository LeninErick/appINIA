// src/app/config/modal-configuraciones.ts
export const MODAL_CONFIGURACIONES: Record<string, {
    columnas: string[];
    tipos: Record<string, string>;
    referencias?: Record<string, string>;
    }> = {

        CUY: {
            columnas: [
            'nombCuy', 'sexoCuy', 'pesonaciCuy',
            'fechnaciCuy', 'estaCuy', 'idPoza',
            'idRaza', 'idArbo'
            ],
            tipos: {
            nombCuy: 'texto',
            sexoCuy: 'opciones',
            pesonaciCuy: 'numero',
            fechnaciCuy: 'fecha',
            estaCuy: 'texto',
            idPoza: 'referencia',
            idRaza: 'referencia',
            idArbo: 'referencia'
            },
            referencias: {
            idPoza: 'POZA',
            idRaza: 'RAZA',
            idArbo: 'ARBOL'
            }
        },

        ARBOL: {
            columnas: ['fechregiArbo', 'genoArbo', 'nombArbo'],
            tipos: {
            fechregiArbo: 'fecha',
            genoArbo: 'texto',
            nombArbo: 'texto'
            }
        },

        camada: {
            columnas: ['cantcriaCama', 'fechnachiCama', 'idCruz'],
            tipos: {
            cantcriaCama: 'numero',
            fechnachiCama: 'fecha',
            idCruz: 'referencia'
            },
            referencias: {
            idCruz: 'CRUZAMIENTO'
            }
        },

        cliente: {
            columnas: ['nombClie', 'dniClie', 'teleClie', 'direClie', 'corrClie'],
            tipos: {
            nombClie: 'texto',
            dniClie: 'texto',
            teleClie: 'texto',
            direClie: 'texto',
            corrClie: 'texto'
            }
        },

        control: {
            columnas: ['condCont', 'fechCont', 'idPers', 'pesoCont'],
            tipos: {
            condCont: 'texto',
            fechCont: 'fecha',
            idPers: 'referencia',
            pesoCont: 'numero'
            },
            referencias: {
            idPers: 'PERSONAL'
            }
        },

        CRUZAMIENTO: {
            columnas: ['idCuyhemb', 'idCuymach', 'idPers', 'obseCruz', 'nombCruz'],
            tipos: {
            idCuyhemb: 'referencia',
            idCuymach: 'referencia',
            idPers: 'referencia',
            obseCruz: 'texto',
            nombCruz: 'texto'
            },
            referencias: {
            idCuyhemb: 'CUY',
            idCuymach: 'CUY',
            idPers: 'PERSONAL'
            }
        },

        GALPON: {
            columnas: ['capaGalp', 'nombGalp', 'tipoGalp', 'ubicGalp'],
            tipos: {
            capaGalp: 'numero',
            nombGalp: 'texto',
            tipoGalp: 'texto',
            ubicGalp: 'texto'
            }
        },

        PERSONAL: {
            columnas: ['cargPers', 'espePers', 'idUsua'],
            tipos: {
            cargPers: 'texto',
            espePers: 'texto',
            idUsua: 'referencia'
            },
            referencias: {
            idUsua: 'USUARIO'
            }
        },

        POZA: {
            columnas: ['capaPoza', 'descPoza', 'idGalp', 'numePoza', 'tipoPoza'],
            tipos: {
            capaPoza: 'numero',
            descPoza: 'texto',
            idGalp: 'referencia',
            numePoza: 'numero',
            tipoPoza: 'texto'
            },
            referencias: {
            idGalp: 'GALPON'
            }
        },

        RAZA: {
            columnas: ['aptiRaza', 'caraRaza', 'nombRaza', 'origRaza', 'pesopromRaza'],
            tipos: {
            aptiRaza: 'texto',
            caraRaza: 'texto',
            nombRaza: 'texto',
            origRaza: 'texto',
            pesopromRaza: 'numero'
            }
        },


        RETIRO: {
            columnas: ['fechReti', 'idPers', 'motiReti', 'obseReti'],
            tipos: {
            fechReti: 'fecha',
            idPers: 'referencia',
            motiReti: 'texto',
            obseReti: 'texto'
            },
            referencias: {
            idPers: 'PERSONAL'
            }
        },

        TRATAMIENTO: {
            columnas: [
            'dosiTrat', 'duradiasTrat', 'frecTrat',
            'idPers', 'mediTrat', 'obseTrat', 'tipoTrat'
            ],
            tipos: {
            dosiTrat: 'texto',
            duradiasTrat: 'número',
            frecTrat: 'texto',
            idPers: 'referencia',
            mediTrat: 'texto',
            obseTrat: 'texto',
            tipoTrat: 'texto'
            },
            referencias: {
            idPers: 'PERSONAL'
            }
        },

        USUARIO: {
            columnas: [
            'nombUsua', 'apelUsua', 'rolUsua', 'teleUsua',
            'dniUsua', 'corrUsua', 'estaUsua', 'fotoUsua'
            ],
            tipos: {
            nombUsua: 'texto',
            apelUsua: 'texto',
            rolUsua: 'seleccion', // Valores restringidos
            teleUsua: 'texto',
            dniUsua: 'texto',
            corrUsua: 'texto',
            estaUsua: 'booleano',
            fotoUsua: 'imagen' // Asumiendo que se sube a Cloudinary
            }
        },

        VENTA: {
            columnas: ['fechVent', 'idClie', 'idPers', 'obseVent', 'precVent'],
            tipos: {
            fechVent: 'fecha',
            idClie: 'referencia',
            idPers: 'referencia',
            obseVent: 'texto',
            precVent: 'numero'
            },
            referencias: {
            idClie: 'CLIENTE',
            idPers: 'PERSONAL'
            }
        }

};
