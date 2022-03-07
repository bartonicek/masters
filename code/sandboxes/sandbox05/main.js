import { DragHandler } from "./draghandler.js";
import { Plot } from "./plot.js";


const plot1 = new Plot({xmin : 0, xmax : 100, ymin : 0, ymax : 100})
const plot2 = new Plot({xmin : 0, xmax : 100, ymin : 0, ymax : 100})

plot1.base.context.fillStyle = 'red'
plot1.base.context.fillRect(50, 75, 100, 100)
