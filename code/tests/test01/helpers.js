
const cart_to_px = (x, y, 
    dims = {height : 300, width : 300}, 
    coords = {xmin : 0, ymin : 0, xmax : 100, ymax : 100}) => {

    const [w, h, c] = [dims.width, dims.height, coords]
    const [xrange, yrange] = [c.xmax - c.xmin, c.ymax - c.ymin]

    const new_x = x.map(e => 0.1 * w + 0.8 * w * (e / xrange)) 
    const new_y = y.map(e => h -0.1 * h - 0.8 * h * (e / yrange)) 

    return [new_x, new_y]; 
};

export { cart_to_px }