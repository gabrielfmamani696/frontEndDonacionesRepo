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
}