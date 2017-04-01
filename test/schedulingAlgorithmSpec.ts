import { SchedulingAlgorithm } from "../src/ts/algorithms/SchedulingAlgorithm";
import { ScheduleAlgorithmType } from "../src/ts/Enums";

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
            expect(expectedResult).to.equal(actualResult.toString());
        });
    });

    describe("Shortest Seek Time First tests", () => {

        const sstfAlgorithm = ScheduleAlgorithmType.SSTF;

        it("should return expectedResult_1", () => {
            const expectedResult = [50, 62, 64, 34, 11, 95, 119, 123, 180].toString();
            const start = 50;
            const queue = [95, 180, 34, 119, 11, 123, 62, 64];
            var actualResult = schedulingAlgorithm.schedule(sstfAlgorithm, start, queue);
            expect(expectedResult).to.equal(actualResult.toString());
        });

        it("should return expectedResult_2", () => {
            const expectedResult = [100, 90, 58, 55, 39, 38, 18, 150, 160, 184].toString();
            const start = 100;
            const queue = [55, 58, 39, 18, 90, 160, 150, 38, 184];
            var actualResult = schedulingAlgorithm.schedule(sstfAlgorithm, start, queue);
            expect(expectedResult).to.equal(actualResult.toString());
        });
    });
});