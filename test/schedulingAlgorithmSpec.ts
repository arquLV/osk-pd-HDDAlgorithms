import { SchedulingAlgorithm } from "../src/ts/SchedulingAlgorithm";
import { ScheduleAlgorithmType, Direction } from "../src/ts/Enums";

var expect = require("chai").expect as Chai.ExpectStatic;
var sa = require("../src/ts/SchedulingAlgorithm");

const schedulingAlgorithm = new sa.SchedulingAlgorithm() as SchedulingAlgorithm;

describe("Scheduling algorithm tests", () => {  

    describe("First Come First Serve tests", () => {

        const fcfsAlgorithm = ScheduleAlgorithmType.FCFS;

        it("returns correct result", () => {
            const expectedResult = [50, 95, 180, 34, 119, 11, 123, 62, 64].toString();
            const start = 50;
            const queue = [95, 180, 34, 119, 11, 123, 62, 64];
            var actualResult = schedulingAlgorithm
                .schedule(fcfsAlgorithm, start, queue).toString();
            expect(actualResult).to.equal(expectedResult);
        });
    });

    describe("Shortest Seek Time First tests", () => {

        const sstfAlgorithm = ScheduleAlgorithmType.SSTF;

        it("should return expectedResult_1", () => {
            const expectedResult = [50, 62, 64, 34, 11, 95, 119, 123, 180].toString();
            const start = 50;
            const queue = [95, 180, 34, 119, 11, 123, 62, 64];
            var actualResult = schedulingAlgorithm
                .schedule(sstfAlgorithm, start, queue).toString();
            expect(actualResult).to.equal(expectedResult);
        });

        it("should return expectedResult_2", () => {
            const expectedResult = [100, 90, 58, 55, 39, 38, 18, 150, 160, 184].toString();
            const start = 100;
            const queue = [55, 58, 39, 18, 90, 160, 150, 38, 184];
            var actualResult = schedulingAlgorithm
                .schedule(sstfAlgorithm, start, queue).toString();
            expect(actualResult).to.equal(expectedResult);
        });
    });

    describe("Elevator tests", () => {

        const scanAlgorithm = ScheduleAlgorithmType.SCAN;

        it("should return expectedResult when direction is to the RIGHT", () => {
            const expectedResult = [53, 65, 67, 98, 122, 124, 183, 199, 37, 14].toString();
            const start = 53;
            const queue = [98, 183, 37, 122, 14, 124, 65, 67];
            const direction = Direction.RIGHT;
            const end = 199;
            var actualResult = schedulingAlgorithm
                .schedule(scanAlgorithm, start, queue, direction, end).toString();
            expect(actualResult).to.equal(expectedResult);
        });

        it("should return expectedResult when direction is to the LEFT", () => {
            const expectedResult = [53, 37, 14, 0, 65, 67, 98, 122, 124, 183].toString();
            const start = 53;
            const queue = [98, 183, 37, 122, 14, 124, 65, 67];
            const direction = Direction.LEFT;
            const end = 199;
            var actualResult = schedulingAlgorithm
                .schedule(scanAlgorithm, start, queue, direction, end).toString();
            expect(actualResult).to.equal(expectedResult);
        });
    });

    describe("Circular Scan tests", () => {

        const cscanAlgorithm = ScheduleAlgorithmType.CSCAN;

        it("should return expectedResult when direction is to the RIGHT", () => {
            const expectedResult = [53, 65, 67, 98, 122, 124, 183, 199, 0, 14, 37].toString();
            const start = 53;
            const queue = [98, 183, 37, 122, 14, 124, 65, 67];
            const direction = Direction.RIGHT;
            const end = 199;
            var actualResult = schedulingAlgorithm
                .schedule(cscanAlgorithm, start, queue, direction, end).toString();
            expect(actualResult).to.equal(expectedResult);
        });

        it("should return expectedResult when direction is to the LEFT", () => {
            const expectedResult = [53, 37, 14, 0, 199, 183, 124, 122, 98, 67, 65].toString();
            const start = 53;
            const queue = [98, 183, 37, 122, 14, 124, 65, 67];
            const direction = Direction.LEFT;
            const end = 199;
            var actualResult = schedulingAlgorithm
            .schedule(cscanAlgorithm, start, queue, direction, end).toString();
            expect(actualResult).to.equal(expectedResult);
        });
    });
   
    describe("LOOK tests", () => {

        const lookAlgorithm = ScheduleAlgorithmType.LOOK;

        it("should return expectedResult when direction is to the RIGHT", () => {
            const expectedResult = [53, 65, 67, 98, 122, 124, 183, 37, 14].toString();
            const start = 53;
            const queue = [98, 183, 37, 122, 14, 124, 65, 67];
            const direction = Direction.RIGHT;
            const end = 199;
            var actualResult = schedulingAlgorithm
            .schedule(lookAlgorithm, start, queue, direction, end).toString();
            expect(actualResult).to.equal(expectedResult);
        });

        it("should return expectedResult when direction is to the LEFT", () => {
            const expectedResult = [53, 37, 14, 65, 67, 98, 122, 124, 183].toString();
            const start = 53;
            const queue = [98, 183, 37, 122, 14, 124, 65, 67];
            const direction = Direction.LEFT;
            const end = 199;
            var actualResult = schedulingAlgorithm
                .schedule(lookAlgorithm, start, queue, direction, end).toString();
            expect(actualResult).to.equal(expectedResult);
        });
    });

    describe("C-LOOK tests", () => {

        const clookAlgorithm = ScheduleAlgorithmType.CLOOK;

        it("should return expectedResult when direction is to the RIGHT", () => {
            const expectedResult = [53, 65, 67, 98, 122, 124, 183, 14, 37].toString();
            const start = 53;
            const queue = [98, 183, 37, 122, 14, 124, 65, 67];
            const direction = Direction.RIGHT;
            const end = 199;
            var actualResult = schedulingAlgorithm
                .schedule(clookAlgorithm, start, queue, direction, end).toString();
            expect(actualResult).to.equal(expectedResult);
        });

        it("should return expectedResult when direction is to the LEFT", () => {
            const expectedResult = [53, 37, 14, 183, 124, 122, 98, 67, 65].toString();
            const start = 53;
            const queue = [98, 183, 37, 122, 14, 124, 65, 67];
            const direction = Direction.LEFT;
            const end = 199;
            var actualResult = schedulingAlgorithm
                .schedule(clookAlgorithm, start, queue, direction, end).toString();
            expect(actualResult).to.equal(expectedResult);
        });
    });

    describe("Tracks traversed tests", () => {

        it("should return correct result of tracks traversed for SCAN track queue", () => {
            const expectedResult = [50, 60, 84, 99, 208, 240, 243, 259, 260, 280].toString();
            const queue = [100, 150, 160, 184, 199, 90, 58, 55, 39, 38, 18];
            var actualResult = schedulingAlgorithm.tracksTraversed(queue).toString();
            expect(actualResult).to.equal(expectedResult);
        });

        it("should return correct result of tracks traversed for CSCAN track queue", () => {
            const expectedResult = [11, 58, 77, 100, 299, 311, 366].toString();
            const queue = [100, 89, 42, 23, 0, 199, 187, 132];
            var actualResult = schedulingAlgorithm.tracksTraversed(queue).toString();
            expect(actualResult).to.equal(expectedResult);
        });
    });

    describe("Tracks traversed by steps tests", () => {

        it("should return correct result of tracks traversed by steps for SCAN track queue", () => {
            const expectedResult = [50, 10, 24, 15, 109, 32, 3, 16, 1, 20].toString();
            const queue = [100, 150, 160, 184, 199, 90, 58, 55, 39, 38, 18];
            var actualResult = schedulingAlgorithm.tracksTraversedByStep(queue).toString();
            expect(actualResult).to.equal(expectedResult);
        });

        it("should return correct result of tracks traversed by steps for CSCAN track queue", () => {
            const expectedResult = [11, 47, 19, 23, 199, 12, 55].toString();
            const queue = [100, 89, 42, 23, 0, 199, 187, 132];
            var actualResult = schedulingAlgorithm.tracksTraversedByStep(queue).toString();
            expect(actualResult).to.equal(expectedResult);
        });
    });

    describe("Tracks traversed total tests", () => {

        it("should return correct result of tracks traversed total for SCAN track queue", () => {
            const expectedResult = 280;
            const queue = [100, 150, 160, 184, 199, 90, 58, 55, 39, 38, 18];
            var actualResult = schedulingAlgorithm.tracksTraversedTotal(queue);
            expect(actualResult).to.equal(expectedResult);
        });

        it("should return correct result of tracks traversed total for CSCAN track queue", () => {
            const expectedResult = 366;
            const queue = [100, 89, 42, 23, 0, 199, 187, 132];
            var actualResult = schedulingAlgorithm.tracksTraversedTotal(queue);
            expect(actualResult).to.equal(expectedResult);
        });
    });
});