// Sokoban Game
// author: CG


import * as THREE from 'three'
import { WebGLRenderer, Scene, Camera, PerspectiveCamera, Color, Mesh } from 'three';


class Sokoban{
    renderer: WebGLRenderer
    mainScene: Scene
    camera: Camera
    cubmesh: Mesh
    constructor(width: number, height: number, dom: HTMLElement){

        this.init()
        this.renderer.setSize(width, height)
        this.renderer.setClearColor(new Color(123,123,123))
        dom.appendChild(this.renderer.domElement)

        const light = new THREE.AmbientLight(0xffffff, 0.5)
        const plight = new THREE.PointLight(0xffffff, 0.4)
        this.mainScene.add(light,plight)

        // test
        const cube = new THREE.BoxGeometry(100,100,100)
        const material = new THREE.MeshStandardMaterial({
            color: new Color().setHSL(120/240,.9,.3),
            metalness: 0.5,
            roughness: 0.1
        })
        this.cubmesh = new THREE.Mesh(cube, material)
        this.camera.position.set(0,0,0)
        this.cubmesh.position.set(0,0,-2000)
        this.mainScene.add(this.cubmesh)
    }

    private init() {
        this.renderer = new WebGLRenderer()
        this.mainScene = new Scene()
        this.camera = new PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000)
        requestAnimationFrame(() => this.render())
    }
    

    private render() {
        this.renderer.clear()


        this.cubmesh.rotation.x += 0.01
        this.cubmesh.rotation.y += 0.01
        this.renderer.render(this.mainScene, this.camera)
        requestAnimationFrame(() => this.render())
    }
}


const game = new Sokoban(window.innerWidth, window.innerHeight, document.body)