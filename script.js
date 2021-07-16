const app = {}

app.mainBoard = document.querySelector('.mainBoard')
app.gameOver = document.querySelector('.gameOver')
app.gameGrid = document.querySelector('.gameGrid')
app.soberLevel = document.querySelector('.soberLevel')
app.characterQuoteDisplay = document.querySelector('.characterQuote')
app.highScoreDisplay = document.querySelector('.highScore')
app.currentScoreDisplay = document.querySelector('.currentScore')

app.characterButton = document.querySelectorAll('.characterButton');
app.loadingPage = document.querySelector('.loading');

app.characterPic = document.querySelector('.characterPic'); // only using once
app.characterProfile = document.querySelector('.characterProfile')

app.characterParams = []
app.characterQuotes = []


app.area = []
app.sober = 50
app.currentScore = 0
app.highScore = 0
app.level = 0;

app.characterButton.forEach(button => button.addEventListener('click', (e) => {
    e.target.classList.contains('homer')
        ? app.characterParams = ['simpsons', 'Homer', 'Smrt and lovable drunk']
        : e.target.classList.contains('fry')
            ? app.characterParams = ['futurama', 'Fry', 'Intergalactic delivery boy']
            : e.target.classList.contains('darth')
                ? app.characterParams = ['starwars', 'Darth Vader', 'Has daddy issues']
                : app.characterParams = ['starwars', 'Han Solo', 'Self proclaimed bad boy']

    // : e.target.classList.contains('han')
    // ? app.characterParams = ['show', 'starwars', 'Han Solo', 3]
    // : null

    app.loadingPage.style.display = "none";
    app.mainBoard.style.display = "flex";
    app.init = () => {
        app.makeGrid()
        app.makeClick()
        app.liquor()
        app.beer()
        app.wine()
        app.soberCheck()
        app.displayCharacteristics()
    }

    app.init()

}))



app.area = []
app.sober = 50
app.currentScore = 0
app.highScore = 0
app.level = 0;
app.characterQuotes = []

app.url = new URL('http://api.chrisvalleskey.com/fillerama/get.php')
app.url.search = new URLSearchParams({
    format: 'json',
})

app.apiCall = async (tvShow, character) => {
    const getQuotes = async () => {
        app.url.searchParams.set('show', tvShow)
        const res = await fetch(app.url)
        const data = await res.json()
        return data
    }
    await getQuotes(character)
        .then((res) => {
            app.characterQuotes = res.db.filter(x => x.source == character).map(y => y.quote)
        })
    return Promise.resolve()
}



app.displayCharacteristics = async () => {
    //Change Character Display Picture
    app.characterPic.innerHTML = `<img src="./assets/${app.characterParams[1].split(' ')[0]}.jpg" alt="">`

    //change Character Profile Information
    app.characterProfile.textContent = `${app.characterParams[1]}: ${app.characterParams[2]}`

    //API Call for Quotes
    await app.apiCall(...app.characterParams)

    //Change Quote function
    app.changeQuote = () => {
        console.log('changing quotes')
        let randomQuoteNum = Math.floor(Math.random() * app.characterQuotes.length)
        app.characterQuoteDisplay.textContent = app.characterQuotes[randomQuoteNum]
    }

    //Call Funtions and setInterval
    app.changeQuote()
    app.quoteInterval = () => endQuote = setInterval(app.changeQuote, 7500)
    app.quoteInterval()
}

app.clearQuotes = () => clearInterval(endQuote)

//Make the playing field
app.makeGrid = () => {
    for (let i = 1; i <= 100; i++) {
        let place = document.createElement('div')
        place.classList.add("place")
        app.gameGrid.appendChild(place)
        app.area.push(place)
    }
}

//Generate a random beer
app.randomBeer = () => {
    //Generate a beerIndex that is not already taken by another beer
    let beerIndex
    do {
        beerIndex = Math.floor(Math.random() * app.area.length)
    } while (app.area[beerIndex].classList.contains('beer'))

    app.area[beerIndex].classList.add('beer')
    setTimeout(() => {
        app.area[beerIndex].classList.remove('bw')
        app.area[beerIndex].classList.remove('beer')
    }, 4000)
}

//Generate Random Liquor
app.randomLiquor = () => {
    const directionArray = ['up', 'down', 'left', 'right']
    let liquorMoveCounter = 0
    let liquorIndex = Math.floor(Math.random() * app.area.length)
    let liquorDirection = directionArray[Math.floor(Math.random() * directionArray.length)]

    app.area[liquorIndex].classList.contains('bw')
        ? (app.area[liquorIndex].classList.add('bwl'), app.area[liquorIndex].classList.add('liquor'))
        : app.area[liquorIndex].classList.contains('beer')
            ? (app.area[liquorIndex].classList.add('bl'), app.area[liquorIndex].classList.add('liquor'))
            : app.area[liquorIndex].classList.contains('wine')
                ? (app.area[liquorIndex].classList.add('wl'), app.area[liquorIndex].classList.add('liquor'))
                : app.area[liquorIndex].classList.add('liquor')

    // app.area[wineIndex].classList.contains('beer') ? (app.area[wineIndex].classList.add('beerAndWine'), app.area[wineIndex].classList.add('wine')) : app.area[wineIndex].classList.add('wine')

    app.moveLiquor = () => {
        liquorMoveCounter++
        // app.area[wineIndex].classList.remove('beerAndWine')
        // app.area[liquorIndex].classList.remove('liquor')
        app.area[liquorIndex].classList.remove('bwl')
        app.area[liquorIndex].classList.remove('bl')
        app.area[liquorIndex].classList.remove('wl')
        app.area[liquorIndex].classList.remove('liquor')

        // wineIndex % 10 != 9 ? wineIndex++ : wineIndex -= 9 
        liquorDirection == 'up'
            ? liquorIndex >= 10 ? liquorIndex -= 10 : liquorIndex += 90
            : liquorDirection == "right"
                ? liquorIndex % 10 != 9 ? liquorIndex++ : liquorIndex -= 9
                : liquorDirection == "down"
                    ? liquorIndex <= 89 ? liquorIndex += 10 : liquorIndex -= 90
                    : liquorIndex % 10 != 0 ? liquorIndex-- : liquorIndex += 9

        app.area[liquorIndex].classList.contains('bw')
            ? (app.area[liquorIndex].classList.add('bwl'), app.area[liquorIndex].classList.add('liquor'))
            : app.area[liquorIndex].classList.contains('beer')
                ? (app.area[liquorIndex].classList.add('bl'), app.area[liquorIndex].classList.add('liquor'))
                : app.area[liquorIndex].classList.contains('wine')
                    ? (app.area[liquorIndex].classList.add('wl'), app.area[liquorIndex].classList.add('liquor'))
                    : app.area[liquorIndex].classList.add('liquor')


        // app.area[wineIndex].classList.contains('beer') ? (app.area[wineIndex].classList.add('beerAndWine'), app.area[wineIndex].classList.add('wine')) : app.area[wineIndex].classList.add('wine')



        // wineMoveCounter >= 20 ? (app.area[wineIndex].classList.remove('beerAndWine'), app.area[wineIndex].classList.remove('wine'), app.finishWine()) : null

        liquorMoveCounter >= 20 ? (app.area[liquorIndex].classList.remove('bwl'), app.area[liquorIndex].classList.remove('bl'), app.area[liquorIndex].classList.remove('wl'), app.area[liquorIndex].classList.remove('liquor'), app.finishLiquor()) : null
    }

    app.moveLiquorInterval = () => stopLiquorInterval = setInterval(app.moveLiquor, 250 - (2 * app.level))
    app.finishLiquor = () => clearInterval(stopLiquorInterval)
    app.moveLiquorInterval();

}



//Regular Random Wine Function
app.randomWine = () => {
    // console.log('randomwine')
    // let control;
    // app.level >= 5 ? control = 5 : control = app.level
    let wineMoveCounter = 0

    let wineIndex = Math.floor(Math.random() * app.area.length)
    // console.log(wineIndex)
    app.area[wineIndex].classList.contains('bl')
        ? (app.area[wineIndex].classList.add('bwl'), app.area[wineIndex].classList.add('wine'))
        : app.area[wineIndex].classList.contains('liquor')
            ? (app.area[wineIndex].classList.add('wl'), app.area[wineIndex].classList.add('wine'))
            : app.area[wineIndex].classList.contains('beer')
                ? (app.area[wineIndex].classList.add('bw'), app.area[wineIndex].classList.add('wine'))
                : app.area[wineIndex].classList.add('wine')

    // app.area[wineIndex].classList.contains('beer') ? (app.area[wineIndex].classList.add('bw'), app.area[wineIndex].classList.add('wine')) : app.area[wineIndex].classList.add('wine')

    app.moveWine = () => {
        wineMoveCounter++
        // app.area[wineIndex].classList.remove('bw')
        // app.area[wineIndex].classList.remove('wine')
        app.area[wineIndex].classList.remove('bwl')
        app.area[wineIndex].classList.remove('wl')
        app.area[wineIndex].classList.remove('bw')
        app.area[wineIndex].classList.remove('wine')


        wineIndex % 10 != 9 ? wineIndex++ : wineIndex -= 9
        // app.area[wineIndex].classList.contains('beer') ? (app.area[wineIndex].classList.add('bw'), app.area[wineIndex].classList.add('wine')) : app.area[wineIndex].classList.add('wine')
        app.area[wineIndex].classList.contains('bl')
            ? (app.area[wineIndex].classList.add('bwl'), app.area[wineIndex].classList.add('wine'))
            : app.area[wineIndex].classList.contains('liquor')
                ? (app.area[wineIndex].classList.add('wl'), app.area[wineIndex].classList.add('wine'))
                : app.area[wineIndex].classList.contains('beer')
                    ? (app.area[wineIndex].classList.add('bw'), app.area[wineIndex].classList.add('wine'))
                    : app.area[wineIndex].classList.add('wine')

        wineMoveCounter >= 10 ? (app.area[wineIndex].classList.remove('bwl'), app.area[wineIndex].classList.remove('wl'), app.area[wineIndex].classList.remove('bw'), app.area[wineIndex].classList.remove('wine'), app.finishWine()) : null
    }
    app.moveWineInterval = () => stopWineInterval = setInterval(app.moveWine, 495 - (2 * app.level))
    app.finishWine = () => clearInterval(stopWineInterval)
    app.moveWineInterval();
}

//Generate a 2 random wine at a time
// app.randomWine = () => {
//     console.log('randomwine')
//     // let control;
//     // app.level >= 5 ? control = 5 : control = app.level
//     let randomWineArray = []
//     let wineMoveCounter = [0, 0]

//     let randomWineNum = Math.floor(Math.random() * app.area.length)
//     let randomWineNum2
//     do {
//         randomWineNum2 = Math.floor(Math.random() * app.area.length)
//     } while (randomWineNum == randomWineNum2)
//     randomWineArray.push(randomWineNum, randomWineNum2)

//     randomWineArray.map(x => app.area[x].classList.contains('beer') ? (app.area[x].classList.add('beerAndWine'), app.area[x].classList.add('wine')) : app.area[x].classList.add('wine'))

// app.area[randomWineNum].classList.contains('beer') ? (app.area[randomWineNum].classList.add('beerAndWine'), app.area[randomWineNum].classList.add('wine')) : app.area[randomWineNum].classList.add('wine')
// app.area[randomWineNum2].classList.contains('beer') ? (app.area[randomWineNum2].classList.add('beerAndWine'), app.area[randomWineNum2].classList.add('wine')) : app.area[randomWineNum2].classList.add('wine')

//Product 2 Wines
//     app.moveWine = () => {

//         randomWineArray.map((x, i) => {
//             let changeNum = randomWineArray[i]

//             wineMoveCounter[i]++
//             app.area[randomWineArray[i]].classList.remove('beerAndWine')
//             console.log(wineMoveCounter)


//             app.area[randomWineArray[i]].classList.remove('wine')

//             randomWineArray[i] % 10 != 9 ? randomWineArray[i]++ : randomWineArray[i] -= 9

//             app.area[randomWineArray[i]].classList.contains('beer') ? (app.area[randomWineArray[i]].classList.add('beerAndWine'), app.area[randomWineArray[i]].classList.add('wine')) : app.area[randomWineArray[i]].classList.add('wine')


//             wineMoveCounter[i] >= 10 ? (app.area[randomWineArray[i]].classList.remove('beerAndWine'), app.area[randomWineArray[i]].classList.remove('wine'), app.finishWine(), console.log("I DID IT)")) : null
//         })
//     }

//     // app.moveWine = () => {
//     //     wineMoveCounter++
//     //     app.area[randomWineNum].classList.remove('beerAndWine')
//     //     app.area[randomWineNum].classList.remove('wine')
//     //     randomWineNum % 10 != 9 ? randomWineNum++ : randomWineNum -= 9
//     //     app.area[randomWineNum].classList.contains('beer') ? (app.area[randomWineNum].classList.add('beerAndWine'), app.area[randomWineNum].classList.add('wine')) : app.area[randomWineNum].classList.add('wine')
//     //     wineMoveCounter >= 10 ? (loseWine = 0, app.area[randomWineNum].classList.remove('beerAndWine'), app.area[randomWineNum].classList.remove('wine'), app.finishWine()) : null
//     // }
//     app.moveWineInterval = () => stopWineInterval = setInterval(app.moveWine, 500 - (2 * app.level))
//     app.finishWine = () => clearInterval(stopWineInterval)
//     app.moveWineInterval();
// }

//need function for producing random liquor and unifying all 3 alcohols into a single function

//Set Intervals for getting Wine and Beer
app.wine = () => endWine = setInterval(app.randomWine, 5000 - 25 * app.level)
app.beer = () => endBeer = setInterval(app.randomBeer, 600 - 2.5 * app.level)
app.liquor = () => endLiquor = setInterval(app.randomLiquor, 7500 - 35 * app.level)

app.clearBeer = () => clearInterval(endBeer)
app.clearWine = () => clearInterval(endWine)
app.clearLiquor = () => clearInterval(endLiquor)

//Control the Sobriety Bar
app.moveSoberBar = () => {
    app.soberLevel.style.width = `${app.sober}%`
}

// Add events for clicking wine/hard liquor, and tracking scores
app.makeClick = () => {
    app.area.map(x => x.addEventListener("click", (e) => {
        if (e.target.classList.contains('beer') && e.target.classList.contains('wine') && e.target.classList.contains('liquor')) {
            console.log('THREE AT ONCE, PARTY TIME')
            app.clearBeer()
            app.finishWine()
            app.clearWine()
            app.finishLiquor()
            app.clearLiquor()
            e.target.classList.remove('beer')
            e.target.classList.remove('wine')
            e.target.classList.remove('liquor')
            e.target.classList.remove('bl')
            e.target.classList.remove('bw')
            e.target.classList.remove('bwl')
            app.sober = 0
            app.currentScore += 100
            app.currentScoreDisplay.textContent = app.currentScore
            console.log(app.sober)
            app.beer()
            app.wine()
            app.liquor()
        } else if (e.target.classList.contains('liquor') && e.target.classList.contains('wine')) {
            console.log('liquor and wine is classy')
            app.finishLiquor()
            app.clearLiquor()
            app.finishWine()
            app.clearWine()
            e.target.classList.remove('beer')
            e.target.classList.remove('wine')
            e.target.classList.remove('bw')
            app.sober <= 40 ? app.sober = 0 : app.sober -= 40;
            app.moveSoberBar()
            app.currentScore += 40;
            app.currentScoreDisplay.textContent = app.currentScore
            console.log(app.sober)
            app.liquor()
            app.wine() 
        } else if (e.target.classList.contains('liquor') && e.target.classList.contains('beer')) {
            console.log('beer after liquor, something somethign sicket')
            app.finishLiquor()
            app.clearLiquor()
            app.clearBeer()
            e.target.classList.remove('beer')
            e.target.classList.remove('liquor')
            e.target.classList.remove('bl')
            app.sober <= 30 ? app.sober = 0 : app.sober -= 30;
            app.moveSoberBar()
            app.currentScore += 30;
            app.currentScoreDisplay.textContent = app.currentScore
            console.log(app.sober)
            app.liquor()
            app.beer() 
        } else if (e.target.classList.contains('beer') && e.target.classList.contains('wine')) {
            console.log('beer and wine, you swine!')
            app.clearBeer()
            app.finishWine()
            app.clearWine()
            e.target.classList.remove('beer')
            e.target.classList.remove('wine')
            e.target.classList.remove('bw')
            app.sober <= 20 ? app.sober = 0 : app.sober -= 20;
            app.moveSoberBar()
            app.currentScore += 20;
            app.currentScoreDisplay.textContent = app.currentScore
            console.log(app.sober)
            app.beer()
            app.wine()
        } else if (e.target.classList.contains('beer')) {
            console.log("clicked beer")
            app.clearBeer()
            e.target.classList.remove('beer')
            app.sober <= 3 ? app.sober = 0 : app.sober -= 4;
            app.moveSoberBar()
            app.currentScore += 3
            app.currentScoreDisplay.textContent = app.currentScore
            // app.currentScore > app.highScore ? app.highScoreDisplay.textContent = app.currentScore : null
            console.log(app.sober)
            app.level++
            // console.log(app.level)
            app.beer()
        } else if (e.target.classList.contains('liquor')) {
            console.log("clicked liquor")
            app.clearLiquor()
            app.finishLiquor()
            e.target.classList.remove('liquor')
            app.sober <= 14 ? app.sober = 0 : app.sober -= 14;
            app.moveSoberBar()
            app.currentScore += 14
            app.currentScoreDisplay.textContent = app.currentScore
            // app.currentScore > app.highScore ? app.highScoreDisplay.textContent = app.currentScore : null
            console.log(app.sober)
            app.level++
            // console.log(app.level)
            app.liquor()
        } else if (e.target.classList.contains('wine')) {
            console.log("clicked wine")
            app.clearWine()
            app.finishWine()
            e.target.classList.remove('wine')
            app.sober <= 7 ? app.sober = 0 : app.sober -= 8;
            app.moveSoberBar()
            app.currentScore += 7
            app.currentScoreDisplay.textContent = app.currentScore
            // app.currentScore > app.highScore ? app.highScoreDisplay.textContent = app.currentScore : null
            console.log(app.sober)
            app.level++
            // console.log(app.level)
            app.wine()
        } else if (!e.target.classList.contains('beer')) {
            console.log('you suck')
            app.currentScore -= 4 
            app.currentScoreDisplay.textContent = app.currentScore
            // app.currentScore > app.highScore ? app.highScoreDisplay.textContent = app.currentScore : null
            app.sober += 4
            console.log(app.sober)
        }
    }))
}

//Increase Sobriety and check to see if game is over
app.soberCheck = (totalChecks = 0) => {
    const addSober = () => {
        return new Promise((resolve) => {
            //redo
            app.sober += 0.5;
            app.moveSoberBar()
            setTimeout(resolve, (500 - (totalChecks * 0.0875) * 25))
        })
    }
    const finalCheck = async () => {
        await addSober();
        app.sober >= 100
            ? (app.clearBeer(), app.clearWine(), app.clearLiquor(), app.clearQuotes(), console.log("Game Over"), app.mainBoard.style.display = "none", app.gameOver.style.display = "flex")
            : (totalChecks++, app.soberCheck(totalChecks))
    }
    finalCheck()
}




// app.init = () => {
//     app.makeGrid()
//     app.makeClick()
//     app.beer()
//     app.wine()
//     app.soberCheck()
// }

// app.init()