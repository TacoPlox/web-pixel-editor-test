var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var tools = {
    brush: {
        color: "black",
    },
    eraser: {
        color: "white",
        // size: 1,
    },
    selectedTool: null,
    selectedToolElement: null,
    pixelSize: 10,
    selectedToolEnabled: false,
};

// ctx.fillStyle = tools.brush.color;

var selectTool = function(toolName, toolElement) {
    tools.selectedTool = toolName;
    toolElement.className += " selected";

    if (tools.selectedToolElement) {
        tools.selectedToolElement.className = tools.selectedToolElement.className.replace(" selected", "");
    }
    tools.selectedToolElement = toolElement;
};

var brushToolButton = document.getElementById("brush");
brushToolButton.onclick = function(e) {
    selectTool("brush", brushToolButton);
    ctx = canvas.getContext("2d");
    ctx.fillStyle = tools.brush.color;
    // console.log('tools.brush.color', tools.brush.color);
}

var eraserToolButton = document.getElementById("eraser");
eraserToolButton.onclick = function(e) {
    selectTool("eraser", eraserToolButton);
    ctx = canvas.getContext("2d");
    ctx.fillStyle = tools.eraser.color;
    // console.log('tools.eraser.color', tools.eraser.color);
}

var updateCanvasSize = function () {
    var width = document.getElementById("canvas_options_input_width").value || 500;
    var height = document.getElementById("canvas_options_input_height").value || 500;

    var canvas = document.getElementById("canvas");
    var heightPx = (height * tools.pixelSize);
    var widthPx = (width * tools.pixelSize);
    canvas.style.height = heightPx + "px";
    canvas.style.width = widthPx + "px";
    canvas.height = heightPx;
    canvas.width = widthPx;
}

updateCanvasSize();

var canvasOptionsForm = document.getElementById("canvas_options_form");
canvasOptionsForm.onsubmit = function (e) {
    e.preventDefault();

    updateCanvasSize();
}

var brushAtCurrentCanvasMousePosition = function(e, color) {
    // ctx.fillStyle = color;
    // console.log('ctx.fillStyle', ctx.fillStyle);

    var x = e.offsetX - (e.offsetX % tools.pixelSize);
    var y = e.offsetY - (e.offsetY % tools.pixelSize);

    // console.log('e.offsetX', e.offsetX);
    // console.log('e.offsetY', e.offsetY);

    // console.log('x', x);
    // console.log('y', y);

    // console.log('canvas.width', canvas.width);
    // console.log('canvas.height', canvas.height);

    ctx.fillRect(x, y, tools.pixelSize, tools.pixelSize);
};

var onCanvasMouseDown = function(e) {
    e.stopPropagation();
    tools.selectedToolEnabled = true;
    if (tools.selectedTool && tools.selectedToolEnabled) {
        switch(tools.selectedTool) {
            case 'brush':
                brushAtCurrentCanvasMousePosition(e, tools.brush.color);
                break;
            case 'eraser':
                brushAtCurrentCanvasMousePosition(e, tools.eraser.color);
                break;
        }
    }
}

var onCanvasMouseMove = function (e) {
    e.stopPropagation();
    if (tools.selectedTool && tools.selectedToolEnabled) {
        switch(tools.selectedTool) {
            case 'brush':
                brushAtCurrentCanvasMousePosition(e, tools.brush.color);
                break;
            case 'eraser':
                brushAtCurrentCanvasMousePosition(e, tools.eraser.color);
                break;

        }
    }
};

var onCanvasMouseUp = function(e) {
    if (tools.selectedTool) {
        tools.selectedToolEnabled = false;
    }
}

canvas.addEventListener('mousedown', onCanvasMouseDown);
canvas.addEventListener('mouseup', onCanvasMouseUp);
canvas.addEventListener('mousemove', onCanvasMouseMove);

// canvas.onclick = function(e) {
//     console.log('e', e);
//     // e.offsetX
//     // e.offsetY

    
//     // ctx.fillRect(x, y, 5, 5)
// }