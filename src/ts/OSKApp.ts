import * as paper from "paper";

class OSKApp {
    
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;    
        
        paper.setup(this.canvas);
        
    }
}

export default OSKApp;