document.addEventListener('alpine:init', () => {
    Alpine.data('countdownWrapper', () => ({
        dateValue: '',
        dateObj: null,
        countDownInterval: null,
        sign: '',
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        now: new Date(),
        setDateObj() {
            this.dateObj = new Date(Date.parse(this.dateValue));
        },
        init() {
            this.countDownInterval = setInterval(() => {
                // if (this.dateObj === null && this.dateValue !== '') {
                //     this.dateObj = new Date(Date.parse(this.dateValue));
                // }
                this.now = new Date();
                if (this.dateObj - this.now < 0) {
                    this.sign = '-';
                } else {
                    this.sign = '';
                }
                this.days = Math.floor(Math.abs((this.dateObj - this.now) / (1000 * 60 * 60 * 24)));
                this.hours = Math.floor(Math.abs((this.dateObj - this.now) / (1000 * 60 * 60) % 24));
                this.minutes = Math.floor(Math.abs((this.dateObj - this.now) / (1000 * 60) % 60));
                this.seconds = Math.floor(Math.abs((this.dateObj - this.now) / 1000 % 60));
            }, 1000);
        },
        log() { console.log(this.dateValue); },
        destroy() { clearInterval(this.countDownInterval); },
    }));
});