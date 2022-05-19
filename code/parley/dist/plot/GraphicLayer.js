export class GraphicLayer {
    canvas;
    context;
    width;
    height;
    backgroundColour;
    constructor(width, height) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = width;
        this.height = height;
        this.backgroundColour = "antiquewhite";
        this.canvas.width = width;
        this.canvas.height = height;
    }
    drawClear = () => {
        const context = this.context;
        context.clearRect(0, 0, this.width, this.height);
    };
    drawBackground = () => {
        this.context.save();
        this.context.fillStyle = "antiquewhite";
        this.context.fillRect(0, 0, this.width, this.height);
        this.context.restore();
    };
    drawBarsV = (x, y, y0, col = "steelblue", stroke = null, width = 50) => {
        const context = this.context;
        context.save();
        context.fillStyle = col;
        x.forEach((e, i) => {
            col ? context.fillRect(e - width / 2, y[i], width, y0 - y[i]) : null;
            stroke ? context.strokeRect(e - width / 2, y[i], width, y0 - y[i]) : null;
        });
        context.restore();
    };
    drawPoints = (x, y, col = "steelblue", stroke = null, radius = 5) => {
        const context = this.context;
        context.save();
        context.fillStyle = col;
        context.strokeStyle = stroke;
        x.forEach((e, i) => {
            context.beginPath();
            context.arc(e, y[i], radius, 0, Math.PI * 2);
            stroke ? context.stroke() : null;
            col ? context.fill() : null;
        });
        context.restore();
    };
    drawLine = (x, y, col = "black") => {
        const context = this.context;
        context.save();
        context.beginPath();
        context.strokeStyle = col;
        context.moveTo(x[0], y[0]);
        x.shift();
        y.shift();
        x.forEach((e, i) => {
            context.lineTo(e, y[i]);
        });
        context.stroke();
        context.restore();
    };
    drawWindow = (start, end, col = "rgba(0, 0, 0, 0.1)", stroke = "rgba(0, 0, 0, 0.25)") => {
        const context = this.context;
        context.save();
        context.fillStyle = col;
        context.strokeStyle = stroke;
        context.setLineDash([5, 5]);
        context.fillRect(0, 0, this.width, this.height);
        context.clearRect(start[0], start[1], end[0] - start[0], end[1] - start[1]);
        context.strokeRect(start[0], start[1], end[0] - start[0], end[1] - start[1]);
        context.restore();
    };
}
