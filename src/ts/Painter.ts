import * as paper from "paper";

import { ScheduleAlgorithmType, Direction } from "./Enums";
import Controller from "./Controller";
import SchedulingAlgorithm from "./SchedulingAlgorithm";


class Painter {

    private canvas: HTMLCanvasElement;
    private nCylinders: number;
    private rowHeight: number = 20;
    private circleRaidus: number = 3;
    private xPadding: number = 20;
    private yPadding: number = 40;
    private axisPadding: number = 12;
    private xScale: number = 2;

    /**
     * 
     * @param canvas 
     * @param nCillinders number of cillinders
     */
    constructor(canvas: HTMLCanvasElement, nCylinders: number) {
        this.canvas = canvas;
        this.nCylinders = nCylinders;

        paper.setup(this.canvas);

        this.paintAxis();
    }

    private paintAxis() {
        let firstTick = new paper.Path({
            strokeColor: 'black',
            segments: [
                [this.xPadding * this.xScale, this.axisPadding],
                [this.xPadding * this.xScale, this.yPadding - this.axisPadding]
            ]
        });

        var fistTickText = new paper.PointText({
            point: [this.xPadding * this.xScale, this.yPadding],
            content: '0',
            fillColor: 'black',
            fontFamily: 'Courier New',
            justification: 'center',
            fontSize: 14
        });

        let lastTick = new paper.Path({
            strokeColor: 'black',
            segments: [
                [(this.nCylinders - 1) * this.xScale, this.axisPadding],
                [(this.nCylinders - 1) * this.xScale, this.yPadding - this.axisPadding]
            ]
        });

        var lastTickText = new paper.PointText({
            point: [(this.nCylinders - 1) * this.xScale, this.yPadding],
            content: this.nCylinders - 1,
            fillColor: 'black',
            fontFamily: 'Courier New',
            justification: 'center',
            fontSize: 14
        });

        let xAxis = new paper.Path({
            strokeColor: 'black',
            segments: [
                [0, this.yPadding / 2],
                [(this.nCylinders - 1 + this.xPadding) * this.xScale, this.yPadding / 2]
            ]
        });

        paper.view.draw();
    }

    public paint(queue: number[]) {
        let path = new paper.Path();
        path.strokeColor = 'black';

        for(let i = 0; i < queue.length; i++) {
            let point = new paper.Point(
                (this.xPadding + queue[i]) * this.xScale,
                this.yPadding + this.rowHeight * i);
            let circle = paper.Shape.Circle({
                center: point,
                radius: this.circleRaidus,
                strokeColor: 'black',
                fillColor: 'black'
            });
            path.add(point);
        }

        path.smooth();
        paper.view.draw();
    }

}

export default Painter;