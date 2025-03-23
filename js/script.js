const fetchJoke = document.getElementById('fetchJoke')
const jokeList = document.getElementById('jokeList')
//localStorage.clear()

if(localStorage.length > 0){
    for (let i = 0; i < localStorage.length; i++) {
        let joke = {
            id: localStorage.key(i),
            value: localStorage.getItem(localStorage.key(i))
        }
        addJoke(joke)
    }
    
}

fetchJoke.addEventListener('click', () => {
    fetch('https://api.chucknorris.io/jokes/random').then((response) => {
        if(!response.ok){
            console.error('Ha ocurrido un error con la petición de chiste')
        }
        return response.json()
    }).then((data) =>{
        localStorage.setItem(data.id, data.value)
        addJoke(data)
    }).catch((err) =>{
        console.error(err)
    })
})

function addJoke(joke) {
    jokeList.innerHTML += `
        <li id="${joke.id}">
            <p>${joke.value}</p>
            <button class="delete" onclick="removeJoke('${joke.id}')">Eliminar</button>
        </li>
    `
}

function removeJoke(listItemID) {
    jokeList.removeChild(document.getElementById(listItemID))
    localStorage.removeItem(listItemID)
}