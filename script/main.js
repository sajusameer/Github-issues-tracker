const container = document.getElementById("issuesContainer")

let allIssues = []

// load cards
async function loadIssues() {
    showSpinner()
    // showSpinner()

    
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    )
    const data = await res.json()
    allIssues = data.data
    displayIssues(allIssues)

    countUpdate()
    // show total issues
    document.getElementById("totalCount").innerText = allIssues.length
    hideSpinner()
    // all btn active
    setActiveTab(document.getElementById("allBtn"))
    // hide count
    document.getElementById("openCount").classList.add("hidden")
    document.getElementById("closedCount").classList.add("hidden")
}

// display cards


function displayIssues(issues){
    container.innerHTML = ""
    issues.forEach( issue => {
const borderColor = issue.status === "open" ? "border-green-500" : "border-purple-500"
const status = issue.status.toLowerCase()
const circleColor = status === "open"? "text-green-500" : "text-purple-500"
const circleIcons =  { open: "fa-solid fa-circle-check",
    closed: "fa-solid fa-circle-xmark"

}


const priority = issue.priority.toLowerCase()

const priorityColor = priority === "high" ? "bg-red-100 text-red-500" : priority === "medium" ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-500"


// const priority = issue.priority.toUpperCase()

// const priorityColor = priority === "HIGH" ? "bg-red-100 text-red-500" : priority === "MEDIUM" ? "bg-yellow-100 text-yellow-600" : "bg-gray-100 text-gray-500"

const labelColors = { bug: "bg-red-100 text-red-500",
"help wanted": "bg-yellow-100 text-yellow-600",
enhancement: "bg-green-100 text-green-600"
}

const labelIcons = {bug: "fa-solid fa-bug",
"help wanted": "fa-solid fa-life-ring",
enhancement: "fa-solid fa-burst",

}

const div = document.createElement("div")
div.innerHTML = `
   <div onclick="loadIssue(${issue.id},event)"
class="bg-white rounded-xl shadow p-5 border-t-4 ${borderColor} cursor-pointer hover:shadow-lg transition h-full flex flex-col justify-between">

<div class="flex justify-between mb-2">
<div>
<i class="${circleIcons[status]} ${circleColor}"></i>
</div>
<div><span class="text-xs px-3 py-1 ${priorityColor} rounded-full">
${issue.priority}
</span></div>

</div>

<h2 class="font-semibold text-lg mb-2">
${issue.title}
</h2>

<p class="text-gray-500 text-sm mb-3">
${issue.description}
</p>

<div class="flex gap-2 text-xs mb-3">

${issue.labels.map(label => `
<span class="${labelColors[label.toLowerCase()] || 'bg-blue-100 text-blue-500'} px-2 py-1 rounded flex items-center gap-1">

<i class="${labelIcons[label.toLowerCase()] || 'fa-solid fa-circle-question'}"></i>

${label}

</span>
`).join("")}

</div>

<p class="text-xs text-gray-500">
#${issue.id} by ${issue.author}
</p>

<p class="text-xs text-gray-400">
${issue.createdAt}
</p>

</div>

`
container.appendChild(div)
    })
}

// count update


function countUpdate(){

const open = allIssues.filter(i => i.status === "open").length
const closed = allIssues.filter(i => i.status === "closed").length

document.getElementById("openCount").innerText = open
document.getElementById("closedCount").innerText = closed

}



function filterBtn(status,btn){
showSpinner()

setActiveTab(btn)

if(status === "all"){

displayIssues(allIssues)

document.getElementById("totalCount").innerText = allIssues.length

document.getElementById("openCount").classList.add("hidden")
document.getElementById("closedCount").classList.add("hidden")

}

if(status === "open"){

const filtered = allIssues.filter(issue => issue.status === "open")

displayIssues(filtered)

document.getElementById("totalCount").innerText = filtered.length

document.getElementById("openCount").classList.remove("hidden")
document.getElementById("closedCount").classList.add("hidden")

}

if(status === "closed"){

const filtered = allIssues.filter(issue => issue.status === "closed")

displayIssues(filtered)

document.getElementById("totalCount").innerText = filtered.length

document.getElementById("closedCount").classList.remove("hidden")
document.getElementById("openCount").classList.add("hidden")

}
hideSpinner()


}    


function setActiveTab(btn){

const tabs = document.querySelectorAll(".tabBtn")

tabs.forEach(tab => {

tab.classList.remove("bg-[#4A00FF]","text-white")

tab.classList.add("border")

})

btn.classList.add("bg-[#4A00FF]","text-white")

btn.classList.remove("border")

}


async function loadIssue(id,event){

const rect = event.currentTarget.getBoundingClientRect()

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
)

const data = await res.json()

const issue = data.data

document.getElementById("modalTitle").innerText = issue.title
document.getElementById("modalLevel").innerText = issue.labels
document.getElementById("statusUpdate").innerText = issue.status
document.getElementById("modalDate").innerText = issue.createdAt
document.getElementById("modalDesc").innerText = issue.description
document.getElementById("modalAuthor").innerText = issue.author
document.getElementById("modalAssignee").innerText = issue.assignee
document.getElementById("modalPriority").innerText = issue.priority


 const modal = document.getElementById("issueModal")

// modal.style.top = rect.top + window.scrollY + "px"
// modal.style.left = rect.left + "px"

modal.classList.remove("hidden")

}


async function searchCards(){

const text =
document.getElementById("searchInput").value

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
)

const data = await res.json()

displayIssues(data.data)

document.getElementById("totalCount").innerText = data.data.length

}

function showSpinner(){

document.getElementById("spinner").classList.remove("hidden")

}

function hideSpinner(){

document.getElementById("spinner").classList.add("hidden")

}



function closeModal(){

document.getElementById("issueModal").classList.add("hidden")

}

loadIssues()


