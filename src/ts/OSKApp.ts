import * as paper from "paper";

import Controller from "./Controller";
import AlgorithmBase from "./AlgorithmBase";
import FCFS from "./algorithms/FCFS";

interface AlgorithmsContainer {
    [algorithmID: string]: AlgorithmBase
}

class OSKApp {

    private algorithms: AlgorithmsContainer;
    private currentAlgorithm: AlgorithmBase;

    private controller: Controller;
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.controller = new Controller();    

        this.algorithms = {
            fcfs: new FCFS(),
            // sstf: new SSTF()
            // ../
        };
        
        this.setCurrentAlgorithm('fcfs');
        this.controller.onAlgorithmChange(this.setCurrentAlgorithm.bind(this));

        paper.setup(this.canvas);

        // Test stuff
        var path = new paper.Path();
        var start = new paper.Point(100, 100);
        path.moveTo(start);
        path.strokeColor = 'black';
        path.lineTo(start.add([150, 100]));
        path.lineTo(start.add([100, -50]));
        path.smooth();
        paper.view.draw();        
    }

    private setCurrentAlgorithm(algorithmID: string) {
        if(this.algorithms.hasOwnProperty(algorithmID)) {
            this.currentAlgorithm = this.algorithms[algorithmID];
            console.log(this.currentAlgorithm);
        }
    }
}

export default OSKApp;