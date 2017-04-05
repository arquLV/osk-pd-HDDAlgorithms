class ScalingSlider {
    private container: HTMLDivElement;
    
    private value: number;
    private fill: HTMLElement;
    private toggle: HTMLElement;

    private origin: number;
    private scaling: number;

    private onSliderChangeCallback: (value: number) => void;

    constructor() {
        this.container = <HTMLDivElement>document.getElementById('scale-slider');

        this.value = 50;
        this.fill = <HTMLElement>this.container.getElementsByClassName('fill')[0];
        this.toggle = <HTMLElement>this.container.getElementsByClassName('toggle')[0];

        this.showValue();
        this.setupToggle();
    }

    public onSliderChange(callback: (value: number) => void) {
        this.onSliderChangeCallback = callback;
    }

    private showValue() {
        this.fill.style.width = this.value + '%';
        this.toggle.style.left = this.value + '%';
    }

    private setupToggle() {
        this.origin = this.container.getBoundingClientRect().left;
        this.scaling = 100 / this.container.clientWidth;

        let startpos = 0;
        let mousedown = false;
        
        this.toggle.addEventListener('mousedown', (e: MouseEvent) => {
            startpos = e.clientX;
            mousedown = true;
        });

        document.addEventListener('mouseup', () => {
            mousedown = false;
        });
        document.addEventListener('mousemove', (e: MouseEvent) => {
            if(mousedown) {
                this.value = Math.min(Math.max((e.clientX - this.origin) * this.scaling, 0), 100);
                this.showValue();

                this.onSliderChangeCallback(this.value);
            }
        });

        window.addEventListener('resize', () => {
            this.origin = this.container.getBoundingClientRect().left;
            this.scaling = 100 / this.container.clientWidth;
        });
    }
}

export default ScalingSlider;