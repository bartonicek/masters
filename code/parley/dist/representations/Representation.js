import * as dtstr from "../datastructures.js";
import * as funs from "../functions.js";
import { globalParameters } from "../globalparameters.js";
export class Representation {
    wrangler;
    plotDims;
    scales;
    pars;
    sizeMultiplier;
    sizeLimits;
    alphaMultiplier;
    alphaLimits;
    constructor(wrangler) {
        this.wrangler = wrangler;
        this.pars = dtstr.validMembershipArray.map((e) => {
            const p = globalParameters.reps;
            if (e === 128)
                return funs.accessIndexed(p, p.col.length - 1);
            return funs.accessIndexed(p, (e & ~128) - 1);
        });
        this.sizeMultiplier = 1;
        this.alphaMultiplier = 1;
        this.sizeLimits = {
            min: 0.001,
            max: 10,
        };
        this.alphaLimits = {
            min: 0.01,
            max: 1,
        };
    }
    getMapping = (mapping, membership = 1) => {
        let res = this.wrangler[mapping]?.extract(membership);
        res = this.scales[mapping]?.dataToPlot(res);
        return res ?? [];
    };
    get boundingRects() {
        return [];
    }
    getPars = (membership) => {
        if (membership === 128)
            return this.pars[this.pars.length - 1];
        return this.pars[(membership & ~128) - 1];
    };
    drawBase = (context) => { };
    drawHighlight = (context, selectedPoints) => { };
    registerScales = (scales) => {
        this.scales = scales;
        return this;
    };
    defaultize = () => {
        this.alphaMultiplier = 1;
        this.sizeMultiplier = 1;
    };
    // Checks which bounding rects overlap with a rectangular selection region
    //E.g. [[0, 0], [Width, Height]] should include all bound. rects
    inSelection = (selectionRect) => {
        const { wrangler, boundingRects } = this;
        const selectedReps = boundingRects.map((rect) => {
            return funs.rectOverlap(selectionRect, rect);
        });
        const selectedDatapoints = wrangler.indices.flatMap((e, i) => {
            return selectedReps[e] ? i : [];
        });
        return selectedDatapoints;
    };
    atClick = (clickPoint) => {
        const { wrangler, boundingRects } = this;
        const selectedReps = boundingRects.map((rect) => {
            return funs.pointInRect(clickPoint, rect);
        });
        const selectedDatapoints = wrangler.indices.flatMap((e, i) => {
            return selectedReps[e] ? i : [];
        });
        return selectedDatapoints;
    };
    // Handle generic keypress actions
    onKeypress = (key) => {
        const { sizeMultiplier, sizeLimits, alphaMultiplier, alphaLimits } = this;
        if (key === "KeyR")
            this.defaultize();
        if (key === "Minus" && sizeMultiplier) {
            this.sizeMultiplier = funs.gatedMultiply(sizeMultiplier, 0.8, sizeLimits);
        }
        if (key === "Equal" && sizeMultiplier && sizeMultiplier < sizeLimits.max) {
            this.sizeMultiplier = funs.gatedMultiply(sizeMultiplier, 1.2, sizeLimits);
        }
        if (key === "BracketLeft" && alphaMultiplier) {
            this.alphaMultiplier = funs.gatedMultiply(alphaMultiplier, 0.8, alphaLimits);
        }
        if (key === "BracketRight" && alphaMultiplier)
            this.alphaMultiplier = funs.gatedMultiply(alphaMultiplier, 1.2, alphaLimits);
    };
}
