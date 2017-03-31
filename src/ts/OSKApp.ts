import * as paper from "paper";

import * as FCFS from "./algorithms/FCFS";

class OSKApp {
    
    private canvas: HTMLCanvasElement;
    private currentAlgorithm: Algorithm;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;    
        
        paper.setup(this.canvas);
        
    }
}

export default OSKApp;