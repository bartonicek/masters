export const initializeCanvasActivation = () => {

    const canvases = document.querySelectorAll('canvas')

    const deactivate_canvases = () => {
        document.querySelectorAll('canvas').forEach(e => {
            e.classList.remove('active')
        })
    }

    const activate_canvas = (canvas) => {
        canvas.classList.add('active')
    }

    canvases.forEach(canvas => {
        canvas.addEventListener("click", event => {
            event.preventDefault()
            const active_canvas = event.currentTarget
            deactivate_canvases()
            activate_canvas(active_canvas)
        })
    })
}