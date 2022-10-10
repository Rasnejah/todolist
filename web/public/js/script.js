


//const elementUl = document.querySelector("#tasks ul")
const btnAdd = document.querySelector("#form button")
function reLoad(){    
    window.addEventListener('load', onload)
}

// carrega todas as tarefas
function onload(){   
   fetch('http://localhost:3002/todo')
   .then( data => data.json() )
   .then( tasks => {
        
        if(tasks.length === 0){
            document.querySelector('#box-cards').innerHTML = '<h4>Não há tarefas para mostrar</h4>'
            return
        }

        tasks.forEach(task => {            
            biuldCard(task)  
        });
         
   })
}



// constroi os cards de tarefas
function biuldCard(task){
    
    const title = document.createElement('h4')
    title.innerHTML = `${task.title}`
    
    const cardBody = document.createElement('div')
    cardBody.id = 'card-body'
    cardBody.appendChild(title)
    
    const description = document.createElement('p')
    description.innerHTML = task.description
    
    const cardContent = document.createElement('div')
    cardContent.id = 'card-content'
    cardContent.appendChild(description)
    
    const status = document.createElement('span')
    status.innerHTML = `Estatus: ${task.active?"Active":"Done"} `
    
    const btnDone = document.createElement('button')
    btnDone.classList.add('done')
    btnDone.innerHTML = `${task.active?"Done":"Active"} `
    

    btnDone.addEventListener('click',()=>{
       
        fetch(`http://localhost:3002/todo/${task._id}`,
        {
            method: 'PUT',
        }
            )
            .then(function(res){                   
                window.location.reload()  
            }).catch(function(res){ console.log(res) })
            
        
    })

    const btnRemove = document.createElement('button')
    btnRemove.classList.add('remove')
    btnRemove.innerHTML = 'Remove'
    
    btnRemove.addEventListener('click',()=>{

        fetch(`http://localhost:3002/todo/${task._id}`,
        {
            method: 'DELETE',
            Headers:{
                "Access-Control-Allow-Origin":"*",                
                "Access-Control-Allow-Methos": "DELETE"
            }
        })
            .then(function(res){                 
                window.location.reload() 
            }).catch(function(err){ console.log(err.message) })
        reLoad()
        
    })
    
    const clear = document.createElement('div')
    clear.classList.add('clear')
    
    const cardFooter = document.createElement('div')
    cardFooter.id = 'card-footer'
    cardFooter.appendChild(status)
    cardFooter.appendChild(btnRemove)
    cardFooter.appendChild(btnDone)
    cardFooter.appendChild(clear)

    

    const card = document.createElement('div')
    card.id = 'card'
    card.appendChild(cardBody)
    card.appendChild(cardContent) 
    card.appendChild(cardFooter) 
    
    

    const boxCards = document.querySelector('#box-cards')
    boxCards.appendChild(card)     
}

//cria as tarefas
function addTask(){
    const title = document.querySelector("#form input#title").value
    const description = document.querySelector("#form input#description").value
    
    if(!title && !description){
        document.querySelector('#message-error').innerHTML = '<span>Preencher titulo e descrição</span>'       
        return
    }
    
    if(!title){        
        document.querySelector('#message-error').innerHTML = '<span>Preencher titulo</span>'        
        return
    }
    if(!description){        
        document.querySelector('#message-error').innerHTML = '<span>Preencher descrição</span>'       
        return
    }
    
    fetch('http://localhost:3002/todo', 
        {
            method: 'POST',
                        
            body: JSON.stringify({title, description})
        })
        .then( res => console.log( res))
        .then(res =>{
            console.log(res)
            window.location.reload() 
        })
       
}



reLoad()
btnAdd.addEventListener('click', addTask)







