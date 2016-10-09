//<![CDATA[ 
$(function () {
  var text1 = "Hola me llamo <b>Arturo Alvarado</b>, soy un Desarrolador de 20 años que vive en la Ciudad de México, Bienvenido a mi currículum interactivo." +
    "<span><i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i></span>" +
    "<br><div><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i><b> Izquierda </b> y <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i><b> Derecha</b> para Moverte.</div>";

  var text2="<b>Tengo experiencia en :</b> <br>HTML,<br>CSS, Photoshop,<br>JavaScript, JQuery, SQL,<br>Java, C y Python.";
  var currentCanvas = 1;
  var CANVAS_WIDTH = $('#main').width();
  var CANVAS_HEIGHT = $('#main').height();
  var boxAlpha = 1;
  var canvasElement = $('canvas');
  var canvas = canvasElement.get(0).getContext("2d");

  var FPS = 60;

  var returnFlag = 0;
  var transitionLeft = false;

  setInterval(function () {
    if (returnFlag === 0) {
      update();
    } else if (currentCanvas == 1) {
      loadCanvas2();
    } else if (currentCanvas == 2) {
      if (transitionLeft == true) {
        loadCanvas1();
      } else {
        loadCanvas3();
      }
    } else if (currentCanvas == 3) {
      loadCanvas2Left();
    }

    draw();
  }, 1000 / FPS);
  var left = false;
  var catepos = 0;
  var frameCount = 0;
  function update() {
    if (keydown.left) {
      player.x -= 10;
      left = true;
      if (catepos == 0) {
        frameCount++;
      } else if (catepos == 1) {
        frameCount--;
      }
      if (frameCount == 0) {
        catepos = 0;

      } else if (frameCount == 5) {
        catepos = 1;

      }

    }

    if (keydown.right) {
      player.x += 10;
      left = false;
      if (catepos == 0) {
        frameCount++;
      } else if (catepos == 1) {
        frameCount--;
      }
      if (frameCount == 0) {
        catepos = 0;

      } else if (frameCount == 5) {
        catepos = 1;

      }
    }
    if (player.x < 0) {
      player.x = 0;
    }

    if (player.x >= CANVAS_WIDTH / 2 && currentCanvas == 3) {
      player.x = (CANVAS_WIDTH / 2);

    }
    if (player.x >= (CANVAS_WIDTH - (CANVAS_WIDTH / 20)) && currentCanvas == 1) {
      returnFlag = 1;
    }
    if (player.x < ((CANVAS_WIDTH / 20) - 50) && currentCanvas == 2) {
      transitionLeft = true;
      console.log(transitionLeft);
      console.log("75");
      returnFlag = 1;

    }
    if (player.x >= (CANVAS_WIDTH - (CANVAS_WIDTH / 20)) && currentCanvas == 2) {
      transitionLeft = false;
      returnFlag = 1;
    }
    if (player.x < ((CANVAS_WIDTH / 20) - 50) && currentCanvas == 3) {
      transitionLeft = true;
      console.log(transitionLeft);
      console.log("75");
      returnFlag = 1;

    }
  }
  var player = {
    x: CANVAS_WIDTH / 2,
    y: 173,
    width: 32,
    height: 32,
    spriteRight1: Sprite("cate1"),
    spriteRight2: Sprite("cate2"),
    spriteLeft1: Sprite("cate3"),
    spriteLeft2: Sprite("cate4"),
    draw: function () {
      if (!left) {
        if (catepos == 1) {
          this.spriteRight1.draw(canvas, this.x, this.y);
        } else if (catepos == 0) {
          this.spriteRight2.draw(canvas, this.x, this.y);
        }
      } else {
        if (catepos == 1) {
          this.spriteLeft1.draw(canvas, this.x, this.y);
        } else if (catepos == 0) {
          this.spriteLeft2.draw(canvas, this.x, this.y);
        }
      }
    }
  };

  var tree1 = {
    x: CANVAS_WIDTH / 4,
    y: 4,
    width: 166,
    height: 202,
    sprite: Sprite("tree1"),
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
    canvas.moveTo(0, 205);
    canvas.lineTo($('#main').width(), 205);
    canvas.stroke();

  }

  function loadCanvas2() {
    if (player.x > CANVAS_WIDTH / 20) {
      player.x -= 50;
      tree1.x -= 50;
      $('#personal').fadeTo(1, boxAlpha);
      boxAlpha--;
    } else {
      $('#personal').html(text2);
      $('#personal').fadeTo(100, 1)
      boxAlpha = 1;
      returnFlag = 0;
      currentCanvas = 2;
    }
  }
  function loadCanvas1() {
    if (player.x < CANVAS_WIDTH - (CANVAS_WIDTH / 20) - 50) {
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
  function loadCanvas3() {
    if (player.x > CANVAS_WIDTH / 20) {
      player.x -= 50;
      tree1.x -= 50;

      $('#personal').fadeTo(1, boxAlpha);
      boxAlpha--;
    } else {
      $('#personal').css("bottom", '45%');

      $('#personal').html("Contáctame");
      $('#personal').fadeTo(100, 1)
      boxAlpha = 1;
      returnFlag = 0;
      currentCanvas = 3;
    }

  }

  function loadCanvas2Left() {
    if (player.x < CANVAS_WIDTH - (CANVAS_WIDTH / 20) - 50) {
      player.x += 50;
      tree1.x += 50;

      $('#personal').fadeTo(1, boxAlpha);
      boxAlpha--;
    } else {
      $('#personal').css("bottom", '65%');
      $('#personal').html(text2);
      $('#personal').fadeTo(100, 1)
      boxAlpha = 1;
      returnFlag = 0;
      currentCanvas = 2;
    }
  }
  $(window).resize(draw);

});
//]]>