
class Controller {
    private currentAlgorithm: string;
    private algorithmSelect: HTMLSelectElement;

    private algorithmQueue: HTMLTextAreaElement;
    private algorithmRunButton: HTMLButtonElement;

    private algorithmChangeCallback: (algorithmID: string) => void;
    private algorithmRunCallback: (queue: number[]) => void;

    constructor() {
        this.algorithmSelect = <HTMLSelectElement>document.getElementById('algorithm-select');
        this.setupSelectListener();

        this.algorithmQueue = <HTMLTextAreaElement>document.getElementById('algorithm-queue');
        this.setupTextareaCharacterCheck();

        this.algorithmRunButton = <HTMLButtonElement>document.getElementById('algorithm-run');
        this.setupRunButton();
    }

    private setupSelectListener() {
        this.algorithmSelect.addEventListener('change', () => {
            console.log(this.algorithmSelect.value);
            this.algorithmChangeCallback(this.algorithmSelect.value.toUpperCase());
        });
    }
    public onAlgorithmChange(callback: (algorithmID: string) => void) {
        this.algorithmChangeCallback = callback;
    }

    private setupTextareaCharacterCheck() {
        this.algorithmQueue.addEventListener('keypress', event => {
            let keycode = event.which;
            console.log(keycode);
            if((keycode >= 48 && keycode <= 57) || keycode == 44) {
                return true;
            } else {
                event.preventDefault();
                return false;
            }
        });
    }

    public onClickRun(callback: (queue: number[]) => void) {
        this.algorithmRunCallback = callback;
    }

    private setupRunButton() {
        this.algorithmRunButton.addEventListener('click', event => {
            event.preventDefault();

            const queueString = this.getSanitizedQueueString();
            const queue: number[] = queueString.split(',').map(str => parseInt(str));

            this.algorithmRunCallback(queue);
        });
    }

    private getSanitizedQueueString(): string {
        let queue = this.algorithmQueue.value;

        queue = queue.replace(/[^\d\,]/gi, '');
        this.algorithmQueue.value = queue;

        return queue;
    }
}

export default Controller;