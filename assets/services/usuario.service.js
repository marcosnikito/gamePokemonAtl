angular.module('pokemon').factory('usuarioService', usuarioService);

usuarioService.$inject = ['$http'];

function usuarioService($http) {
 var _userSession = [];
 var _attrSession = function(usuario){
  if(usuario != null){
	_userSession.pop();
   _userSession.push(usuario);
	  console.log("joguei o usuario na sessão!");
	  console.log(_userSession[0]);
   return true;
  }else{
    return false;
  }
 }
    return {
        attrSession: _attrSession,
		usuarioAtual: _userSession
    };
}