import { Auxiliary } from "./Auxiliary.js";
export class AxisTitle extends Auxiliary {
    along;
    other;
    label;
    constructor(along, label) {
        super();
        this.along = along;
        this.other = along === "x" ? "y" : "x";
        this.label = label;
    }
    getLabelMetrics = (context) => {
        return context.context.measureText(this.label);
    };
    draw = (context) => {
        const labelWidth = this.getLabelMetrics(context).width;
        const labelHeight = this.getLabelMetrics(context).actualBoundingBoxAscent;
        const x = this.along === "x"
            ? this.scales.x.pctToPlot(0.5)
            : this.scales.x.pctToPlot(0) - 50;
        const y = this.along === "x"
            ? this.scales.y.pctToPlot(0) + 50
            : this.scales.y.pctToPlot(0.5);
        const rot = this.along === "x" ? 0 : 270;
        context.drawText([x], [y], [this.label], 30, rot);
    };
    drawBase = (context) => {
        this.draw(context);
    };
}
