const container = document.getElementById("issuesContainer")

let allIssues = []


async function loadIssues() {
    showSpinner()
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    )
    const data = await res.json()
    allIssues = data.data
    displayIssues(allIssues)

    updateCounts()
    // show total issues
    document.getElementById(totalCount).innerText = allIssues.length
    hideSpinner()
    // all btn active
    setActiveTab(document.getElementById("allBtb"))
    // hide count
    document.getElementById("openCount").classList.add("hidden")
    document.getElementById("closedCount").classList.add("hidden")
}


async function loadIssues(){
showSpinner()

// https://phi-lab-server.vercel.app/api/v1/lab/issues
const res = await fetch(
"https://phi-lab-server.vercel.app/api/v1/lab/issues"
)

const data = await res.json()

allIssues = data.data

displayIssues(allIssues)

updateCounts()

// show total issues
document.getElementById("totalCount").innerText = allIssues.length

hideSpinner()

setActiveTab(document.getElementById("allBtn"))

// hide counts
document.getElementById("openCount").classList.add("hidden")
document.getElementById("closedCount").classList.add("hidden")
// new


}