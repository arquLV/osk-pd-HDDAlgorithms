import * as paper from "paper";

import { ScheduleAlgorithmType, Direction } from "./Enums";
import Controller from "./Controller";
import SchedulingAlgorithm from "./SchedulingAlgorithm";
import Painter from "./Painter";


class OSKApp {

    private currentAlgorithm: ScheduleAlgorithmType;
    private currentDirection: Direction;

    private controller: Controller;
    private schedulingAlgorithm: SchedulingAlgorithm;

    private painter: Painter;

    constructor(canvas: HTMLCanvasElement) {
        this.painter = new Painter(canvas, 200);
        this.controller = new Controller();    
        this.schedulingAlgorithm = new SchedulingAlgorithm();
        
        this.currentDirection = Direction.RIGHT;        // temp, šim kontroli pēctam noimplementēsim, pagaidām vnk statisks

        this.setCurrentAlgorithm('FCFS');
        this.controller.onAlgorithmChange(this.setCurrentAlgorithm.bind(this));
        this.controller.onDirectionChange(this.setCurrentDirection.bind(this));
        this.controller.onClickRun(this.runAlgorithmWithQueue.bind(this));
    }

    private setCurrentAlgorithm(algorithmID: string) {
        this.currentAlgorithm = ScheduleAlgorithmType[algorithmID];
        console.log(this.currentAlgorithm);
    }

    private setCurrentDirection(direction: Direction) {
        this.currentDirection = direction;
    }

    private runAlgorithmWithQueue(queue: number[], start: number, end: number) {
        const result = this.schedulingAlgorithm.schedule(
            this.currentAlgorithm,
            start,
            queue,
            this.currentDirection,
            end
        );
        console.log(result);

        this.painter.paint(result);
    }
}

export default OSKApp;