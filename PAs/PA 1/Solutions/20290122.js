var gl;

var theta = 0.0;
var thetaLoc;

var speed = 100;
var direction = true;
var vertices2 = [];
var vertices = [
      -.6, .5,
      -.5, .5,
      -.6, -.5,
      -.5, .5,
      -.6, -.5,
      -.5, -.5,
      -.5, .5,
      -.5, .4,
      -.1, .5,
      -.5, .4,
      -.1, .5,
      -.1, .4,
      -.1 , .05,
      -.1, -.05,
      -.5, -.05,
      -.1 , .05,
      -.5, -.05,
      -.5, .05,
      -.5, -.5,
      -.5, -.4,
      -.1, -.5,
      -.1, -.4,
      -.5, -.4,
      -.1, -.5,
      .1, .5,
      .2, .5,
      .1, -.5,
      .2, .5,
      .1, -.5,
      .2, -.5,
    ];
var color = [Math.random(), Math.random(), Math.random(), 1.0]

window.onload = function main()
{
    var canvas = document.getElementById( "glcanvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "Cannot open Webgl" ); }

    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    rrender();
    
    document.getElementById("rotate").onclick = function (event) {
        document.getElementById("rotate").innerHTML = "Speed Up";
        render();
    };
    
    document.getElementById("slider").onchange = function(event) {
        speed = 100 - event.target.value;
    };

    document.getElementById("slider1x").onchange = function(event){
        for (var i = 0; i < 24; i++) {
            vertices[2*i] = vertices[2*i]+parseFloat(event.target.value);
            vertices[2*i+1] = vertices[2*i+1];
        }
        for (var i = 24; i < 30; i++) {
            vertices[2*i] = vertices[2*i];
            vertices[2*i+1] = vertices[2*i+1];
        }
        rrender();
    };
    
    document.getElementById("sliderx").onchange = function(event){
        for (var i = 0; i < 30; i++) {
            vertices[2*i] = vertices[2*i]+parseFloat(event.target.value);
            vertices[2*i+1] = vertices[2*i+1];
        }
        rrender();
    };

    document.getElementById("slidery").onchange = function(event){
        for (var i = 0; i < 30; i++) {
            vertices[2*i] = vertices[2*i];
            vertices[2*i+1] = vertices[2*i+1]+parseFloat(event.target.value);
        }
        rrender();
    }

    document.getElementById("slider1y").onchange = function(event){
        for (var i = 0; i < 24; i++) {
            vertices[2*i] = vertices[2*i];
            vertices[2*i+1] = vertices[2*i+1]+parseFloat(event.target.value);
        }
        for (var i = 24; i < 30; i++) {
            vertices[2*i] = vertices[2*i];
            vertices[2*i+1] = vertices[2*i+1];
        }
        rrender();
    }

    document.getElementById("slider2x").onchange = function(event){
        for (var i = 24; i < 30; i++) {
            vertices[2*i] = vertices[2*i]+parseFloat(event.target.value);
            vertices[2*i+1] = vertices[2*i+1];
        }
        for (var i = 0; i < 24; i++) {
            vertices[2*i] = vertices[2*i];
            vertices[2*i+1] = vertices[2*i+1];
        }
        rrender();
    };

    document.getElementById("slider2y").onchange = function(event){
        for (var i = 24; i < 30; i++) {
            vertices[2*i] = vertices[2*i];
            vertices[2*i+1] = vertices[2*i+1]+parseFloat(event.target.value);
        }
        for (var i = 0; i < 24; i++) {
            vertices[2*i] = vertices[2*i];
            vertices[2*i+1] = vertices[2*i+1];
        }
        rrender();
    }

    document.getElementById("scale1").onchange = function(event) {
        for (var i = 0; i < 48; i++) {
            vertices[i] = vertices[i] * parseFloat(event.target.value);
        }
        for (var i = 48; i < 60; i++) {
            vertices[i] = vertices[i];
        }
        rrender();
    }
    document.getElementById("scale2").onchange = function(event) {
        for (var i = 0; i < 48; i++) {
            vertices[i] = vertices[i];
        }
        for (var i = 48; i < 60; i++) {
            vertices[i] = vertices[i] * parseFloat(event.target.value);
        }
        rrender();
    }
    
    document.getElementById("scale").onchange = function(event) {
        for (var i = 0; i < 60; i++) {
            vertices[i] = vertices[i] * parseFloat(event.target.value);
        }
        rrender();
    }

    document.getElementById("direction").onclick = function (event) {
        direction = !direction;
    };

    document.getElementById("color").onclick = function (event) {
        change_c();
    };

    window.addEventListener("keydown", change);

};

function change_c(){
    color = [Math.random(),Math.random(),Math.random(),1.0];
    rrender();

}

function change(e){
    if (e.keyCode == "67"){
        color = [Math.random(),Math.random(),Math.random(),1.0];
        rrender();
    }
}

function rrender(){
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

function render(){
    gl.clear( gl.COLOR_BUFFER_BIT );

    theta += (direction ? 0.1 : -0.1);
    gl.uniform1f(thetaLoc, theta);

    gl.drawArrays(gl.TRIANGLES, 0, 30);

    setTimeout(
        function () {requestAnimFrame( render );},
        speed
    );
}