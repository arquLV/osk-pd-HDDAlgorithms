import * as paper from "paper";

import { ScheduleAlgorithmType, Direction } from "./Enums";
import Controller from "./Controller";
import SchedulingAlgorithm from "./SchedulingAlgorithm";


class OSKApp {

    private currentAlgorithm: ScheduleAlgorithmType;
    private currentDirection: Direction;
    private startPosition: number;
    private endPosition: number;

    private controller: Controller;
    private schedulingAlgorithm: SchedulingAlgorithm;

    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.controller = new Controller();    
        this.schedulingAlgorithm = new SchedulingAlgorithm();
        
        this.currentDirection = Direction.RIGHT;        // temp, šim kontroli pēctam noimplementēsim, pagaidām vnk statisks
        this.startPosition = 50;                        // arī temp
        this.endPosition = 100;                         // same

        this.setCurrentAlgorithm('FCFS');
        this.controller.onAlgorithmChange(this.setCurrentAlgorithm.bind(this));
        this.controller.onClickRun(this.runAlgorithmWithQueue.bind(this));

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
        this.currentAlgorithm = ScheduleAlgorithmType[algorithmID];
        console.log(this.currentAlgorithm);
    }

    private runAlgorithmWithQueue(queue: number[]) {
        console.log(queue);

        const result = this.schedulingAlgorithm.schedule(
            this.currentAlgorithm,
            this.startPosition,
            queue,
            this.currentDirection,
            this.endPosition
        );
        console.log(result);
    }
}

export default OSKApp;