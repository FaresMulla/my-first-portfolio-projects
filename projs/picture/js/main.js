'use stract'
var gCurrQuestIdx = 0
function init() {
    console.log('loaded');

}

function startTest(elBtnStart) {
    var elTestModal = document.querySelector('.modalTest');
    var elP = document.querySelector('.instructions')
    if (elBtnStart.innerText === 'Start Test') {
        elBtnStart.innerText = 'Stop Test'
        elTestModal.style.display = 'block'
        createQuests()
        elP.innerText = 'Please choose the correct answer'
    } else {
        elBtnStart.innerText = 'Start Test'
        elTestModal.style.display = 'none'
        elP.innerText = 'Click on the button when you want to start'
    }
}

var gQuests = [
    {
        id: 1,
        opts: [
            'Carrot',
            'Lettuce',
            'Cucumber',
            'Tomato'
        ],
        correctOptIndex: 2
    },
    {
        id: 2,
        opts: [
            'Carrot',
            'Lettuce',
            'Cucumber',
            'Tomato'
        ],
        correctOptIndex: 3
    },
    {
        id: 3,
        opts: [
            'Carrot',
            'Lettuce',
            'Cucumber',
            'Tomato'
        ],
        correctOptIndex: 0
    },
    {
        id: 4,
        opts: [
            'Carrot',
            'Lettuce',
            'Cucumber',
            'Tomato'
        ],
        correctOptIndex: 1
    },
    {
        id: 5,
        opts: [
            'Watermelon',
            'Lettuce',
            'Avocado',
            'Peach'
        ],
        correctOptIndex: 2
    },
    {
        id: 6,
        opts: [
            'Watermelon',
            'Lettuce',
            'Avocado',
            'Peach'
        ],
        correctOptIndex: 3
    },
    {
        id: 7,
        opts: [
            'Watermelon',
            'Lettuce',
            'Avocado',
            'Peach'
        ],
        correctOptIndex: 0
    },
]

function createQuests() {
    var elTd = document.querySelectorAll('.wQus')
    for (var i = 0; i < gQuests.length; i++) {
        if (gCurrQuestIdx === i) {
            renderQuest(i)
            elTd[i].style.backgroundColor = 'green'
        }
        if (gQuests.length === gCurrQuestIdx) {
            var elBtnStart = document.querySelector('.startBtn')
            elBtnStart.innerText = 'Play Again'
            gCurrQuestIdx = 0
        }
    }
}

function renderQuest(qusId) {
    var strHtml = ''
    var elImg = document.querySelector('.imgQus')
    for (var i = 0; i < gQuests[qusId].opts.length; i++) {
        strHtml += `<div onclick="checkAnswer(${i})" class="opQus">${gQuests[qusId].opts[i]}</div>`
        elImg.src = `img/0${(qusId + 1)}.jpg`

    }
    var elOpQus = document.querySelector('.qusDiv.qusOp')
    elOpQus.innerHTML = strHtml
}

function checkAnswer(optIdx) {
    if (optIdx === gQuests[gCurrQuestIdx].correctOptIndex) {
        console.log(`Your answer to the 0${(gCurrQuestIdx + 1)} question is correct`)
        gCurrQuestIdx++
        createQuests()
    } else {
        var wrongAn = document.querySelector('.modalNote')
        wrongAn.style.display = 'block'
        setTimeout(() => { wrongAn.style.display = 'none' }, 1500)

    }
}

