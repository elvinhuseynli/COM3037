var gl;

var color = [Math.random(), Math.random(), Math.random(), 1.0]

window.onload = function main() {
	var canvas = document.getElementById( "glcanvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "Cannot open Webgl" ); }

    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    r_render();
}



function r_render(){
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var vColor = gl.getUniformLocation( program, "fColor" );
    gl.uniform4fv(vColor, color);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta");

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 30);
}