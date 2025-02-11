import * as THREE from 'three'; 
import './style.css'


import{OrbitControls} from  'three/examples/jsm/controls/OrbitControls'
import gasp from "gsap"
// scene

const scene = new THREE.Scene();


// create a sphere
const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
  color: "#89CFF0",
})
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh)


// sizes

const sizes = {
  width: window.innerWidth,
  height:window.innerHeight,
}


// light

const light = new THREE.PointLight(0xffffff, 1, 100)
light.intensity = 450;
light.position.set(0, 10, 10)
scene.add(light)

// camera

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1,100)
camera.position.z = 20
scene.add(camera)




// renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(1);
renderer.render(scene, camera)


// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotate = 5


// resize
window.addEventListener('resize',() =>{
  // update sizes
  console.log(window.innerWidth)
  sizes.width =  window.innerWidth
  sizes.height = window.innerHeight

  // update cameras
  
  camera.aspect = sizes.width /  sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)

})

const loop =  ()=> {
  // mesh.position.x += 0.1
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()


// timeline magic
const t1 = gasp.timeline({defaults: { duration : 1 }})
t1.fromTo(mesh.scale,{z:0, x:0, y:0}, {z:1, x:1, y:1})
t1.fromTo("nav",{y: "-100%"},{y: "-0%"})
t1.fromTo(".title",{opacity: 0}, {opacity: 1})



// mouse animation colour
let mouseDown = false

let rgb = []

window.addEventListener("mousedown",() => (mouseDown = true))
window.addEventListener("mouseup",() => (mouseDown = false))

window.addEventListener('mousemove', (e) => {
  if(mouseDown){
    rgb =[
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      150,
    ]
    // animation
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
    new THREE.Color(`rgb(110,120,150)`)
      gasp.to(mesh.material.color,{r: newColor.r, g: newColor.g, b:newColor.b})
    
  }
})