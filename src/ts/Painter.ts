import * as paper from "paper";

import { ScheduleAlgorithmType, Direction } from "./Enums";
import Controller from "./Controller";
import SchedulingAlgorithm from "./SchedulingAlgorithm";


class Painter {

    private canvas: HTMLCanvasElement;
    private nCylinders: number;
    private rowHeight: number = 20;
    private circleRaidus: number = 2;
    private xPadding: number = 20;
    private yPadding: number = 40;
    private axisHeight: number = 15;
    private textPadding: number = 12;
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

        this.drawAxis();
    }

    private drawAxis() {
        let firstTick = new paper.Path({
            strokeColor: 'black',
            segments: [
                [this.xPadding * this.xScale, 0],
                [this.xPadding * this.xScale, this.axisHeight]
            ]
        });

        let fistTickText = new paper.PointText({
            point: [this.xPadding * this.xScale, this.axisHeight + this.textPadding],
            content: '0',
            fillColor: 'black',
            fontFamily: 'Courier New',
            justification: 'center',
            fontSize: 14
        });

        let lastTick = new paper.Path({
            strokeColor: 'black',
            segments: [
                [(this.nCylinders - 1 + this.xPadding) * this.xScale, 0],
                [(this.nCylinders - 1 + this.xPadding) * this.xScale, this.axisHeight]
            ]
        });

        let lastTickText = new paper.PointText({
            point: [(this.nCylinders - 1 + this.xPadding) * this.xScale, this.axisHeight + this.textPadding],
            content: this.nCylinders - 1,
            fillColor: 'black',
            fontFamily: 'Courier New',
            justification: 'center',
            fontSize: 14
        });

        let xAxis = new paper.Path({
            strokeColor: 'black',
            segments: [
                [0, this.axisHeight / 2],
                [(this.nCylinders - 1 + this.xPadding * 2) * this.xScale, this.axisHeight / 2]
            ]
        });

        paper.view.draw();
    }

    public paint(queue: number[]) {
        paper.project.activeLayer.removeChildren();
        this.drawAxis();

        let path = new paper.Path();
        path.strokeColor = 'black';

        for(let i = 0; i < queue.length; i++) {
            let point = new paper.Point(
                (this.xPadding + queue[i]) * this.xScale,
                this.yPadding + this.rowHeight * i);

            let tick = new paper.Path({
                strokeColor: 'black',
                segments: [
                    [(queue[i] + this.xPadding) * this.xScale, 0],
                    [(queue[i] + this.xPadding) * this.xScale, this.axisHeight]
                ]
            });

            let text = new paper.PointText({
                point: [(queue[i] + this.xPadding) * this.xScale, this.axisHeight + this.textPadding],
                content: queue[i],
                fillColor: 'black',
                fontFamily: 'Courier New',
                justification: 'center',
                fontSize: 14
            });

            let circle = paper.Shape.Circle({
                center: point,
                radius: this.circleRaidus,
                strokeColor: 'black',
                fillColor: 'black'
            });
            path.add(point);
        }

        path.smooth({type: 'geometric'});
        paper.view.draw();
    }

}

export default Painter;