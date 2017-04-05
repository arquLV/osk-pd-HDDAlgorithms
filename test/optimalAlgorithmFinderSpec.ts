import { ScheduleAlgorithmType, Direction } from "../src/ts/Enums";
import {  IOptimalSchedulingAlgorithm, OptimalAlgorithmFinder } from "../src/ts/OptimalAlgorithmFinder"

var expect = require("chai").expect as Chai.ExpectStatic;
var osa = require("../src/ts/OptimalAlgorithmFinder");

const optimalAlgorithmFinder = new osa.OptimalAlgorithmFinder() as OptimalAlgorithmFinder;

describe("Optimal algorithm finder tests", () => {  

    describe("Optimal scheduling algorithm finder tests", () => {

        it("should return clook object", () => {
            const expectedResult = { 
                algorithm: { 
                    name: 'CLOOK', 
                    id: 6, 
                    direction: { 
                        name: 'LEFT', 
                        id: 1 } 
                    },
                tracksTraversedTotal: 208,
                resultQueue: [ 53, 37, 14, 65, 67, 98, 122, 124, 183 ] 
            };
            const start = 53;
            const queue = [98, 183, 37, 122, 14, 124, 65, 67];
            const end = 199;
            var actualResult = optimalAlgorithmFinder.optimalSchedulingAlgorithm(start, queue, end);
            expect(actualResult.algorithm.name).to.equal(expectedResult.algorithm.name);
            expect(actualResult.algorithm.id).to.equal(expectedResult.algorithm.id);
            expect(expectedResult.algorithm.direction.name).to.equal(expectedResult.algorithm.direction.name);
            expect(expectedResult.algorithm.direction.id).to.equal(expectedResult.algorithm.direction.id);
            expect(expectedResult.resultQueue).to.equal(expectedResult.resultQueue);
            expect(expectedResult.tracksTraversedTotal).to.equal(expectedResult.tracksTraversedTotal);
        });
    });
});