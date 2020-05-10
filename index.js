var isFontLoaded = false;

WebFont.load({
  custom: {
    families: ["Noto Sans JP"],
    urls: [
      "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap",
    ],
  },
  active: function () {
    isFontLoaded = true;
  },
});

$(function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font = "normal 100 800px 'Noto Sans JP'";
  ctx.textAlign = "center";
  ctx.lineWidth = 0;

  $("#saveButton").click(function () {
    var a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpeg", 0.85);
    a.download = "download.jpg";
    a.click();
  });

  $("#button").click(function () {
    if (!isFontLoaded) {
      $("#fontAlert").css({
        display: "block",
      });
    } else {
      $("#fontAlert").css({
        display: "none",
      });
    }

    if ($("#character").val().length !== 1) {
      $("#charAlert").css({
        display: "block",
      });
    } else {
      $("#charAlert").css({
        display: "none",
      });
    }

    ctx.fillText($("#character").val(), canvas.width / 2, 710);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setTimeout(function () {
      ctx.fillText($("#character").val(), canvas.width / 2, 710);
      setTimeout(function () {
        main(canvas, ctx);
      }, 1000);
    }, 500);
  });
});

function main(canvas, ctx) {
  var diameterList = [];
  var xList = [];
  var yList = [];
  var imageData = ctx.getImageData(0, 0, 800, 800);

  // small
  for (var i = 0; i < $("#smallCircle").val(); i++) {
    var diameter = Math.random() * 30 + 30;
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var shouldDraw = true;

    for (var radius = diameter / 2; radius > 0; radius -= 5) {
      for (var degree = 0; degree < 360; degree += 360 / radius / 6) {
        var cx = x + radius * Math.cos(radians(degree));
        var cy = y + radius * Math.sin(radians(degree));
        var imageData = ctx.getImageData(cx, cy, 1, 1);
        if (imageData.data[3] === 255) {
          shouldDraw = false;
        }
      }
    }

    if (shouldDraw) {
      diameterList.push(diameter);
      xList.push(x);
      yList.push(y);
    }
  }

  // middle
  for (var i = 0; i < $("#middleCircle").val(); i++) {
    var diameter = Math.random() * 30 + 60;
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var shouldDraw = true;

    for (var radius = diameter / 2; radius > 0; radius -= 5) {
      for (var degree = 0; degree < 360; degree += 360 / radius / 6) {
        var cx = x + radius * Math.cos(radians(degree));
        var cy = y + radius * Math.sin(radians(degree));
        var imageData = ctx.getImageData(cx, cy, 1, 1);
        if (imageData.data[3] === 255) {
          shouldDraw = false;
        }
      }
    }

    if (shouldDraw) {
      diameterList.push(diameter);
      xList.push(x);
      yList.push(y);
    }
  }

  // big
  for (var i = 0; i < $("#bigCircle").val(); i++) {
    var diameter = Math.random() * 30 + 90;
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var shouldDraw = true;

    for (var radius = diameter / 2; radius > 0; radius -= 5) {
      for (var degree = 0; degree < 360; degree += 360 / radius / 6) {
        var cx = x + radius * Math.cos(radians(degree));
        var cy = y + radius * Math.sin(radians(degree));
        var imageData = ctx.getImageData(cx, cy, 1, 1);
        if (imageData.data[3] === 255) {
          shouldDraw = false;
        }
      }
    }

    if (shouldDraw) {
      diameterList.push(diameter);
      xList.push(x);
      yList.push(y);
    }
  }

  var newDiameterList = [];
  var newXList = [];
  var newYList = [];

  for (var i1 = 0; i1 < xList.length; i1++) {
    var shouldAdd = true;
    for (var i2 = i1 + 1; i2 < xList.length; i2++) {
      var distance = dist(xList[i1], yList[i1], xList[i2], yList[i2]);
      if (distance < $("#distCircle").val()) {
        shouldAdd = false;
      }
    }
    if (shouldAdd) {
      newDiameterList.push(diameterList[i1]);
      newXList.push(xList[i1]);
      newYList.push(yList[i1]);
    }
  }

  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgb(255, 255, 255)";
  for (var i = 0; i < newDiameterList.length; i++) {
    ctx.beginPath();
    ctx.arc(
      newXList[i],
      newYList[i],
      newDiameterList[i] / 2,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }
}

function radians(degree) {
  return degree * (Math.PI / 180);
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
