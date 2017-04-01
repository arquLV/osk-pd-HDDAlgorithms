import { ScheduleAlgorithmType } from "../Enums"

interface ISchedulingAlgorithm {
    schedule(
        start: number, 
        algorithm: ScheduleAlgorithmType,
        queue: number[]): number[];
}

export class SchedulingAlgorithm implements ISchedulingAlgorithm {

    public schedule(
        algorithm: ScheduleAlgorithmType, 
        start: number, 
        queue: number[]): number[] { 
            
            switch(algorithm) {
                case ScheduleAlgorithmType.FCFS: {
                    return this.fcfs(start, queue);
                }
                case ScheduleAlgorithmType.SSTF: {
                    return this.sstf(start, queue);
                }
                default: {
                    return null;
                }
            }   
    }

    private fcfs(start: number, queue: number[]): number[] {
        queue.unshift(start);
        return queue;
    }

    private sstf(start: number, queue: number[]): number[] {
        queue.unshift(start);
        var distance = null as number;
        for(let i = 1; i < queue.length; i++){
            for(let j = i; j< queue.length; j++){
                var tmpDistance = Math.abs(queue[i-1] - queue[j]);
                if(tmpDistance < distance || distance == null) {
                    distance = tmpDistance;
                    var tmpValue = queue[i];
                    queue[i] = queue[j];
                    queue[j] = tmpValue;
                }
            }
            distance = null;
        }
        return queue;
    }  

    private scan(queue: number[]): number[] {
        var distance = null as number;
        for(let i = 1; i < queue.length; i++){
            for(let j = i; j< queue.length; j++){
                var tmpDistance = (queue[i-1] - queue[j]);
                if((tmpDistance < distance || distance == null) && tmpDistance > 0) {
                    distance = tmpDistance;
                    var tmpValue = queue[i];
                    queue[i] = queue[j];
                    queue[j] = tmpValue;
                }
            }
            distance = null;
        }
        return queue;
    } 
}
module.exports = SchedulingAlgorithm;