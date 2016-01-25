/**
 * Created by sulvto on 16-1-25.
 */

function sleep(d) {
    for (var t = Date.now(); Date.now() - t <= d;);
}

function draw23(id) {
    var Element = document.getElementById(id);
    var context = Element.getContext("2d");
    context.fillStyle = "#FF0000";
    context.beginPath();
    context.arc(65, 18, 15, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();

}
function draw(id) {
    var canvas = document.getElementById(id);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //三次曲线
        ctx.beginPath();
        ctx.moveTo(200, 200);
        // quadraticCurveTo(cp1x, cp1y, x, y)
        // 绘制二次贝塞尔曲线，x,y为结束点，cp1x,cp1y为控制点。

        // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        // 绘制三次贝塞尔曲线，x,y为结束250点，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二。
        ctx.bezierCurveTo(275, 200, 275, 250, 200, 250);
        ctx.bezierCurveTo(125, 250, 125, 200, 200, 200);
        //ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
        //ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
        //ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
        //ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
        ctx.fill();
    }
}

//125 200 150 100
function ellipse(id, x, y, w, h) {
    var canvas = document.getElementById(id);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();

        ctx.moveTo(x + w / 2, y);
        // quadraticCurveTo(cp1x, cp1y, x, y)
        // 绘制二次贝塞尔曲线，x,y为结束点，cp1x,cp1y为控制点。

        // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
        // 绘制三次贝塞尔曲线，x,y为结束250点，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二。
        ctx.bezierCurveTo(x + w, y, x + w, y + h, x + w / 2, y + h);
        ctx.bezierCurveTo(x, y + h, x, y, x + w / 2, y);
        ctx.fill();
    }
}

function tail(id) {
    var canvas = document.getElementById(id);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //三次曲线
        ctx.beginPath();
        console.log(new Date());
        sleep(1000);
        ctx.moveTo(500, 500);
        console.log(new Date());
        sleep(1000);
        ctx.stroke();
        ctx.quadraticCurveTo(400, 550, 500, 700);
        console.log(new Date());
        sleep(1000);
        ctx.stroke();
        ctx.quadraticCurveTo(600, 810, 430, 850);
        console.log(new Date());
        sleep(1000);
        //ctx.quadraticCurveTo(595, 418, 522, 429);
        //ctx.fill();
        ctx.stroke();
    }
}

//draw23("myCanvas");
//draw("myCanvas");
//ellipse("myCanvas", 125 ,200 ,150 ,50);
tail("myCanvas");