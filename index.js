$(function () {
  $("#button").click(function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "400px 'ＭＳ ゴシック'";
    ctx.textAlign = "center";
    ctx.strokeText("あ", 400, 400);
  });
});
