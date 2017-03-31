enum ReadDirection {
    Left,
    Right
}

abstract class AlgorithmBase {
    abstract run(trackQueue: number[], start: number, direction?: ReadDirection): number[]
}

export default AlgorithmBase;