let myLeads = [];
let oldLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.querySelector("#ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.querySelector("#tab-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener ("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify("myleads"));
        render(myLeads);
    })
});

function render(leads) {
    let listItems = "";
    for (i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a 
                target='_blank' href='${leads[i]}'>${leads[i]}
            </a>
        </li>
        `
    }
    
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function() {

    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
});

deleteBtn.addEventListener("dblclick", function() {
    myLeads = [];
    localStorage.clear();
    render(myLeads);
});

