angular.module('pokemon')
    .directive('menuDirective', menuDirective);
    menuDirective.$inject =["usuarioService", "$rootScope"];
function menuDirective(usuarioService, $rootScope) {
    return  {
        transclude: true,
        template: 
        `<nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
        <a class="navbar-brand" href="#"><img src="pokemons/intro.png" class="img-logo"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample09">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#!/">Inicio<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item" ng-if="!logado">
              <a class="nav-link" href="#!/login">Login</a>
            </li>
            <li class="nav-item" ng-if="!logado">
              <a class="nav-link" href="#!/cadastro">Cadastrar</a>
            </li>
            <li class="nav-item dropdown" ng-if="logado">
              <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown09" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div class="dropdown-menu" aria-labelledby="dropdown09">
                <a class="dropdown-item" href="#!/">Inicio</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#!/arena">ir arena</a>
              </div>
            </li>
          </ul>
          <form class="form-inline my-2 my-md-0">
            <input class="form-control" type="text" placeholder="Search" aria-label="Search">
          </form>
        </div>
      </nav>`,
        scope: {
            id: '@'
        },
        link: function($scope){
            $scope.logado = false;
            $rootScope.$on("$routeChangeStart", function() {                
                if(usuarioService.usuarioAtual.length != 0){
                    $scope.logado = true;
                } 
            });                                               
        }
    };
}