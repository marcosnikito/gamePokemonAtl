angular.module("pokemon").controller("loginController", loginController);

loginController.$inject = ["$location", "baseDeDadosService", "usuarioService"];

function loginController($location, baseDeDadosService, usuarioService){
 var self = this;
	self.verificaLogin = function(){
		if(usuarioService.usuarioAtual.length){		
			$location.path("/");
		}
	}
 self.usuarioInv = false;
 self.senhaInv = false;
 self.usuarioTmp = {email: null, usuario: null, senha: null};
 self.logar = function(login, senha){
	 self.usuarioTmp = {email: null, usuario: null, senha: null};
   baseDeDadosService.usuarios.filter(function(item){	   
    if(item.email == login || item.usuario == login){
		self.usuarioTmp.email = item.email;
		self.usuarioTmp.usuario = item.usuario;
		self.usuarioInv = false;
      if(item.senha == senha){
		  self.senhaInv = false;		  
       self.usuarioTmp.senha = item.senha;
       if(self.usuarioTmp != null){
          if(usuarioService.attrSession(self.usuarioTmp)){
			  	alert("Usuario logado com sucesso!");
           		$location.path("/");			  	
          }else{
           		alert("ERROR!");
          }
       }       
      }
    }
   });
	if(self.usuarioTmp.email == null && self.usuarioTmp.usuario == null){
		 		self.usuarioInv = true;
		self.senhaInv = false;
	}else{
		if(self.usuarioTmp.senha == null && self.usuarioTmp.email != null){
			  	self.senhaInv = true;
		}
	}
 }
}