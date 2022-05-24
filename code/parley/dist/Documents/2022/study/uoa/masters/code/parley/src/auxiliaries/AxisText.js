import { Auxiliary } from "./Auxiliary.js";
export class AxisText extends Auxiliary {
    along;
    other;
    nbreaks;
    constructor(along, nbreaks) {
        super();
        this.along = along;
        this.other = along === "x" ? "y" : "x";
        this.nbreaks = nbreaks ?? 5;
    }
    get pctBreaks() {
        return (this.scales[this.along].positions ??
            Array.from(Array(this.nbreaks), (e, i) => 0.1 + 0.8 * (i / (this.nbreaks - 1))));
    }
    get dataBreaks() {
        return (this.scales[this.along].values ??
            this.scales[this.along].pctToData(this.pctBreaks));
    }
    get breaks() {
        return this.scales[this.along].dataToPlot(this.dataBreaks);
    }
    get labels() {
        return this.scales[this.along].values
            ? this.scales[this.along].values.map((e) => e.toString())
            : this.dataBreaks.map((e) => e.toPrecision(3).toString());
    }
    getLabelMetrics = (context) => {
        return this.labels.map((label) => context.context.measureText(label));
    };
    draw = (context) => {
        const labelWidths = this.getLabelMetrics(context).map((e) => e.width);
        const labelHeights = this.getLabelMetrics(context).map((e) => e.actualBoundingBoxAscent);
        const intercepts = Array.from(Array(this.breaks.length), (e) => this.scales[this.other].plotMin);
        const x = this.along === "x"
            ? this.breaks.map((e, i) => e - labelWidths[i] / 2)
            : intercepts.map((e, i) => e - 3 * labelWidths[i]);
        const y = this.along === "x"
            ? intercepts.map((e, i) => e + 3 * labelHeights[i])
            : this.breaks.map((e, i) => e + labelHeights[i] / 2);
        context.drawText(x, y, this.labels);
    };
    drawBase = (context) => {
        this.draw(context);
    };
}
