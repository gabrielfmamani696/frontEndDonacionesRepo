export const environment = {
    urlAuthLogin: 'http://localhost:8090/auth/login',
    urlRegistroVoluntarios: 'http://localhost:8090/auth/registerVol',
    urlRegistroRepOrgBenefica: 'http://localhost:8090/auth/registerOB',
    urlObtenerSolicitudUsuarios: 'http://localhost:8090/allUsuarios',
    urlUsuarioID: 'cambiar',
    urlRaroID: 'http://localhost:8090/nuestraOrg/',
    urlFormSolUsuario: 'http://localhost:8090/auth/register', //post, registra usuario, correo unico
    urlGetAllUsuarioRechazadoInabilitadoPendiente: 'http://localhost:8090/messageUser/getPostUsuario',
    urlAceptarUsuario: 'http://localhost:8090/messageUser/acceptUser/',
    urlRechazarUsuario: 'http://localhost:8090/messageUser/refusedUser/',
    urlInhabilitarUsuario: 'http://localhost:8090/messageUser/inabilitarUser/', //para usuarios q habian sido aceptados
    urlUsuariosHabilitados: 'http://localhost:8090/messageUser/getHabilitados', //
    urlDatosBasicosDeUsuario: 'http://localhost:8090/user/getSimpleUser', // Datos basicos de Usuario, mediante correo
    urlEscogerSubRolVol: 'http://localhost:8090/userPostRol/escogerSubRolVol', // POST, 'subrol' puede tener los siguinetes valores: Colaborador, Responsable
    urlGetAllPostulantesSubRolVol: 'http://localhost:8090/userPostRol/getAllPostulantesSubRolVol', //Obtener a todos los mensajes de los usuario voluntario que postulan(Responsable, Colaborador)
    urlUserPostRolAcceptMessageUserVol: 'http://localhost:8090/userPostRol/acceptMessageUserVol/',
    urlUserPostRolDeletteMessageUserVol: 'http://localhost:8090/userPostRol/deleteMessageUserVol/',
    urlUserPostRolRefusedMessageUserVol: 'http://localhost:8090/userPostRol/refusedMessageUserVol/',




    urlAceptarUsuarioVoluntario: '',
    urlInabilitarUsuario: 'http://localhost:8090/messageUser/inabilitarUser/', //Inabilitar usuario
    urlRechazarUsuarioVoluntario: '',

    urlAceptarUsuarioDonante: 'http://localhost:8090/messageUser/acceptMUserRol/',
    urlRechazarUsuarioDonante: 'http://localhost:8090/messageUser/refusedMUserRol/',


    urlFormRepOrgBenefica: '',
    urlFormRepOrgDonadora: '',

    urlFormDonacion: 'http://localhost:8090/donaciones/realizarDonacion', //
    urlFormAlimento: 'http://localhost:8090/donaciones/terminarDonacionAlimentos', //
    urlFormProducto: 'http://localhost:8090/donaciones/terminarDonacionProductos', //

    urlDataTblAlimentoRecoger: '/', //
    urlDataTblAlimentoEntregar: '/', //
    urlDataTblProductoRecoger: '/', //
    urlDataTblProductoEntregar: '/', //


    
    
    urlRegistroResponsableRecogerAlimento: '/', //
    urlNroColaboradoresParaResponsableRecogerAlimento: '/', //

    
    urlRegistroResponsableRecogerProducto: '/', //
    urlNroColaboradoresParaResponsableRecogerProducto: '/', //

    urlEnviarRolEscoger: 'http://localhost:8090/userPostRol/escogerRol', //Enviar el rol a escoger, post


    urltblDataSolDonante: 'http://localhost:8090/messageUser/getPostAllDonantes', //Obtener a postulantes Donantes
    urlGetAllPostulantesRolVol: 'http://localhost:8090/userPostRol/getAllPostulantesRolVol', //Obtener a postulantes voluntario
    urlAceptarPostulantesRolVol: 'http://localhost:8090/messageUser/acceptMUserRol/', //aceptr a postulantes voluntario
    urlRechazarPostulantesRolVol: 'http://localhost:8090/messageUser/refusedMUserRol/', //rechazar a postulantes voluntario



    urlObtenerPostulantesDonantesRepresentantes: 'http://localhost:8090/messageUser/getPostDonantesOrg', //Obtener a postulantes Donantes Representantes
    urlGetDonNoRealizadas: 'http://localhost:8090/donaciones/getDonNoRealizadas', //En salida: el atrib1uto 'estado' puede tener los siguientes valores: SinResponsable, Pendiente, Realizado.
    urlEscogerDonResponsable: 'http://localhost:8090/voluntarioUser/escogerDonResponsable', //Que un usuario voluntario Responsable puede escoger donacion
    urlEstablecerNroVolDonC: 'http://localhost:8090/voluntarioUser/establecerNroVolDonC', //Que un usuario voluntario Responsable puede escoger donacion
    urlEscogerDonColaborador: 'http://localhost:8090/voluntarioUser/escogerDonColaborador', //Que un usuario voluntario Responsable puede escoger donacion




    urlGetPostAllReceptores: 'http://localhost:8090/messageUser/getPostAllReceptores', //Despliqgue de solicitud de receptores
    urlGetAllAlimentos: 'http://localhost:8090/alimentos/getAllAlimentos', //Obtener todos los alimnetos del inventario
    urlGetAllProductos: 'http://localhost:8090/productos/getAllProductos', //Obtener todos los productos del inventario
    urlRealizarSolicitudBene: 'http://localhost:8090/solicitudes/realizarSolicitud', //Realizar una Solicitud, accion que puede realizar un Usuario Receptor
    urlGetAllSolicitudB: 'http://localhost:8090/solicitudes/getAllSolicitud', //Mostrar las Solicitudes anteriroes

    urlEscogerSolResponsable : 'http://localhost:8090/voluntarioUser/escogerSolResponsable ', //Receptores
    urlEstablecerNroVolSolC: 'http://localhost:8090/voluntarioUser/establecerNroVolSolC', //Receptores
    urlEscogerSolColaborador: 'http://localhost:8090/voluntarioUser/escogerSolColaborador', //Receptores


    urlGetAllVoluntarios: 'http://localhost:8090/voluntarioUser/getAllVoluntarios', //Obtener a TODOS los voluntarios
    urlGetAllDonantes: 'http://localhost:8090/donanteUser/getAllDonantes', //Obtener a TODOS los donantes
    urlGetAllReceptores: 'http://localhost:8090/receptorUser/getAllReceptores', //Obtener a TODOS los receptores

    urlGetAllDonacionesResponsable: 'http://localhost:8090/donaciones/getAllDonacionesResponsable', //Obtener a 
    urlGetAllDonacionesColaborador: 'http://localhost:8090/donaciones/getAllDonacionesColaborador', //Obtener a 


    
}