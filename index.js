(function(){

    const gl_2dtrianle_worker = new Worker('./2dtriangle.js')
    const gl_3dcube_worker = new Worker('./3dcube.js')

    const c2dtriangle = document.getElementById('2dtriangle').transferControlToOffscreen()
    const c3dcube = document.getElementById('3dcube').transferControlToOffscreen()

    gl_2dtrianle_worker.postMessage({canvas: c2dtriangle}, [c2dtriangle]);
    gl_3dcube_worker.postMessage({canvas: c3dcube}, [c3dcube])
})()