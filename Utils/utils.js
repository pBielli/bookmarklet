
function includeScript(src){
const script = document.createElement('script');
script.src = src;
document.head.appendChild(script);

}
// Funzione per convertire il canvas in un Base64
function canvasImageToBase64(canvas) {
    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error('Il nodo passato non è un elemento canvas.');
    }
    return canvas.toDataURL('image/png');
}


function downloadBase64Img(img, fileName = 'canvas-image'){
        // Crea un link per il download e avvia il download
        var link = document.createElement('a');
        link.href = img;
        link.download = `${fileName}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
}
function downloadCanvasImg(canvas, fileName = 'canvas-image'){
    downloadBase64Img(canvasImageToBase64(canvas),fileName);
}
