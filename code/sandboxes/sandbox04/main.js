
const canvas = document.querySelector('#canv1')
const context = canvas.getContext('2d')

canvas.width = 400
canvas.height = 400

context.fillStyle = 'antiquewhite'
context.fillRect(0, 0, canvas.width, canvas.height)
context.fillStyle = 'skyblue'
context.fillRect(100, 100, 200, 200)

let x0, y0, x1, y1, dragging

const startDrag = event => {
    dragging = true 
    x0 = event.offsetX
    y0 = event.offsetY
}

const whileDrag = event => {
    if (dragging) {
        x1 = event.offsetX
        y1 = event.offsetY

        draw()
    }
}

const endDrag = event => {
    dragging = false
}

const draw = () => {
    context.fillStyle = 'antiquewhite'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = 'skyblue'
    context.fillRect(100, 100, 200, 200)
    context.fillStyle = 'rgba(100, 100, 100, 0.25)'
    context.fillRect(x0, y0, x1 - x0, y1 - y0)
}

canvas.addEventListener('mousedown', startDrag)
canvas.addEventListener('mousemove', whileDrag)
canvas.addEventListener('mouseup', endDrag)

