const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const homeButton = $('.home-button')
const app1El = $('.app-1')
const app2El = $('.app-2')
const coupleKirby = $('.couple-kirby')
const startButton = $('.start-button')
const numberCounter = $('.number-counter')
const answer = $('.text-bubble h1')
const nextButton = $('.next-button')
const repeatButton = $('.repeat-button')

const App = {

    data: [],

    number: null,

    isAvailableRepeatButton: false,

    isAvailableNextButton: false,

    startAnimate() {
        coupleKirby.classList.add('animate')
        startButton.classList.add('animate')
    },

    loadData() {
        for (let i = 1; i <= 100; i++) {
            this.data.push(i)
        }
    },

    getData() {
        const dataIndex = Math.floor(Math.random() * 100)
        this.number = this.data[dataIndex]
    },

    speechData() {
        const synth = window.speechSynthesis
        synth.paused = false
        const toSpeak = new SpeechSynthesisUtterance(this.number)
        synth.speak(toSpeak)
    },

    renderData() {
        answer.innerHTML = this.number
    },

    speechNextData() {
        const _this = this
        nextButton.onclick = () => {
            if (_this.isAvailableNextButton) {
                _this.getData()
                _this.speechData()
                _this.isAvailableRepeatButton = false
                repeatButton.classList.add('disabled')
                _this.isAvailableNextButton = false
                nextButton.classList.add('disabled')
                setTimeout(() => {
                    _this.renderData()
                    this.isAvailableRepeatButton = true
                    repeatButton.classList.remove('disabled')
                    _this.isAvailableNextButton = true
                    nextButton.classList.remove('disabled')
                }, 2000);
            }
        }
    },

    repeatClick() {
        const _this = this
        repeatButton.onclick = () => {
            if (_this.isAvailableRepeatButton) {
                _this.speechData()
                _this.isAvailableRepeatButton = false
                repeatButton.classList.add('disabled')

                setTimeout(() => {
                    this.isAvailableRepeatButton = true
                    repeatButton.classList.remove('disabled')
                }, 1000);
            }
        }
    },

    startOnclick() {
        const _this = this
        startButton.onclick = () => {
            homeButton.classList.remove('hiden')
            app1El.classList.add('hiden')
            app2El.classList.remove('hiden')
            setTimeout(() => {
                _this.timer()
            }, 0);

            setTimeout(() => {
                _this.speechData()
            }, 5200);

            setTimeout(() => {
                _this.renderData()
                _this.isAvailableNextButton = true
                nextButton.classList.remove('disabled')
                _this.isAvailableRepeatButton = true
                repeatButton.classList.remove('disabled')
            }, 7200);
        }
    },

    backHome() {
        homeButton.onclick = () => {
            location.reload()
        }
    },

    timer() {
        let i = 3
        const timerFunction = () => {
            numberCounter.innerHTML = `${i}`
            i--
            if (i < -1) {
                clearInterval(timerInterval)
                numberCounter.innerHTML = ''
            }
        }
        const timerInterval = setInterval(timerFunction, 1000)
    },

    start() {
        this.startAnimate()
        this.loadData()
        this.getData()
        this.startOnclick()
        this.speechNextData()
        this.repeatClick()
        this.backHome()
    }
}

App.start()