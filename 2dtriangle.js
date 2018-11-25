// simple 2d triangle

self.addEventListener('message', (e) => {
    (function(canvas, glMatrix){
        let gl = canvas.getContext('webgl');
        if(!canvas || !gl){
            alert('Your browser seems not support it');
            return;
        }
    
    
        // doing glsl
        var vertexSource = `
        precision mediump float;
    
        attribute vec2 vertPosition;
        attribute vec3 vertColor;
    
        varying vec3 fragColor;
        void main()
        {
            fragColor = vertColor;
            gl_Position = vec4(vertPosition, 0.0, 1.0);
        }
    
        
        `
        var fragmentSource = `
        precision mediump float;
        
        varying vec3 fragColor;
        void main()
        {
            gl_FragColor = vec4(fragColor, 1.0);
        }
        `
    
        // doing shader
        let ver_shader = gl.createShader(gl.VERTEX_SHADER)
        let fr_shader  = gl.createShader(gl.FRAGMENT_SHADER)
    
        gl.shaderSource(ver_shader, vertexSource)
        gl.shaderSource(fr_shader, fragmentSource)
    
        gl.compileShader(ver_shader);
        if (!gl.getShaderParameter(ver_shader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(ver_shader));
            return;
        }
    
        gl.compileShader(fr_shader);
        if (!gl.getShaderParameter(fr_shader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fr_shader));
            return;
        }
        
        // program
    
        let program = gl.createProgram()
        gl.attachShader(program, ver_shader)
        gl.attachShader(program, fr_shader)
        gl.linkProgram(program)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('ERROR linking program!', gl.getProgramInfoLog(program))
            return
        }
        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', gl.getProgramInfoLog(program))
            return
        }
        
    
        // start drawing
    
        let triVertices = [
            // x, y     , r, g, b
            0.0, 0.3,       1.0, 1.0, .5,
            -0.5, -0.5,     0.5, 1.0, 0.5,
            0.5, -0.5,      .5, 0.5, 1.0,
        ]
    
        let triVertexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, triVertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triVertices), gl.STATIC_DRAW)
    
        let posAttr = gl.getAttribLocation(program, 'vertPosition')
        let clrAttr = gl.getAttribLocation(program, 'vertColor')
        gl.vertexAttribPointer(
            posAttr, 
            2,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            0
        )
        gl.vertexAttribPointer(
            clrAttr, 
            3,
            gl.FLOAT,
            gl.FALSE,
            5 * Float32Array.BYTES_PER_ELEMENT,
            2 * Float32Array.BYTES_PER_ELEMENT
        )
    
    
        gl.enableVertexAttribArray(posAttr)
        gl.enableVertexAttribArray(clrAttr)
        gl.useProgram(program)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    })(e.data.canvas, e.data.glMatrix)
})

