      window.onload = function () {
        iniciar() //Inicializa os comandos do jogo  
        setInterval(principal, 1000 / 90); //Roda o nosso jogo dentro do laço
      };
      function iniciar(){
       folhaDesenho = document.getElementById("folha");
       areadesenho = folhaDesenho.getContext("2d");

       larguraCampo = 900;
       alturaCampo = 600;
       espessuraRede = 5;
       espessuraRaquete = 10;
       alturaRaquete = 80;
       diametroBola = 10;
       efeitoRaquete = 0.3;
       posicaoJogador1 = (posicaoJogador2 = 230);
       posicaoBolaX = (posicaoBolaY = 10);
       velocidadeBolaPosicaoX = (velocidadeBolaPosicaoY = 5);
       pontuacaoJogador1 = (pontuacaoJogador2 = 0);
       velocidadeJogador2 = 6;
       level = 1;
       aumentarLevel = true;  
       pontosParaUpar = 2;

      folhaDesenho.addEventListener('mousemove', function(e) {
        posicaoJogador1 = e.clientY - alturaRaquete / 2;
      });
      }
      function principal() {
        desenhar();
        calcular();
      }
      function desenhar() {
        areadesenho.fillStyle = "#4C9CEB"; //cor verde

        areadesenho.fillRect(0, 0, larguraCampo, alturaCampo);

        areadesenho.fillStyle = "#ffffff"; //cor branca

        areadesenho.fillRect(
          larguraCampo / 2 - espessuraRede / 2,
          0,
          espessuraRede,
          alturaCampo
        );
        //Raquetes
        areadesenho.fillRect(
          0,
          posicaoJogador1,
          espessuraRaquete,
          alturaRaquete
        );
        areadesenho.fillRect(
          larguraCampo - espessuraRaquete,
          posicaoJogador2,
          espessuraRaquete,
          alturaRaquete
        );

        areadesenho.fillRect(
          posicaoBolaX - diametroBola / 2,
          posicaoBolaY - diametroBola / 2,
          diametroBola,
          diametroBola
        );
        //Escrever pontuação
        areadesenho.font = "13px Arial";
        areadesenho.fillText(`Level - ${level}`, 50, 50);
        areadesenho.fillText(
          "Humano - " + pontuacaoJogador1 + " pontos",
          100,
          100
        );
        areadesenho.fillText(
          "Computador - " + pontuacaoJogador2 + " pontos",
          larguraCampo - 200,
          100
        );
      }
      function calcular() {
        posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX;
        posicaoBolaY = posicaoBolaY + velocidadeBolaPosicaoY;

        //Verifica lateral superior
        if (posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0) {
          velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
        }
        //Verifica lateral inferior
        if (posicaoBolaY > alturaCampo && velocidadeBolaPosicaoY > 0) {
          velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
        }
        //verifica se jogador 2 fez ponto
        if (posicaoBolaX < 0) {
          if (
            posicaoBolaY > posicaoJogador1 &&
            posicaoBolaY < posicaoJogador1 + alturaRaquete
          ) {
            //rebater a bola
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

            var diferencaY =
              posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
          } else {
            //pontos do jogador 2
            pontuacaoJogador2 = pontuacaoJogador2 + 1;
            continuar();
          }
        }
        //verifica  se jogador 1 fez ponto
        if (posicaoBolaX > larguraCampo) {
          if (
            posicaoBolaY > posicaoJogador2 &&
            posicaoBolaY < posicaoJogador2 + alturaRaquete
          ) {
            //rebater bola
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

            var diferencaY =
              posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
          } else {
            pontuacaoJogador1 = pontuacaoJogador1 + 1;

            if (pontuacaoJogador1 >= 10 && level == 1) {
              level++;
              velocidadeJogador2 *= 1.8;
            }
            if (pontuacaoJogador1 >= 20 && level == 2) {
              level++;
              velocidadeJogador2 *= 1.8;
            }
            if (pontuacaoJogador1 >= 30 && level == 3) {
              level++;
              velocidadeJogador2 *= 1.8;
            }

            continuar();
          }
        } //atualiza jogador 2
        if (posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY) {
          posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
        } else {
          posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
        }
        // definir leveis
      }
      function continuar() {
        //colocar vbola no centro
        posicaoBolaX = larguraCampo / 2;
        posicaoBolaY = alturaCampo / 2;
        velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
        velocidadeBolaPosicaoY = 3;
      }