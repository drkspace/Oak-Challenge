

if (typeof(Storage) !== undefined)
{
    doStorage = true
}
else
{
    console.warn("No local storage available for the browser. Results will not save")
    doStorage = false
}

function createChildCell(parent, inner, cellType="td", customId=null){
    cell = document.createElement(cellType)
    if(inner instanceof HTMLElement)
    {
        cell.appendChild(inner)
    }
    else if(inner instanceof Array )
    {
        inner.forEach(ele => {
            cell.appendChild(ele)
        });
    }
    else{
        cell.innerText = inner
    }

    if (customId != null)
    {
        cell.setAttribute("id", customId)
    }
    
    parent.appendChild(cell)
    return cell
}

class Mon{

    constructor(name, level, route, evolve_lvl, numToCatch, notes){
        this.name = name
        if (level == null)
        {
            this.level = "—"
        }
        else{
        this.level = level
        }
        this.route = route
        if (evolve_lvl != null)
        {
        this.evolve_lvl = String(evolve_lvl).split(',').map(Number)
        }
        else
        {
            this.evolve_lvl = ["—"]
        }
        this.numToCatch = numToCatch

        if (notes instanceof Array)
        {
            this.notes = notes
        }
        else if (notes != null && notes!==undefined)
        {
            this.notes = [notes]
        }
        else
        {
            this.notes = null
        }

    }

    toRow(){
        let row = document.createElement("tr")

        let nameCell = createChildCell(row, this.name)
        if(this.notes != null)
        {
            nameCell.innerText = this.name

            nameCell.setAttribute("data-bs-container", "body")
            nameCell.setAttribute("data-bs-toggle", "popover")
            nameCell.setAttribute("data-bs-trigger", "hover")
            nameCell.setAttribute("data-bs-html", "true")
            nameCell.setAttribute("data-bs-title", "Notes")
            let notesHTML = "<ul>"
            this.notes.forEach(n => {
                notesHTML += "<li>" + n + "</li>"
            });
            notesHTML += "</ul>"
            nameCell.setAttribute("data-bs-content", notesHTML)
            nameCell.classList.add("text-decoration-underline")
        }
        createChildCell(row, this.level)
        createChildCell(row, this.route)
        createChildCell(row, this.evolve_lvl.join(","))
        createChildCell(row, this.numToCatch)
        let checks = []
        
        
        for (let i = 0; i < this.numToCatch; i++) {
            checks.push(document.createElement("input"))
            checks[i].setAttribute("type", "checkbox")
            checks[i].setAttribute("id", this.name+"-cought-"+i)
            if(doStorage)
            {
                let prevChecked = localStorage.getItem(this.name+"-cought-"+i)
                
                // Yes, this should be done in 1 line, but just in case I'll count the amount of captures here
                if (prevChecked == false || prevChecked==null)
                {
                    checks[i].checked = false
                }
                else
                {
                    checks[i].checked = true
                }
            }
        }
        if(this.numToCatch > 1){
        checks.splice(1, 0, document.createElement("p"))
        checks[1].setAttribute("class", "vr")
        }
        let checksCell = createChildCell(row, checks)
        if(this.numToCatch > 1){
            checksCell.setAttribute("class", "hstack gap-2")
        }


        return row;
    }
}

class Section{
    constructor(name){
        this.name = name
        this.mons = []
        this.notes = []
    }

    addMon(name, level, route, evolve_lvl, numToCatch, notes){
        this.mons.push(new Mon(name, level, route, evolve_lvl, numToCatch, notes))
    }

    toTable(){
        let table = document.createElement("table")
        table.classList.add("table")
        table.classList.add("table-striped")
        table.classList.add("table-bordered")
        table.classList.add("px-2")
        table.classList.add("table-hover")


        let header = document.createElement("tr")
        createChildCell(header, "Name", "th")
        createChildCell(header, "Level", "th")
        createChildCell(header, "Route", "th")
        createChildCell(header, "Evolve Level", "th")
        createChildCell(header, "# to catch", "th")
        createChildCell(header, "Cought", "th")
        table.appendChild(header)

        let rcNeeded = 0
        let monsNeeded = 0

        this.mons.forEach(m => {
            table.appendChild(m.toRow())
            if(m.evolve_lvl.length == 1)
            {
                if(!isNaN(m.evolve_lvl[0])){
                    rcNeeded += (m.evolve_lvl[0]-m.level)*(m.numToCatch-1)
                }
            }
            else{
                m.evolve_lvl.forEach(lvl => {
                    rcNeeded += lvl-m.level
                });
                
            }
            monsNeeded += m.numToCatch
        });
        let resRow = document.createElement("tr")
        createChildCell(resRow, "—")
        createChildCell(resRow, "—")
        createChildCell(resRow, "—")
        createChildCell(resRow, rcNeeded)
        createChildCell(resRow, monsNeeded)
        
        // resRow.classList.add("table-secondary")
        table.appendChild(resRow)
        

        
        let curCount = 0
        Array.from(table.getElementsByTagName("input")).forEach(ele =>{
            ele.addEventListener('change', (event) => {
                if (event.currentTarget.checked) {
                    countCell.innerHTML = Number(countCell.innerHTML)+1
                    localStorage.setItem(event.currentTarget.id, true)
                } else {
                    countCell.innerHTML = Number(countCell.innerHTML)-1
                    localStorage.setItem(event.currentTarget.id, false)
                }
              })
              curCount += ele.checked
        })

        let countCell = createChildCell(resRow, curCount,"td", this.name.replace(/\s+/g, '-')+"-count")


        return table;
    }

    add2Div(id){
        let div = document.getElementById(id)
        let tmp = document.createElement("h1")
        tmp.innerHTML = this.name
        div.appendChild(tmp)

        tmp = document.createElement("h2")
        tmp.innerHTML = "Pokemon to Catch"
        div.appendChild(tmp)
        div.appendChild(this.toTable())

        tmp = document.createElement("h2")
        tmp.innerHTML = "Notes"
        div.appendChild(tmp)
        let notes = document.createElement("ul")
        notes.classList.add("list-group")
        notes.classList.add("px-2")
        this.notes.forEach(n => {
            let tmp = document.createElement("li")
            tmp.innerText = n
            tmp.classList.add("list-group-item")
            notes.appendChild(tmp)
        });
        div.appendChild(notes)
    }

    addNote(note)
    {
        this.notes.push(note)
    }
}


sec1 = new Section("Pre Gym 2")
sec1.addMon("Tentacool", 10,110,30,2, "One needs to be male")
sec1.addMon("Plusle", null, 110, null, 1, "One of Plusle, Minun, or Jigglypuff needs to be male")
sec1.addMon("Minun", null, 110, null, 1, "One of Plusle, Minun, or Jigglypuff needs to be male")
sec1.addMon("Electrike", 13, 110, 26, 2)
sec1.addMon("Gulpin", 13, 110, 26, 2)
sec1.addMon("Magikarp", 10, 117, 20, 2)
sec1.addMon("Goldeen", 10, 117 , 33, 2)
sec1.addMon("Oddish", 13, 117, 21, 2)
sec1.addMon("Volbeat", null, 117, null, 1)
sec1.addMon("Illumise", null, 117, null, 1)
sec1.addMon("Torchic", 5, 117, 16, 2)
sec1.addMon("Geodude", 9, "Granite Cave 1F", 25, 2)
sec1.addMon("Zubat", 10, "Granite Cave B1F", 24, 3, ["Catch first to start getting happiness", "You could get a lvl 11 one on B2F, but then you would have to avoid encounters until you come back up"])
sec1.addMon("Makuhita", 11, "Granite Cave B1F", 24, 2)
sec1.addMon("Sableye", null, "Granite Cave B1F", null, 1)
sec1.addMon("Aron", 12, "Granite Cave B2F", "32,42", 3)

sec1.addNote("Grab the bike and rock smash when at mauville")
sec1.addNote("Use the pokemon center in mauville last")
sec1.addNote("Make sure to have teleporter (abra/ralts line) in party when done with section")
sec1.addNote("Total Pokemon obtained should be 66")
sec1.add2Div("sec2")



