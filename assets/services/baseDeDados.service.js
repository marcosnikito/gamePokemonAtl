angular.module('pokemon').factory('baseDeDadosService', baseDeDadosService);

baseDeDadosService.$inject = ['$http'];

function baseDeDadosService($http) {
 var _usuarios = [{
  email: "marcos@email.com", usuario: "marcos123", senha: "123456"
 },{
  email: "pedro@email.com", usuario: "pedro123", senha: "123456"
 }];
    return {
        usuarios: _usuarios,        
    };
}