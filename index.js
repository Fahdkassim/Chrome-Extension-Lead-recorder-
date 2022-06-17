const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
let myLeads = []


const leadFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadFromLocalStorage){
    myLeads = leadFromLocalStorage;
    render(myLeads)
}



function render(leads){
    let listItems = ""
    for (let i=0; i<leads.length; i++){
        listItems += 
        `
            <li>
                <a href=${leads[i]} target="_blank">${leads[i]}</a>
            </li>
        `
    } 
    ulEl.innerHTML = listItems
        
}
inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""    
    render(myLeads)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
})

tabBtn.addEventListener("click", function(){
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        myLeads.push(tabs[0].url)
        inputEl.value = ""    
        render(myLeads)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        
    })
    
    
    
})

deleteBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
    
})

