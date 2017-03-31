
class Controller {
    private currentAlgorithm: string;
    private algorithmSelect: HTMLSelectElement;

    private algorithmChangeCallback: (algorithmID: string) => void;

    constructor() {
        this.algorithmSelect = <HTMLSelectElement>document.getElementById('algorithm-select');
        this.setupSelectListener();
    }

    private setupSelectListener() {
        this.algorithmSelect.addEventListener('change', () => {
            console.log(this.algorithmSelect.value);
            this.algorithmChangeCallback(this.algorithmSelect.value);
        });
    }

    public onAlgorithmChange(callback: (algorithmID: string) => void) {
        this.algorithmChangeCallback = callback;
    }
}

export default Controller;