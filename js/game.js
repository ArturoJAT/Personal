//<![CDATA[ 
$(function () {
  var text1 = "Hola me llamo <b>Arturo Alvarado</b>, y soy un Desarrolador de 20 años que vive en la Ciudad de México, Bienvenido a mi currículum interactivo." +
    "<span><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i></span>" +
    "<br><div><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i><b> Izquierda </b> y <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i> Derecha para <b>Moverte</b></div>";

  var currentCanvas = 1;
  var CANVAS_WIDTH = $('#main').width();
  var CANVAS_HEIGHT = 200;
  var boxAlpha = 1;
  var canvasElement = $('canvas');
  var canvas = canvasElement.get(0).getContext("2d");

  var FPS = 60;

  var returnFlag = 0;
  setInterval(function () {
    if (returnFlag === 0) {
      update();
    } else if (currentCanvas == 1) {
      loadCanvas2();
    } else if (currentCanvas == 2) {
      loadCanvas1();
    }
    draw();
  }, 1000 / FPS);

  function update() {
    if (keydown.left) {
      player.x -= 10;
    }

    if (keydown.right) {
      player.x += 10;
    }
    if (player.x < 0) {
      player.x = 0;
    }
    if (player.x >= (CANVAS_WIDTH - (CANVAS_WIDTH/20)) && currentCanvas == 1) {
      returnFlag = 1;
    }
    if (player.x < ((CANVAS_WIDTH/20)-50) && currentCanvas == 2) {
      returnFlag = 1;
    }

  }
  var player = {
    x: CANVAS_WIDTH / 2,
    y: 170,
    width: 32,
    height: 32,
    sprite: Sprite("player"),
    draw: function () {
      this.sprite.draw(canvas, this.x, this.y);
    }
  };

  var tree1 = {
    x: 600,
    y: 170,
    width: 32,
    height: 32,
    sprite: Sprite("player"),
    draw: function () {
      this.sprite.draw(canvas, this.x, this.y);
    }
  };

  function draw() {
    drawCanvas();
    player.draw();
    tree1.draw();
    respondCanvas();
  }

  function drawCanvas() {
    CANVAS_WIDTH = $('#main').width();
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawFloor();

  }
  function respondCanvas() {
    CANVAS_WIDTH = $('#main').width();
    canvasElement.attr('width', CANVAS_WIDTH);
    player.draw();
    tree1.draw();
    drawFloor();

  }
  function drawFloor() {
    canvas.beginPath();
    canvas.moveTo(0, 200);
    canvas.lineTo($('#main').width(), 200);
    canvas.stroke();

  }

  function loadCanvas2() {
    if (player.x > CANVAS_WIDTH/20) {
      player.x -= 50;
      tree1.x -= 50;
      $('#personal').fadeTo(1, boxAlpha);
      boxAlpha--;
    } else {
      $('#personal').html("Tengo conociminetos en <br>HTML<br>CSS<br>JavaScript<br>Java");
      $('#personal').fadeTo(100, 1)
      boxAlpha = 1;
      returnFlag = 0;
      currentCanvas = 2;
    }
  }
  function loadCanvas1() {
    if (player.x < CANVAS_WIDTH - (CANVAS_WIDTH/20)-50) {
      player.x += 50;
      tree1.x += 50;
      $('#personal').fadeTo(1, boxAlpha);
      boxAlpha--;
    } else {
      $('#personal').html(text1);
      $('#personal').fadeTo(100, 1)
      boxAlpha = 1;
      returnFlag = 0;
      currentCanvas = 1;
    }
  }


  $(window).resize(respondCanvas);
});
//]]>