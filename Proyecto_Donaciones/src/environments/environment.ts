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




    urlAceptarUsuarioVoluntario: '',
    urlInabilitarUsuario: 'http://localhost:8090/messageUser/inabilitarUser/', //Inabilitar usuario
    urlRechazarUsuarioVoluntario: '',

    urlAceptarUsuarioDonante: 'http://localhost:8090/messageUser/acceptMUserRol/',
    urlRechazarUsuarioDonante: 'http://localhost:8090/messageUser/refusedMUserRol/',


    urlFormRepOrgBenefica: '',
    urlFormRepOrgDonadora: '',

    urlFormDonacion: '/', //
    urlFormAlimento: '/', //
    urlFormProducto: '/', //

    urlDataTblAlimentoRecoger: '/', //
    urlDataTblAlimentoEntregar: '/', //
    urlDataTblProductoRecoger: '/', //
    urlDataTblProductoEntregar: '/', //


    
    
    urlRegistroResponsableRecogerAlimento: '/', //
    urlNroColaboradoresParaResponsableRecogerAlimento: '/', //

    
    urlRegistroResponsableRecogerProducto: '/', //
    urlNroColaboradoresParaResponsableRecogerProducto: '/', //

    urlEnviarRolEscoger: 'http://localhost:8090/userPostRol/escogerRol', //Enviar el rol a escoger, post


    urltblDataSolVoluntario: 'http://localhost:8090/messageUser/getPostAllDonantes', //mostrat tabala de solicitud de usuarios para voluntario/Obtener a postulantes Donantes
}