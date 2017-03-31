import OSKApp from './OSKApp'

document.addEventListener('DOMContentLoaded', event => {
    const targetCanvas = <HTMLCanvasElement>document.getElementById('main-canvas');
    const oskAlgorithms = new OSKApp(targetCanvas);
});