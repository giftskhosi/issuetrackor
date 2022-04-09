let btnSubmit = document.getElementById('btnSubmit');
let issueDescInput = document.getElementById('issueDescInput');
let issueSeverityInput = document.getElementById('issueSeverityInput');
let issueAssignedToInput = document.getElementById('issueAssignedToInput');

btnSubmit.addEventListener('click', (e) => {
    if(issueDescInput.value == "" || issueSeverityInput.value == "" || issueAssignedToInput.value == "" ){
        return alert("Please fill in the missing field(s)...");
    }

    let issuesList = localStorage.getItem("issuesList");
    if (issuesList == null){
        issuesListObj = [];
    } else {
        issuesListObj = JSON.parse(issuesList);
    }

    let myObj = {
        description: issueDescInput.value,
        severity: issueSeverityInput.value,
        assignedTo: issueAssignedToInput.value
    }

    issuesListObj.push(myObj);
    localStorage.setItem("issuesList", JSON.stringify(issuesListObj));
    issueDescInput.value = "";
    issueSeverityInput.value = "";
    issueAssignedToInput.value = "";

    showIssues();
})

function showIssues(){
    let issuesList = localStorage.getItem("issuesList");
    if (issuesList == null){
        issuesListObj = [];
    } else {
        issuesListObj = JSON.parse(issuesList);
    }

    let html = "";
    issuesListObj.forEach(function(element, index){
        html += `<div id="issues">
                    <p class="issue-counter">Issue: ${index + 1}</p>
                    <h3 class="issue-title">${element.description}</h3>
                    <h5 class="issue-severity">Severity: ${element.severity}</h5>
                    <p class="issue-assign">Assigned To: ${element.assignedTo}</p>
                    <button id="${index}" onclick="deleteIssue(this.id)" class="issue-btn">Delete Issue</button>
                    <button id="${index}" onclick="editIssue(this.id)" class="issue-btn edit-btn">Edit Issue</button><br><br>
                </div>`
    });

    let issuesElm = document.getElementById("issuesList");
    if(issuesListObj.length != 0){
        issuesElm.innerHTML = html;
    } else {
        issuesElm.innerHTML = "No Issues Yet! Add an issue using the form above";
    }
}

function deleteIssue(index){
    let issuesList = localStorage.getItem("issuesList");
    if (issuesList == null){
        issuesListObj = [];
    } else {
        issuesListObj = JSON.parse(issuesList);
    }

        issuesListObj.splice(index, 1)
        localStorage.setItem("issuesList", JSON.stringify(issuesListObj));
        showIssues();
    
}

function editIssue(index){
    let issuesList = localStorage.getItem("issuesList");

    if(issueDescInput.value !== "" || issueAssignedToInput.value !== ""){
        return alert("Please clear the form before editing a note");
    }

    if (issuesList == null){
        issuesListObj = [];
    } else {
        issuesListObj = JSON.parse(issuesList);
    }

    issuesListObj.findIndex((element, index) => {
        issueDescInput.value = element.description;
        issueSeverityInput.value = element.severity;
        issueAssignedToInput.value = element.assignedTo;
    })

    issuesListObj.splice(index, 1);
    localStorage.setItem("issuesList", JSON.stringify(issuesListObj));
    showIssues();
}