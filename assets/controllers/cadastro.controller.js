angular.module("pokemon").controller('cadastroController', cadastroController);

cadastroController.$inject = ["$location", "baseDeDadosService"];

function cadastroController($location, baseDeDadosService){
 var self = this;
 self.usersCadastrados = baseDeDadosService.usuarios; 
 self.cadastrarUsuario = function(email, usuario, senha){
 var usuarioTmp = {email: email, usuario: usuario, senha: senha};
   if(usuarioTmp != null){
        baseDeDadosService.usuarios.push(usuarioTmp);
        $location.path("/login");
   }else{
    alert("ERROR!");
   }
 }
}