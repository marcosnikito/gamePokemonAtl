var app = angular.module("pokemon")
    .controller("arenaPokemonCrontroller", function ($scope, $window, $document) {
        $scope.diryJ; $scope.dirxJ; $scope.jog; $scope.velJ; $scope.pjx; $scope.pjy;
        $scope.jogo; $scope.frames;
        $scope.tamTelaW; $scope.tamTelaH;
        $scope.velociDadeTiro; $scope.velocidadePwP2;
        $scope.contPwP2;/*contar poderes inimigos em campo*/ $scope.contPw;/*quantidade de poderes inimigos restantes*/ $scope.contPwTotal; $scope.tempPowerP2;
        $scope.vidaPlay1; $scope.vidaPlay2;
        $scope.indeExplosao; $scope.indeSom;
        $scope.barraLifePlay1; $scope.barraLifePlay2; $scope.telaMensagem;
        $scope.areaImpacto; $scope.areaImpactoPlay2;
        //atributos player2
        $scope.pjx2; $scope.pjy2;
        $scope.jog2;
        $scope.telaArena;

        //controlar meus poderes no inimigo
        $scope.meusPoderes;
        //atributos matriz da tela
        $scope.eixoX; $scope.eixoY;
        $scope.teclaDw = function(event){
            if (event.which === 38) {//pra cima
                $scope.diryJ = -1;
                document.getElementById("pokemonPlay1").style.backgroundImage = 'url(pokemons/picachu-top.gif)';
                document.getElementById("pokemonPlay1").style.width = '80px';
                document.getElementById("pokemonPlay1").style.height = '100px';
                document.getElementById("pokemonPlay2").style.backgroundImage = 'url(pokemons/Jolteon-top.gif)';
                document.getElementById("pokemonPlay2").style.width = '60px';
                document.getElementById("pokemonPlay2").style.height = '80px';
            } else if (event.which === 40) {//pra baixo
                $scope.diryJ = 1;
                document.getElementById("pokemonPlay1").style.backgroundImage = 'url(pokemons/picachu-botton.gif)';
                document.getElementById("pokemonPlay1").style.width = '80px';
                document.getElementById("pokemonPlay1").style.height = '100px';
                document.getElementById("pokemonPlay2").style.backgroundImage = 'url(pokemons/Jolteon-botton.gif)';
                document.getElementById("pokemonPlay2").style.width = '60px';
                document.getElementById("pokemonPlay2").style.height = '80px';
            } else if (event.which === 37) {//pra esquerda
                $scope.dirxJ = -1
                document.getElementById("pokemonPlay1").style.backgroundImage = 'url(pokemons/picachu-left.gif)';
                document.getElementById("pokemonPlay1").style.width = '100px';
                document.getElementById("pokemonPlay1").style.height = '80px';
                document.getElementById("pokemonPlay2").style.backgroundImage = 'url(pokemons/Jolteon-left.gif)';
                document.getElementById("pokemonPlay2").style.width = '60px';
                document.getElementById("pokemonPlay2").style.height = '80px';
            } else if (event.which === 39) {//pra direita
                $scope.dirxJ = 1;
                document.getElementById("pokemonPlay1").style.backgroundImage = 'url(pokemons/picachu-ini.gif)';
                document.getElementById("pokemonPlay1").style.width = '100px';
                document.getElementById("pokemonPlay1").style.height = '80px';
                document.getElementById("pokemonPlay2").style.backgroundImage = 'url(pokemons/Jolteon-rigth.gif)';
                document.getElementById("pokemonPlay2").style.width = '60px';
                document.getElementById("pokemonPlay2").style.height = '80px';
            }
            if (event.which === 32) {//atirar
                $scope.atira($scope.pjx + 17, $scope.pjy);
            }
        }
        $scope.teclaUp = function(event){
            if (event.which === 38 || event.which === 40) {//pra cima
                $scope.diryJ = 0;
            }
            if (event.which === 37 || event.which === 39) {//pra baixo
                $scope.dirxJ = 0;
            }
        }

        $scope.criarPowersP2 = function () {
            if ($scope.jogo) {//se o jogo estiver iniciado a maquina começa a atacar
                var y = $scope.pjy2;
                var x = $scope.pjx + 20;
                var powerP2 = document.createElement("div");
                var atr1 = document.createAttribute("class");
                var atr2 = document.createAttribute("style");
                atr1.value = "powerP2";
                atr2.value = "top:" + y + "px; left:" + x + "px;";
                powerP2.setAttributeNode(atr1);
                powerP2.setAttributeNode(atr2);
                document.body.appendChild(powerP2);
                $scope.contPw--;
            }
        }

        $scope.controlaPwP2 = function () {//tiro cai no chao e explode
            $scope.contPwTotal = document.getElementsByClassName("powerP2");
            var widthPw = $scope.contPwTotal.length;
            for (var i = 0; i < widthPw; i++) {
                if ($scope.contPwTotal[i]) {
                    var posicaoPwP2 = $scope.contPwTotal[i].offsetTop;
                    posicaoPwP2 += $scope.velocidadePwP2;//velb
                    $scope.contPwTotal[i].style.top = posicaoPwP2 + "px";
                    $scope.colisaoPw2P1();
                    if (posicaoPwP2 > $scope.tamTelaH) {
                        $scope.criarExplosao(2, $scope.contPwTotal[i].offsetLeft, null);
                        $scope.contPwTotal[i].remove();
                    }
                }
            }
        }

        //colisao do poder do player 2 com o tronco do player 2
        $scope.colisaoPw2P1 = function () {//colisao do poder inimigo com meu personagem//não esquecer*
            $scope.contPwTotal = document.getElementsByClassName("powerP2");
            var widthPw = $scope.contPwTotal.length;
            for (var i = 0; i < widthPw; i++) {
                if ($scope.contPwTotal[i]) {
                    if (
                        (
                            ($scope.areaImpacto.offsetTop <= ($scope.contPwTotal[i].offsetTop + 51)) &&//cima do tiro com baixo da bomba
                            (($scope.areaImpacto.offsetTop + 60) >= ($scope.contPwTotal[i].offsetTop))//baixo do tiro com cima da bomba
                        )
                        &&
                        (
                            ($scope.areaImpacto.offsetLeft <= ($scope.contPwTotal[i].offsetLeft + 20)) &&//esquerda tiro com direita bomba
                            (($scope.areaImpacto.offsetLeft + 80) >= ($scope.contPwTotal[i].offsetLeft))//direita do tiro com esquerda da bomba
                        )
                    ) {
                        $scope.vidaPlay1 -= 30;
                        $scope.criarExplosao(1, $scope.contPwTotal[i].offsetLeft - 20, $scope.contPwTotal[i].offsetTop + 10);
                        $scope.contPwTotal[i].remove();
                    }
                }
            }
        }
        //colisao do poder do player 1 com o tronco do player 2
        $scope.colisaoPw1P2 = function () {//colisao do poder inimigo com meu personagem//não esquecer*
            $scope.meusPoderes = document.getElementsByClassName("tiroJog");
            var widthPw = $scope.meusPoderes.length;
            for (var i = 0; i < widthPw; i++) {
                if ($scope.meusPoderes[i]) {
                    if (
                        (
                            ($scope.areaImpactoPlay2.offsetTop <= ($scope.meusPoderes[i].offsetTop + 51)) &&//cima do tiro com baixo da bomba
                            (($scope.areaImpactoPlay2.offsetTop + 60) >= ($scope.meusPoderes[i].offsetTop))//baixo do tiro com cima da bomba
                        )
                        &&
                        (
                            ($scope.areaImpactoPlay2.offsetLeft <= ($scope.meusPoderes[i].offsetLeft + 20)) &&//esquerda tiro com direita bomba
                            (($scope.areaImpactoPlay2.offsetLeft + 80) >= ($scope.meusPoderes[i].offsetLeft))//direita do tiro com esquerda da bomba
                        )
                    ) {
                        $scope.vidaPlay2 -= 30;
                        $scope.criarExplosao(1, $scope.meusPoderes[i].offsetLeft - 20, $scope.meusPoderes[i].offsetTop + 10);
                        $scope.meusPoderes[i].remove();
                    }
                }
            }
        }




        $scope.atira = function (x, y) {
            var power = document.createElement("div");
            var att1 = document.createAttribute("class");
            var att2 = document.createAttribute("style");
            att1.value = "tiroJog";
            att2.value = "top:" + y + "px; left:" + x + "px";
            power.setAttributeNode(att1);
            power.setAttributeNode(att2);
            document.body.appendChild(power);
        }

        $scope.controlePower = function () {
            var powers = document.getElementsByClassName("tiroJog");
            var width = powers.length;
            for (var i = 0; i < width; i++) {
                if (powers[i]) {
                    var posicaoPw = powers[i].offsetTop;
                    posicaoPw -= $scope.velociDadeTiro;
                    powers[i].style.top = posicaoPw + "px";
                    $scope.colisaoPw2P1();
                    $scope.colisaoPw1Pw2(powers[i]);
                    $scope.colisaoPw1P2();
                    if (posicaoPw < 0) {
                        //document.body.removeChild(powers[]);
                        powers[i].remove();
                    }
                }
            }
        }

        $scope.colisaoPw1Pw2 = function (powerP1) {
            var widthPww = $scope.contPwTotal.length;
            for (var i = 0; i < widthPww; i++) {
                if ($scope.contPwTotal[i]) {
                    if ((
                        (powerP1.offsetTop <= ($scope.contPwTotal[i].offsetTop + 51)) &&//parte de cima do porder com baixo do poder inimigo
                        ((powerP1.offsetTop + 51) >= ($scope.contPwTotal[i].offsetTop))//parde de baixo poder com parte de cima poder inimigo
                    )
                        &&
                        (
                            (powerP1.offsetLeft <= ($scope.contPwTotal[i].offsetLeft + 20)) &&//parte wequerda porder com parte direita do poder inimigo
                            ((powerP1.offsetLeft + 20) >= ($scope.contPwTotal[i].offsetLeft))//parte direita do poder com parte equerda do poder inimigo
                        )
                    ) {
                        $scope.criarExplosao(1, $scope.contPwTotal[i].offsetLeft - 20, $scope.contPwTotal[i].offsetTop);
                        $scope.contPwTotal[i].remove();
                        powerP1.remove();
                    }
                }
            }
        }

        $scope.criarExplosao = function (tipo, x, y) {
            if (document.getElementById("explosao" + ($scope.indeExplosao - 2))) {
                document.getElementById("explosao" + ($scope.indeExplosao - 2)).remove();
            }
            var explosao = document.createElement("div");
            var img = document.createElement("img");
            var som = document.createElement("audio");
            //Atributos para div

            var atr1 = document.createAttribute("class");
            var atr2 = document.createAttribute("style");
            var atr3 = document.createAttribute("id");
            //Atribute para imagem
            var atr4 = document.createAttribute("src");
            //Atributos para o audio
            var atr5 = document.createAttribute("src");
            var atr6 = document.createAttribute("id");

            atr3.value = "explosao" + $scope.indeExplosao;
            if (tipo == 1) {
                atr1.value = "explosaoAr";
                atr2.value = "top:" + y + "px; left:" + x + "px;";
                atr4.value = "pokemons/bola-choque.png?" + new Date();
            } else {
                atr1.value = "explosaoChao";
                atr2.value = "top:" + ($scope.tamTelaH - 57) + "px; left:" + (x - 51) + "px;";
                atr4.value = "pokemons/bola-choque.png?" + new Date();
            }
            atr5.value = "sons/choque.mp3?" + new Date();
            atr6.value = "som" + $scope.indeSom;
            explosao.setAttributeNode(atr1);
            explosao.setAttributeNode(atr2);
            explosao.setAttributeNode(atr3);
            img.setAttributeNode(atr4);
            som.setAttributeNode(atr5);
            som.setAttributeNode(atr6);
            explosao.appendChild(img);
            explosao.appendChild(som);
            document.body.appendChild(explosao);
            document.getElementById("som" + $scope.indeSom).play();
            $scope.indeSom++;
            $scope.indeExplosao++;
        }

        //controlar player 2 maquina*
        $scope.controlarPokemonPlay2 = function () {
            if ($scope.pjy2 < ($scope.tamTelaH - ($scope.tamTelaH - 50))) {//nao deixar pokemon decer nem subir demais
                $scope.pjy2 = ($scope.tamTelaH / 2);
            } else if ($scope.pjy2 > ($scope.tamTelaH - ($scope.tamTelaH - 50))) {
                $scope.pjy2 = $scope.tamTelaH - 50;
            };

            if ($scope.pjx2 < $scope.tamTelaW - ($scope.tamTelaW * 0.75)) {
                $scope.pjx2 = $scope.tamTelaW - ($scope.tamTelaW * 0.75);
            } else if ($scope.pjx2 > $scope.tamTelaW - ($scope.tamTelaW * 0.25)) {
                $scope.pjx2 = $scope.tamTelaW - ($scope.tamTelaW * 0.25);
            }

            if ($scope.pjy2 >= ($scope.tamTelaH - 50) && $scope.pjy2 <= ($scope.tamTelaH / 2)) {
                $scope.pjy2 += $scope.diryJ * $scope.velJ;
            }
            if ($scope.pjx2 >= $scope.tamTelaW - ($scope.tamTelaW * 0.75) && $scope.pjx2 <= $scope.tamTelaW - ($scope.tamTelaW * 0.25)) {
                $scope.pjx2 += $scope.dirxJ * $scope.velJ;
            }
            $scope.areaImpactoPlay2 = document.getElementById("areaTipoPlay2");
            $scope.areaImpactoPlay2.style.top = $scope.pjy2 + "px";
            $scope.areaImpactoPlay2.style.left = $scope.pjx2 + "px";
            $scope.jog2.style.top = $scope.pjy2 + "px";
            $scope.jog2.style.left = $scope.pjx2 + "px";
        }

        //controlar player 1
        $scope.controlarPokemon = function () {
            if ($scope.pjy < ($scope.tamTelaH / 2)) {//nao deixar pokemon decer nem subir demais
                $scope.pjy = ($scope.tamTelaH / 2);
            } else if ($scope.pjy > ($scope.tamTelaH - 50)) {
                $scope.pjy = $scope.tamTelaH - 50;
            };

            if ($scope.pjx < $scope.tamTelaW - ($scope.tamTelaW * 0.75)) {
                $scope.pjx = $scope.tamTelaW - ($scope.tamTelaW * 0.75);//restringindo largura esquerda para o play 1
                $scope.pjx2 = $scope.tamTelaW - ($scope.tamTelaW * 0.75);
            } else if ($scope.pjx > $scope.tamTelaW - ($scope.tamTelaW * 0.25)) {
                $scope.pjx = $scope.tamTelaW - ($scope.tamTelaW * 0.25);
            }
            if ($scope.pjy >= ($scope.tamTelaH / 2) && $scope.pjy <= ($scope.tamTelaH - 50)) {
                $scope.pjy += $scope.diryJ * $scope.velJ;
            }
            if ($scope.pjx >= $scope.tamTelaW - ($scope.tamTelaW * 0.75) && $scope.pjx <= $scope.tamTelaW - ($scope.tamTelaW * 0.25)) {
                $scope.pjx += $scope.dirxJ * $scope.velJ;
            }
            $scope.areaImpacto = document.getElementById("areaTipo");
            $scope.areaImpacto.style.top = $scope.pjy + "px";
            $scope.areaImpacto.style.left = $scope.pjx + "px";
            $scope.jog.style.top = $scope.pjy + "px";
            $scope.jog.style.left = $scope.pjx + "px";
            $scope.eixoY.innerHTML = ("Y:" + $scope.pjy2);
            $scope.eixoX.innerHTML = (" X:" + $scope.pjx2);
        }
        $scope.partida = function () {
            $scope.barraLifePlay1.style.width = $scope.vidaPlay1 + "px";//atualiza a vida do play 1
            $scope.barraLifePlay2.style.width = $scope.vidaPlay2 + "px";//atualiza a vida do play 2
            if ($scope.vidaPlay1 <= 0 || $scope.vidaPlay2 <= 0) {
                $scope.jogo = false;
                clearInterval($scope.tempPowerP2);
                if ($scope.vidaPlay2 <= 0 && $scope.vidaPlay1 > 0) {
                    $scope.telaMensagem.style.backgroundImage = 'url("pokemons/pik-win.gif")';
                } else if ($scope.vidaPlay1 <= 0 && $scope.vidaPlay2 > 0) {
                    $scope.telaMensagem.style.backgroundImage = 'url("pokemons/pik-lose.gif")';
                }
                $scope.telaMensagem.style.display = "block";
            }
        }
        $scope.gameLoop = function () {
            if ($scope.jogo) {
                //funcoes de controler
                $scope.controlarPokemon();
                $scope.controlePower();
                $scope.controlaPwP2();
                $scope.controlarPokemonPlay2();
            }
            $scope.partida();
            $scope.frames = requestAnimationFrame($scope.gameLoop);
        }


        $scope.reiniciarPartida = function () {
            document.getElementById('arena-body').focus();
            $scope.meusPoderes = document.getElementsByClassName("tiroJog");
            var width2 = $scope.meusPoderes.length;
            for (var i = 0; i < width2; i++) {
                if ($scope.meusPoderes[i]) {
                    $scope.meusPoderes[i].remove();
                }
            }
            $scope.contPwTotal = document.getElementsByClassName("powerP2");
            var windth = $scope.contPwTotal.length;
            $scope.eixoX = document.getElementById("eixoX");
            $scope.eixoY = document.getElementById("eixoY");
            $scope.eixoY.innerHTML = ("Y:" + $scope.pjy);
            $scope.eixoX.innerHTML = (" X:" + $scope.pjx);
            for (var i = 0; i < windth; i++) {
                if ($scope.contPwTotal[i]) {
                    $scope.contPwTotal[i].remove();
                }
            }
            $scope.telaMensagem.style.display = "none";
            clearInterval($scope.tempPowerP2);
            cancelAnimationFrame($scope.frames);//cancela para não aumentar a velocidade o framerate
            $scope.vidaPlay1 = 300;
            $scope.vidaPlay2 = 300;
            $scope.pjx = $scope.tamTelaW / 2;
            $scope.pjy = $scope.tamTelaH - 100;
            $scope.pjx2 = $scope.tamTelaW / 2;
            $scope.pjy2 = $scope.tamTelaH - ($scope.tamTelaH - 50);
            $scope.jog.style.top = $scope.pjy + "px";
            $scope.jog.style.left = $scope.pjx + "px";

            $scope.contPw = 150;
            $scope.jogo = true;
            $scope.tempPowerP2 = setInterval($scope.criarPowersP2, 1000);

            $scope.gameLoop();
        }

        $scope.ajustaTela = function(){
            $scope.telaArena = document.getElementById('arena-body');
            $scope.telaArena.style.height = ($scope.tamTelaH - 63) + "px";
            $scope.telaArena.style.padding = '0px';
            $scope.telaArena.style.margin = '0px';
        }

        $scope.inicia = function () {
            $scope.divElement = document.getElementById("arena-body");
            document.getElementById('arena-body').focus();
            $scope.divElement.focus();
            $scope.jogo = false;
            eixoX = document.getElementById("eixoX");
            eixoY = document.getElementById("eixoY");
            //iniciar tela
            $scope.tamTelaH = $window.innerHeight;
            $scope.tamTelaW = $window.innerWidth;
            $scope.ajustaTela();
            //iniciar jogador
            $scope.dirxJ = 0;
            $scope.diryJ = 0;
            $scope.velociDadeTiro = 5;
            $scope.pjx = $scope.tamTelaW / 2;
            $scope.pjy = $scope.tamTelaH - 100;

            $scope.pjx2 = $scope.tamTelaW / 2;
            $scope.pjy2 = $scope.tamTelaH - ($scope.tamTelaH - 50);

            $scope.velJ = 5;
            $scope.jog = document.getElementById("pokemonPlay1");
            $scope.jog.style.top = $scope.pjy + "px";
            $scope.jog.style.left = $scope.pjx + "px";
            //controla os poderes do inimigo

            $scope.contPw = 150;
            $scope.vidaPlay1 = 300;
            $scope.vidaPlay2 = 300;
            $scope.velocidadePwP2 = 15;
            //IA
            $scope.jog2 = document.getElementById("pokemonPlay2");
            $scope.jog2.style.top = $scope.pjy2 + "px";
            $scope.jog2.style.left = $scope.pjx2 + "px";
            //controle explosao
            $scope.indeExplosao = 0;
            $scope.indeSom = 0;

            //gerencia life
            $scope.barraLifePlay1 = document.getElementById("barraVida");
            $scope.barraLifePlay1.style.width = $scope.vidaPlay1 + "px";
            $scope.barraLifePlay2 = document.getElementById("barraVidaPlay2");
            $scope.barraLifePlay2.style.width = $scope.vidaPlay2 + "px";
            //telas
            $scope.telaMensagem = document.getElementById("telaMsg");
            $scope.telaMensagem.style.backgroundImage = 'url("pokemons/intro.png")';
            $scope.telaMensagem.style.display = "block";
            $scope.telaMensagem.style.height = ($scope.tamTelaH - 85) + "px";
            $scope.telaMensagem.style.width = ($scope.tamTelaW - ($scope.tamTelaW * 0.05)) + "px";
            document.getElementById("btnJogar").addEventListener('click', $scope.reiniciarPartida);
        }
    });