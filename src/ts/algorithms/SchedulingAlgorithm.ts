import { ScheduleAlgorithmType, Direction } from "../Enums"

interface ISchedulingAlgorithm {
    schedule(
        start: number, 
        algorithm: ScheduleAlgorithmType,
        queue: number[],
        direction?: Direction,
        end?: number): number[];
}

export class SchedulingAlgorithm implements ISchedulingAlgorithm {

    public schedule(
        algorithm: ScheduleAlgorithmType, 
        start: number, 
        queue: number[],
        direction?: Direction,
        end?: number): number[] { 
            
            queue.unshift(start);
            switch(algorithm) {
                case ScheduleAlgorithmType.FCFS: {
                    return this.fcfs(start, queue);
                }
                case ScheduleAlgorithmType.SSTF: {
                    return this.sstf(start, queue);
                }
                case ScheduleAlgorithmType.SCAN: {
                    return this.scan(start, queue, direction, end);
                }
                default: {
                    return null;
                }
            }   
    }

    private fcfs(start: number, queue: number[]): number[] {
        return queue;
    }

    private sstf(start: number, queue: number[]): number[] {
        for(let i = 0; i < queue.length-1; i++){
            var nearestEndPostion = this.getNeareastEnd(i, queue);
            this.swapArrayValues(i+1, nearestEndPostion, queue);
        }
        return queue;
    }  

    private scan(
        start: number, 
        queue: number[], 
        direction: Direction, 
        end: number): number[] {
            var pivot = queue.length;
            for(let i = 0; i < queue.length-1; i++){
                var nearestEndPostion = this.getNeareastEnd(i, queue, direction);
                if(nearestEndPostion == null){
                    direction == Direction.LEFT ? queue.push(0): queue.push(end);
                    this.swapArrayValues(i+1, queue.length-1, queue);
                    pivot = i;
                    break;
                }
                this.swapArrayValues(i+1, nearestEndPostion, queue);
            }
            for(let i = pivot; i < queue.length-1; i++){
                var nearestEndPostion = this.getNeareastEnd(i, queue);
                this.swapArrayValues(i+1, nearestEndPostion, queue);
            }
            return queue;
    } 

    private getNeareastEnd(currentPosition: number, queue: number[], direction?: Direction): number{
        switch(direction){
            case Direction.LEFT: {
                var distance = null as number;
                var nearestEndPostion = null as number;
                for(let i = currentPosition+1; i < queue.length; i++){
                    var tmpDistance = queue[currentPosition] - queue[i];
                    if((tmpDistance < distance || distance == null) && tmpDistance > 0) {
                        distance = tmpDistance;
                        nearestEndPostion = i;
                    }
                }
                return nearestEndPostion;
            }
            case Direction.RIGHT: {
                var distance = null as number;
                var nearestEndPostion = null as number;
                for(let i = currentPosition+1; i < queue.length; i++){
                    var tmpDistance = queue[currentPosition] - queue[i];
                    if((tmpDistance > distance || distance == null) && tmpDistance < 0) {
                        distance = tmpDistance;
                        nearestEndPostion = i;
                    }
                }
                return nearestEndPostion;
            }
            default: {
                var distance = null as number;
                var nearestEndPostion = null as number;
                for(let i = currentPosition+1; i < queue.length; i++){
                    var tmpDistance = Math.abs(queue[currentPosition] - queue[i]);
                    if(tmpDistance < distance || distance == null) {
                        distance = tmpDistance;
                        nearestEndPostion = i;
                    }
                }
                return nearestEndPostion;
            }
        }
    }

    private swapArrayValues(
        index1: number, 
        index2: number, 
        queue: any[]): void{
            var tmpValue = queue[index1];
            queue[index1] = queue[index2];
            queue[index2] = tmpValue;
    }
}
module.exports = SchedulingAlgorithm;