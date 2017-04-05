import { ScheduleAlgorithmType, Direction } from "./Enums"
import SchedulingAlgorithm from "./SchedulingAlgorithm";

interface IOptimalAlgorithmFinder{
    optimalSchedulingAlgorithm(
        start: number,
        queue: number[], 
        end: number): IOptimalSchedulingAlgorithm;
}

export interface IOptimalSchedulingAlgorithm {
    algorithm: ISchedulegAlgorithm,
    direction?: Direction,
    tracksTraversedTotal: number,
    resultQueue: number[]
}

export interface ISchedulegAlgorithm {
    name: string;
    id: ScheduleAlgorithmType;
    direction?: IDirection;
}

export interface IDirection {
    name: string,
    id: Direction
}

export class OptimalAlgorithmFinder implements IOptimalAlgorithmFinder {

    public optimalSchedulingAlgorithm(
        start: number,
        queue: number[],
        end: number): IOptimalSchedulingAlgorithm {
            
            var schedulingAlgorithm = new SchedulingAlgorithm();

            var algorithms = [
                { 
                    name: ScheduleAlgorithmType[ScheduleAlgorithmType.FCFS], 
                    id: ScheduleAlgorithmType.FCFS 
                } as ISchedulegAlgorithm,
                { 
                    name: ScheduleAlgorithmType[ScheduleAlgorithmType.SSTF], 
                    id: ScheduleAlgorithmType.SSTF 
                } as ISchedulegAlgorithm,
                { 
                    name: ScheduleAlgorithmType[ScheduleAlgorithmType.SCAN], 
                    id: ScheduleAlgorithmType.SCAN, 
                    direction: { 
                        name: Direction[Direction.LEFT],
                        id: Direction.LEFT
                    } 
                } as ISchedulegAlgorithm,
                { 
                    name: ScheduleAlgorithmType[ScheduleAlgorithmType.SCAN], 
                    id: ScheduleAlgorithmType.SCAN, 
                    direction: { 
                        name: Direction[Direction.RIGHT],
                        id: Direction.RIGHT
                    } 
                } as ISchedulegAlgorithm,
                { 
                    name: ScheduleAlgorithmType[ScheduleAlgorithmType.CSCAN], 
                    id: ScheduleAlgorithmType.CSCAN, 
                    direction: { 
                        name: Direction[Direction.LEFT],
                        id: Direction.LEFT
                    } 
                } as ISchedulegAlgorithm,
                { 
                    name: ScheduleAlgorithmType[ScheduleAlgorithmType.CSCAN], 
                    id: ScheduleAlgorithmType.CSCAN, 
                    direction: { 
                        name: Direction[Direction.RIGHT],
                        id: Direction.RIGHT
                    } 
                } as ISchedulegAlgorithm,
                { 
                    name: ScheduleAlgorithmType[ScheduleAlgorithmType.CLOOK], 
                    id: ScheduleAlgorithmType.CLOOK, 
                    direction: { 
                        name: Direction[Direction.LEFT],
                        id: Direction.LEFT
                    } 
                } as ISchedulegAlgorithm,
                { 
                    name: ScheduleAlgorithmType[ScheduleAlgorithmType.CLOOK], 
                    id: ScheduleAlgorithmType.CLOOK, 
                    direction: { 
                        name: Direction[Direction.RIGHT],
                        id: Direction.RIGHT
                    } 
                } as ISchedulegAlgorithm
            ] as ISchedulegAlgorithm[];

            var queues = [] as number[][];
            
            queues.push(schedulingAlgorithm.schedule(ScheduleAlgorithmType.FCFS, start, queue.slice()) as number[]);
            queues.push(schedulingAlgorithm.schedule(ScheduleAlgorithmType.SSTF, start, queue.slice()) as number[]);
            queues.push(schedulingAlgorithm.schedule(ScheduleAlgorithmType.SCAN, start, queue.slice(), Direction.LEFT, end) as number[]);
            queues.push(schedulingAlgorithm.schedule(ScheduleAlgorithmType.SCAN, start, queue.slice(), Direction.RIGHT, end) as number[]);
            queues.push(schedulingAlgorithm.schedule(ScheduleAlgorithmType.CSCAN, start, queue.slice(), Direction.LEFT, end) as number[]);
            queues.push(schedulingAlgorithm.schedule(ScheduleAlgorithmType.CSCAN, start, queue.slice(), Direction.RIGHT, end) as number[]);
            queues.push(schedulingAlgorithm.schedule(ScheduleAlgorithmType.LOOK, start, queue.slice(), Direction.LEFT, end) as number[]);
            queues.push(schedulingAlgorithm.schedule(ScheduleAlgorithmType.LOOK, start, queue.slice(), Direction.RIGHT, end) as number[]);
            queues.push(schedulingAlgorithm.schedule(ScheduleAlgorithmType.CLOOK, start, queue.slice(), Direction.LEFT, end) as number[]);
            queues.push(schedulingAlgorithm.schedule(ScheduleAlgorithmType.CLOOK, start, queue.slice(), Direction.RIGHT, end) as number[]);
            
            var optionsTracksTraversedTotal = [] as number[];

            for(let i = 0; i < queues.length; i++){
                optionsTracksTraversedTotal.push(schedulingAlgorithm.tracksTraversedTotal(queues[i]));
            }
            
            var optimalTracksTraversedTotal = Math.min.apply(Math, optionsTracksTraversedTotal) as number;

            var index = optionsTracksTraversedTotal.indexOf(optimalTracksTraversedTotal);
            var optimalAlgorithm = algorithms[index] as ISchedulegAlgorithm;
            var optimalResultQueue = queues[index] as number[];
            
            var result = {
                algorithm: optimalAlgorithm,
                tracksTraversedTotal: optimalTracksTraversedTotal,
                resultQueue: optimalResultQueue
            } as IOptimalSchedulingAlgorithm;

            return result;
    }
}

export default OptimalAlgorithmFinder;