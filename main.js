document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        var deckId
        function docAPI(url, success) {
            fetch(url)
            .then(function(response) {
                return response.json()
            })
            .then(success)
            .catch(function(ex) {
                console.log('parsing failed', ex)
            })
        }
        function shuffleCards() {
            docAPI('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1', function(data) {
                console.log(data)
                deckId = data.deck_id //this gets the deck id to use later
                draw1Card()
            })
        }

        function draw1Card() {
            docAPI('http://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=1', function(data) {
                var div = document.getElementById('cardDeck')
                var img = document.createElement('img')
                img.setAttribute('src', data.cards[0].image)
                div.appendChild(img)
                document.getElementById('cardBox').appendChild(div)
                console.log(data.remaining)
                var i = data.remaining
                if (i === 0) {
                clearInterval(interval);
                }
            })
        }

        document.getElementById('startButton').addEventListener('click', function() {
            shuffleCards();
            interval = setInterval(draw1Card, 2000); //new card flips after 2 seconds
        })

        document.getElementById('stopButton').addEventListener('click', function() {
            clearInterval(interval); //stops the auto flip
            console.log("you clicked the stop button")
        })

        document.getElementById('newGameButton').addEventListener('click', function() {
            shuffleCards();
            console.log("you clicked the newGame button")
        })
    }
}
