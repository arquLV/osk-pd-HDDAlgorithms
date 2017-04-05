import { Direction } from './Enums'

class Controller {
    private currentAlgorithm: string;
    private algorithmSelect: HTMLSelectElement;

    private startInput: HTMLInputElement;
    private endInput: HTMLInputElement;
    private directionSwitch: HTMLDivElement;

    private algorithmQueue: HTMLTextAreaElement;
    private algorithmRunButton: HTMLButtonElement;

    private optionalControlsContainer: HTMLDivElement;

    private algorithmChangeCallback: (algorithmID: string) => void;
    private directionChangeCallback: (direction: Direction) => void;
    private algorithmRunCallback: (queue: number[], start: number, end: number) => void;

    constructor() {
        this.optionalControlsContainer = <HTMLDivElement>document.getElementById('optional-container');

        this.algorithmSelect = <HTMLSelectElement>document.getElementById('algorithm-select');
        this.setupSelectListener();

        this.algorithmQueue = <HTMLTextAreaElement>document.getElementById('algorithm-queue');
        this.setupTextareaCharacterCheck();

        this.algorithmRunButton = <HTMLButtonElement>document.getElementById('algorithm-run');
        this.setupRunButton();

        this.directionSwitch = <HTMLDivElement>document.getElementById('direction-switch');
        this.setupDirectionSwitch();

        this.setupNumberInputs();
    }

    private setupSelectListener() {
        this.algorithmSelect.addEventListener('change', () => {
            const algorithmID = this.algorithmSelect.value.toUpperCase();
            if(algorithmID == 'FCFS' || algorithmID == 'SSTF') {
                this.optionalControlsContainer.classList.add('hidden');
            } else {
                this.optionalControlsContainer.classList.remove('hidden');
            }
            
            this.algorithmChangeCallback(algorithmID);
        });
    }
    public onAlgorithmChange(callback: (algorithmID: string) => void) {
        this.algorithmChangeCallback = callback;
    }
    public onDirectionChange(callback: (direction: Direction) => void) {
        this.directionChangeCallback = callback;
    }

    private setupTextareaCharacterCheck() {
        this.algorithmQueue.addEventListener('keypress', event => {
            let keycode = event.which;
            console.log(keycode);
            if ((keycode >= 48 && keycode <= 57) || keycode == 44) {
                return true;
            } else {
                event.preventDefault();
                return false;
            }
        });
    }

    public onClickRun(callback: (queue: number[], start: number, end: number) => void) {
        this.algorithmRunCallback = callback;
    }

    private setupRunButton() {
        this.algorithmRunButton.addEventListener('click', event => {
            event.preventDefault();

            const queueString = this.getSanitizedQueueString();
            const queue: number[] = queueString.split(',').map(str => parseInt(str));

            const start: number = parseInt(this.startInput.value);
            const end: number = parseInt(this.endInput.value);

            this.algorithmRunCallback(queue, start, end);
        });
    }

    private getSanitizedQueueString(): string {
        let queue = this.algorithmQueue.value;

        queue = queue.replace(/[^\d\,]/gi, '');
        this.algorithmQueue.value = queue;

        return queue;
    }

    private setupDirectionSwitch() {

        const input = this.directionSwitch.getElementsByTagName('input')[0];
        const switchButton = this.directionSwitch.getElementsByTagName('a')[0];

        switchButton.addEventListener('click', () => {
            switch (input.value) {
                case 'right':
                    console.log('LEFT');
                    input.value = 'left';
                    this.directionChangeCallback(Direction.LEFT);
                    this.directionSwitch.classList.remove('right');
                    this.directionSwitch.classList.add('left');
                    break;

                case 'left':
                default:
                    console.log('RIGHT');
                    input.value = 'right';
                    this.directionChangeCallback(Direction.RIGHT);
                    this.directionSwitch.classList.remove('left');
                    this.directionSwitch.classList.add('right');
            }
        });
    }

    private setupNumberInputs() {
        this.startInput = <HTMLInputElement>document.getElementById('algorithm-start');
        this.endInput = <HTMLInputElement>document.getElementById('algorithm-end');

        const inputs = [this.startInput, this.endInput];
        inputs.forEach(input => {
            input.addEventListener('keypress', event => {
                let keycode = event.which;
                if ((keycode >= 48 && keycode <= 57)) {
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        })

    }
}

export default Controller;