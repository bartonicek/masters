const sceneHandler = {
    
    // The default proxy state of the selector
    selector: [false, false, false],

    get(target, key, value) {

        // If we want to return a selector, return the proxy selector instead
        if (key === 'selector') {
            return this.selector 

        // Recursively go down the property tree, making new proxies until we hit a leaf node
        } else if (typeof target[key] === 'object' && target[key] !== null) {
            return new Proxy(target[key], sceneHandler)
        
        // If we want a leaf node property that is NOT a selector, return it
        } else {
            return target[key]    
        }

    },

    set(target, key, value) {

        // If we want to change a selector, change the proxy selector as a side-effect
        if (key === 'selector') {
            this.selector = value
            target[key] = value
            return true

        // Otherwise, change the property in a regular way
        } else {
            target[key] = value
            return true    
        }
    },
}

class Scene {

    constructor() {

        this.selector = [false, false]
        this.plot = { a : 'A', b : [1, 2, 3], selector : [true, false],
                    select(){ this.selector = [true, true, true] }} 
        this.col = 'red'
        this.num = 3.14

        return new Proxy(this, sceneHandler)

    }

    selectAll() {
        this.plot.selector = [true, true]
    }
}

const scene1 = new Scene()

//scene1.plot.selector = [false, false]

console.log(scene1.selector)
scene1.plot.selector = [true, true]
console.log(scene1.selector)
scene1.selector = 'bam'
console.log(scene1.selector)
scene1.selectAll()
console.log(scene1.selector)
scene1.plot.select()
console.log(scene1.selector)
