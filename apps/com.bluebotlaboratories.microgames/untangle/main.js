function loaded() {
    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, 850, 850);
}