import { SchedulingAlgorithm } from "../src/ts/algorithms/SchedulingAlgorithm";
import { ScheduleAlgorithmType, Direction } from "../src/ts/Enums";

var expect = require("chai").expect as Chai.ExpectStatic;
var sa = require("../src/ts/algorithms/SchedulingAlgorithm");

const schedulingAlgorithm = new sa() as SchedulingAlgorithm;

describe("Scheduling algorithm tests", () => {  

    describe("First Come First Serve tests", () => {

        const fcfsAlgorithm = ScheduleAlgorithmType.FCFS;

        it("returns correct result", () => {
            const expectedResult = [50, 95, 180, 34, 119, 11, 123, 62, 64].toString();
            const start = 50;
            const queue = [95, 180, 34, 119, 11, 123, 62, 64];
            var actualResult = schedulingAlgorithm.schedule(fcfsAlgorithm, start, queue);
            expect(actualResult.toString()).to.equal(expectedResult);
        });
    });

    describe("Shortest Seek Time First tests", () => {

        const sstfAlgorithm = ScheduleAlgorithmType.SSTF;

        it("should return expectedResult_1", () => {
            const expectedResult = [50, 62, 64, 34, 11, 95, 119, 123, 180].toString();
            const start = 50;
            const queue = [95, 180, 34, 119, 11, 123, 62, 64];
            var actualResult = schedulingAlgorithm.schedule(sstfAlgorithm, start, queue);
            expect(actualResult.toString()).to.equal(expectedResult);
        });

        it("should return expectedResult_2", () => {
            const expectedResult = [100, 90, 58, 55, 39, 38, 18, 150, 160, 184].toString();
            const start = 100;
            const queue = [55, 58, 39, 18, 90, 160, 150, 38, 184];
            var actualResult = schedulingAlgorithm.schedule(sstfAlgorithm, start, queue);
            expect(actualResult.toString()).to.equal(expectedResult);
        });
    });

    describe("Elevator(Scan) tests", () => {

        const scanAlgorithm = ScheduleAlgorithmType.SCAN;

        it("should return expectedResult when direction is to the RIGHT", () => {
            const expectedResult = [53, 65, 67, 98, 122, 124, 183, 199, 37, 14].toString();
            const start = 53;
            const queue = [98, 183, 37, 122, 14, 124, 65, 67];
            const direction = Direction.RIGHT;
            const end = 199;
            var actualResult = schedulingAlgorithm.schedule(scanAlgorithm, start, queue, direction, end);
            expect(actualResult.toString()).to.equal(expectedResult);
        });

        it("should return expectedResult when direction is to the LEFT", () => {
            const expectedResult = [53, 37, 14, 0, 65, 67, 98, 122, 124, 183].toString();
            const start = 53;
            const queue = [98, 183, 37, 122, 14, 124, 65, 67];
            const direction = Direction.LEFT;
            const end = 199;
            var actualResult = schedulingAlgorithm.schedule(scanAlgorithm, start, queue, direction, end);
            expect(actualResult.toString()).to.equal(expectedResult);
        });
    });
});