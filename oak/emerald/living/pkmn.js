import { Section } from "/Oak-Challenge/js/section-create.js";

//=============================================================
// ||                        Pre Gym 1                       ||        
//=============================================================
let sec1 = new Section("Pre Gym 1")
sec1.addMon("Ralts", 4, 102, "20,30",3)
sec1.addMon("Lotad", 4, 102, 14, 2)
sec1.addMon("Seedot", 3, 102, 14, 2)
sec1.addMon("Zigzagoon", 4, 103, 20, 6, ["The zigzagoon needs enough attack to 1 shot whismur", "Evolve all but 1 of them"])
sec1.addMon("Wingull", 4, 103, 25, 2)
sec1.addMon("Marill", 5, 104, 18, 2, ["1 needs to be female"])
sec1.addMon("Poochyena", 8, 116, 18, 2, ["One needs to be male if one in Slakoth line is not"])
sec1.addMon("Taillow", 8, 116, 22, 2)
sec1.addMon("Skitty", null, 116, null, 2)
sec1.addMon("Abra", 7, 116, 16, 2)
sec1.addMon("Nincada", 7, 116, 20, 2)
sec1.addMon("Wurmple", 6, "Petalburg Woods", 10, 3, ["Need 1 for Beautifly and 1 for Dustox", "Check PID before moving on", "<a href='https://legofigure11.github.io/tools/wurmple-calc/'>https://legofigure11.github.io/tools/wurmple-calc/</a>", "Will catch Cascoon and Silcoon individually"])
sec1.addMon("Cascoon", null, "Petalburg Woods", null, 1)
sec1.addMon("Silcoon", null, "Petalburg Woods", null, 1)
sec1.addMon("Shroomish", 6, "Petalburg Woods", 23, 2)
sec1.addMon("Slakoth", 6, "Petalburg Woods", "18,36", 3, ["Needs to be male if Poochyena line is not"])
sec1.addMon("Whismur", 8, "Rusturf Tunnel", "20,40", 3)
sec1.addMon("Torchic", 6, "Starter", 36, 1, ["Needs to be female"])

sec1.addNote("Battle lvl 8 Whismur with first Zigzagoon")
sec1.addNote("Remember to battle the trainers in the gym while grinding the first Zigzagoon")

sec1.add2Div("sec1")


//=============================================================
// ||                        Pre Gym 2                       ||        
//=============================================================

let sec2 = new Section("Pre Gym 2")
sec2.addMon("Tentacool", 10, 110, 30, 2, "One needs to be male")
sec2.addMon("Plusle", null, 110, null, 1, "One of Plusle, Minun, or Jigglypuff needs to be male")
sec2.addMon("Minun", null, 110, null, 1, "One of Plusle, Minun, or Jigglypuff needs to be male")
sec2.addMon("Electrike", 13, 110, 26, 2)
sec2.addMon("Gulpin", 13, 110, 26, 2)
sec2.addMon("Magikarp", 10, 117, 20, 2)
sec2.addMon("Goldeen", 10, 117, 33, 2)
sec2.addMon("Oddish", 13, 117, 21, 2)
sec2.addMon("Volbeat", null, 117, null, 1)
sec2.addMon("Illumise", null, 117, null, 1)
sec2.addMon("Torchic", 5, 117, 16, 2)
sec2.addMon("Geodude", 9, "Granite Cave 1F", 25, 2)
sec2.addMon("Zubat", 10, "Granite Cave B1F", 24, 3, ["Catch first to start getting happiness", "You could get a lvl 11 one on B2F, but then you would have to avoid encounters until you come back up"])
sec2.addMon("Makuhita", 11, "Granite Cave B1F", 24, 2)
sec2.addMon("Sableye", null, "Granite Cave B1F", null, 1)
sec2.addMon("Aron", 12, "Granite Cave B2F", "32,42", 3)


sec2.addNote("Skip Brawley. Will be doing Watson next")
sec2.addNote("Grab the bike and rock smash when at mauville")
sec2.addNote("Use the pokemon center in mauville last")
sec2.addNote("Make sure to have teleporter (abra/ralts line) in party when done with section")
sec2.addNote("Total Pokemon obtained should be 66")
sec2.add2Div("sec2")

//=============================================================
// ||                        Pre Gym 3                       ||        
//=============================================================

let sec3 = new Section("Pre Gym 3")
sec3.addMon("Nosepass", null, "Granite Cave", null, 1)
sec3.addMon("Numel", 22, "Jagged Pass", 33, 2)
sec3.addMon("Machop", 22, "Jagged Pass", 28, 2)
sec3.addMon("Spoink", 22, "Jagged Pass", 28, 2)
sec3.addMon("Koffing", 16, "Fiery Path", 35, 2)
sec3.addMon("Grimer", 14, "Fiery Path", 38, 2)
sec3.addMon("Slugma", 15, "Fiery Path", 38, 2)
sec3.addMon("Torkoal", null, "Fiery Path", null, 1)
sec3.addMon("Spinda", null, 113, null, 1)
sec3.addMon("Skarmory", null, 113, null, 1)
sec3.addMon("Swablu", 17, 114, 35, 2)
sec3.addMon("Seviper", null, 114, null, 1)
sec3.addMon("Lombre", null, 114, null, 1)
sec3.addMon("Nuzleaf", null, 114, null, 1)
sec3.addMon("Solrock", null, "Meteor Falls", null, 1, ["Get one holding a sun stone"])
sec3.addMon("Wynaut", 5, "Lavaridge", 15, 1)
sec3.addMon("Delcatty", null, null, null, 1)
sec3.addMon("Bellossom", null, null, null, 1)

sec3.addNote("Get dig on route 114")
sec3.addNote("Grab the moon stone in meteor falls")
sec3.addNote("When hatching Wynaut, get strength in Rustboro Tunnel")
sec3.addNote("Should have 90 pokemon")

sec3.add2Div("sec3")

let sec4 = new Section("Pre Gym 4/5")
sec4.addMon("Anorith (breed)", 5, 117, null, 1, ["Breed with Tentacool"])
sec4.addMon("Sandshrew", 22, "Mirage Tower", 22, 2)
sec4.addMon("Cacnea", 22, "Desert", 32, 2)
sec4.addMon("Baltoy", 21, "Desert", 36, 2)
sec4.addMon("Trapinch", 24, "Mirage Tower", "35,45", 3)
sec4.addMon("Anorith", 15, "Mirage Tower", 40, 1, ["Must be female"])

sec4.addNote("Get fire stone in Fiery Path")
sec4.addNote("Evolve desert pokemon before leaving Mauville")
sec4.addNote("Will use Mauville as TP point")
sec4.addNote("Leave extra slot in party to get fossil")

sec4.add2Div("sec4")


const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))