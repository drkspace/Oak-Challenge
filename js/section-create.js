

let doStorage = null

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
    let cell = document.createElement(cellType)
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
            nameCell.setAttribute("data-bs-trigger", "hover click")
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
                let prevChecked = JSON.parse(localStorage.getItem(this.name+"-cought-"+i))
                
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

export class Section{
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
        // table.classList.add("table-hover")


        let header = document.createElement("thead")
        let headerRow = document.createElement("tr")
        createChildCell(headerRow, "Name", "th").setAttribute("scope","col")
        createChildCell(headerRow, "Level", "th").setAttribute("scope","col")
        createChildCell(headerRow, "Route", "th").setAttribute("scope","col")
        createChildCell(headerRow, "Evolve Level", "th").setAttribute("scope","col")
        createChildCell(headerRow, "# to catch", "th").setAttribute("scope","col")
        createChildCell(headerRow, "Cought", "th").setAttribute("scope","col")
        header.appendChild(headerRow)
        table.appendChild(header)

        let rcNeeded = 0
        let monsNeeded = 0
        let tbody = document.createElement("tbody")
        this.mons.forEach(m => {
            tbody.appendChild(m.toRow())
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
        resRow.classList.add("fw-bold")
        createChildCell(resRow, "Totals")
        createChildCell(resRow, "—")
        createChildCell(resRow, "—")
        createChildCell(resRow, rcNeeded)
        createChildCell(resRow, monsNeeded)
        
        // resRow.classList.add("table-secondary")
        tbody.appendChild(resRow)
        table.appendChild(tbody)

        
        let curCount = 0
        Array.from(table.getElementsByTagName("input")).forEach(ele =>{
            ele.addEventListener('change', (event) => {
                if (event.currentTarget.checked) {
                    countCell.innerHTML = Number(countCell.innerHTML)+1
                    localStorage.setItem(event.currentTarget.id, "true")
                } else {
                    countCell.innerHTML = Number(countCell.innerHTML)-1
                    localStorage.setItem(event.currentTarget.id, "false")
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





