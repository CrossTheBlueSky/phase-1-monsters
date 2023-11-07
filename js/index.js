const backButton = document.getElementById("back")
const nextButton = document.getElementById("forward")
let topMon = 0
let totalMons
backButton.addEventListener("click", ()=>{
    previousMonsters()
})

nextButton.addEventListener("click", ()=>{
    nextMonsters()
})

//    monsterList.innerHTML = ""
function initialize(){

    fetch("http://localhost:3000/monsters")
    .then(res=>res.json())
    .then((monsters)=>{
        totalMons = monsters[monsters.length-1].id
        for(let i = topMon; i < topMon+50; i++){

            renderMonster(monsters[i])
        }
    })

    formMaker()

}

function fetchMonsters(){
    
}

function renderMonster(monster){
    const monsterList = document.getElementById("monster-container")
    const newMonster = document.createElement("div")
    newMonster.innerHTML = `
    <h3>${monster.name}</h3>
    <h5>${parseInt(monster.age)} years old</h5>
    <p>${monster.description}</p>
    `
    monsterList.append(newMonster)
}

function formMaker(){
    const container = document.getElementById("create-monster")
    container.innerHTML =`
    <form id="monster-form">
        <input type="text" placeholder="name"></input>
        <input type="text" placeholder="age (in years)"></input>
        <input type="text" placeholder="description"></input>
        <button type="submit">Create My Monster</button>
    </form>
    `
    const monsterForm = document.getElementById("monster-form")

    


    monsterForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        addMonster(e)
        
    })
}

function addMonster(monster){
   const postObj = { name: monster.target[0].value, 
    age: monster.target[1].value, 
    description: monster.target[2].value }
    totalMons++


    fetch("http://localhost:3000/monsters",     {method: "POST",
    headers:
    {
    "Content-Type": "application/json",
    Accept: "application/json"
    },
    body : JSON.stringify(postObj)
    })
    .then(res=>console.log(res))
}

function previousMonsters(){
    if(topMon >= 50){
        const monsterList = document.getElementById("monster-container")
        monsterList.innerHTML = ""
        topMon = topMon -50
        fetch("http://localhost:3000/monsters")
        .then(res=>res.json())
        .then((monsters)=>{
            totalMons = monsters[monsters.length-1].id
            for(let i = topMon; i < topMon+50; i++){
    
                renderMonster(monsters[i])
            }
        })
    }
}

function nextMonsters(){

    if(topMon < totalMons){
        const monsterList = document.getElementById("monster-container")
        monsterList.innerHTML = ""
        
        topMon = topMon +50
        fetch("http://localhost:3000/monsters")
        .then(res=>res.json())
        .then((monsters)=>{
            totalMons = monsters[monsters.length-1].id
            for(let i = topMon; i < topMon+50 && i <= totalMons; i++){
    
                renderMonster(monsters[i])
            }
        })

    }

}

initialize()