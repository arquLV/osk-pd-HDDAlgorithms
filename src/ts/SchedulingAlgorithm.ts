import { ScheduleAlgorithmType, Direction } from "./Enums"

interface ISchedulingAlgorithm {
    schedule(
        start: number, 
        algorithm: ScheduleAlgorithmType,
        queue: number[],
        direction?: Direction,
        end?: number): number[];
    tracksTraversed(queue: number[]): number[];
    tracksTraversedByStep(queue: number[]): number[];
    tracksTraversedTotal(queue: number[]): number;
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
                case ScheduleAlgorithmType.CSCAN: {
                     return this.cscan(start, queue, direction, end);
                }
                case ScheduleAlgorithmType.LOOK: {
                     return this.look(start, queue, direction, end);
                }
                case ScheduleAlgorithmType.CLOOK: {
                     return this.clook(start, queue, direction, end);
                }
                default: {
                    return null;
                }
            }   
    }

    public tracksTraversed(queue: number[]): number[] {
        var result = [];
        for(let i = 0; i < queue.length-1; i++){
            if(i == 0){
                result.push(Math.abs(queue[i] - queue[i+1]));
            }
            else {
                result.push(Math.abs(queue[i] - queue[i+1])+result[i-1]);
            }
        }
        return result;
    }

    public tracksTraversedByStep(queue: number[]): number[] {
        var result = [];
        for(let i = 0; i < queue.length-1; i++){
            result.push(Math.abs(queue[i] - queue[i+1]));
        }
        return result;
    }

    public tracksTraversedTotal(queue: number[]): number {
        var result = 0;
        for(let i = 0; i < queue.length-1; i++){
            result += Math.abs(queue[i] - queue[i+1]);
        }
        return result;
    }

    private fcfs(
        start: number, 
        queue: number[]): number[] {
        return queue;
    }

    private sstf(
        start: number, 
        queue: number[]): number[] {
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

    private cscan(
        start: number, 
        queue: number[], 
        direction: Direction, 
        end: number): number[] {
            for(let i = 0; i < queue.length-1; i++){
                var nearestEndPostion = this.getNeareastEnd(i, queue, direction);
                if(nearestEndPostion == null){
                    direction == Direction.LEFT ? queue.push(0): queue.push(end);
                    this.swapArrayValues(i+1, queue.length-1, queue);
                    direction == Direction.RIGHT ? queue.push(0): queue.push(end);
                    this.swapArrayValues(i+2, queue.length-1, queue);
                    i++;
                }
                else{
                    this.swapArrayValues(i+1, nearestEndPostion, queue);
                }
            }
            return queue;
    }
    
    private look(
        start: number, 
        queue: number[], 
        direction: Direction, 
        end: number): number[] {
            var pivot = queue.length;
            for(let i = 0; i < queue.length-1; i++){
                var nearestEndPostion = this.getNeareastEnd(i, queue, direction);
                if(nearestEndPostion == null) {
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

    private clook(
        start: number, 
        queue: number[], 
        direction: Direction, 
        end: number): number[] {
             for(let i = 0; i < queue.length-1; i++){
                var nearestEndPostion = this.getNeareastEnd(i, queue, direction);
                if(nearestEndPostion == null){
                    this.swapArrayValues(i+1, this.getFurthestEnd(i, queue), queue);
                }
                else{
                    this.swapArrayValues(i+1, nearestEndPostion, queue);
                }
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

    private getFurthestEnd(currentPosition: number, queue: number[]) {
        var distance = null as number;
        var furthestEndPostion = null as number;
        for(let i = currentPosition+1; i < queue.length; i++){
            var tmpDistance = Math.abs(queue[currentPosition] - queue[i]);
            if(tmpDistance > distance || distance == null) {
                distance = tmpDistance;
                furthestEndPostion = i;
            }
        }
        return furthestEndPostion;
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