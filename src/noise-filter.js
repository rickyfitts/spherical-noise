export default class NoiseFilter {
    constructor() {
        this.settings = {
            baseRoughness: 1,
            center: new THREE.Vector3(0, 0, 0),
            numLayers: 1,
            persistence: 0.5,
            roughness: 5,
            speed: 0.001,
            strength: 2,
        }
    }

    evaluate = p => {
        let noiseValue = 0
        let frequency = this.settings.baseRoughness
        let amplitude = this.settings.strength // 1

        // cuz im a brat ;)
        new Array(this.settings.numLayers).fill(null).forEach((_, i) => {
            const point = p.clone().multiplyScalar(frequency).add(this.settings.center).addScalar(window.performance.now() * this.settings.speed)
            const v = noise.perlin3(point.x, point.y, point.z) * amplitude
            noiseValue += v
            frequency *= this.settings.roughness
            amplitude *= this.settings.persistence
        })

        return noiseValue
    }

    updateSettings = newSettings => {
        this.settings = { ...this.settings, ...newSettings }
    }

    updateCenter = ({x, y, z}) => {
        if (x) this.settings.center.x = x 
        if (y) this.settings.center.y = y 
        if (z) this.settings.cetner.z = z
    }

    createControls = gui => {
        const folder = gui.addFolder('Noise')
        folder.add(this.settings, 'strength').min(1).max(40).onChange(val => this.updateSettings({ strength: val }))
        folder.add(this.settings, 'baseRoughness').min(-5).max(5).onChange(val => this.updateSettings({ baseRoughness: val }))
        folder.add(this.settings, 'roughness').min(-5).max(5).onChange(val => this.updateSettings({ roughness: val }))
        folder.add(this.settings, 'numLayers').min(0).max(10).step(1).onChange(val => this.updateSettings({ numLayers: val }))
        folder.add(this.settings, 'persistence').min(0).max(1).onChange(val => this.updateSettings({ peristence: val }))
        folder.add(this.settings, 'speed').min(0).max(0.0025).onChange(val => this.updateSettings({ speed: val }))
        folder.add({ centerX: 0 }, 'centerX').min(-10).max(10).onChange(x => this.updateCenter({ x }))
        folder.add({ centerY: 0 }, 'centerY').min(-10).max(10).onChange(y => this.updateCenter({ y }))
        folder.add({ centerZ: 0 }, 'centerZ').min(-10).max(10).onChange(z => this.updateCenter({ z }))
    } 
}