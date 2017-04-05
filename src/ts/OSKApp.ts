import * as paper from "paper";

import { ScheduleAlgorithmType, Direction } from "./Enums";
import Controller from "./Controller";
import SchedulingAlgorithm from "./SchedulingAlgorithm";
import ScalingSlider from "./ScalingSlider";
import Painter from "./Painter";


class OSKApp {

    private currentAlgorithm: ScheduleAlgorithmType;
    private currentDirection: Direction;

    private controller: Controller;
    private schedulingAlgorithm: SchedulingAlgorithm;

    private scalingSlider: ScalingSlider;
    private painter: Painter;

    private resultsContainer: HTMLDivElement;
    private resultsSteps: HTMLSpanElement;
    private resultsTotal: HTMLSpanElement;

    constructor(canvas: HTMLCanvasElement) {
        this.painter = new Painter(canvas, 200);
        this.controller = new Controller(); 

        this.scalingSlider = new ScalingSlider();   
        this.scalingSlider.onSliderChange(value => {
            console.log(value);
        });

        this.schedulingAlgorithm = new SchedulingAlgorithm();
        
        this.currentDirection = Direction.RIGHT;        // temp, šim kontroli pēctam noimplementēsim, pagaidām vnk statisks

        this.setCurrentAlgorithm('FCFS');
        this.controller.onAlgorithmChange(this.setCurrentAlgorithm.bind(this));
        this.controller.onDirectionChange(this.setCurrentDirection.bind(this));
        this.controller.onClickRun(this.runAlgorithmWithQueue.bind(this));

        this.resultsContainer = <HTMLDivElement>document.getElementById('results');
        this.resultsSteps = <HTMLSpanElement>document.getElementById('steps');
        this.resultsTotal = <HTMLSpanElement>document.getElementById('total');
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
        this.resultsContainer.classList.remove('hidden');
        this.showTextResults(result);
    }

    private showTextResults(result: number[]) {
        const totalTraversed = this.schedulingAlgorithm.tracksTraversedTotal(result);

        this.resultsSteps.innerText = result.join(', ');
        this.resultsTotal.innerText = totalTraversed.toString();
    }
}

export default OSKApp;