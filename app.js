var app = angular.module("pokemon", ['ngRoute']).config(config).run(run);

function config($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl : "assets/html/main.html"
    })
    .when("/login", {
        templateUrl : "assets/html/login.html"
    })
    .when("/cadastro", {
        templateUrl : "assets/html/cadastro.html"
    })
    .when("/arena", {
        templateUrl : "arenaDebatalha.html"
    })
    .otherwise({
        template : "<h1>None</h1><p>Nothing has been selected</p>"
    });
}

function run($rootScope, $location, usuarioService){
    $rootScope.$on("$routeChangeStart", function(evt, route) {
        if (route.originalPath !== "/login" && usuarioService.usuarioAtual.length == 0) {
            if (route.originalPath !== "/cadastro") {                
                $location.path("/login");
            }
        }
    });
}