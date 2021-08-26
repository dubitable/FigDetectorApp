const facts = [
    "Figs cannot speak English, but they would probably just say obcenities if they could.",
    "New Jersey made figs their national fruit in 1965. Fitting.",
    "Contrary to popular belief, figs are actually vegetables.",
    "All figs possess the same amount of internal seeds. No one has bothered to count them though.",
    "Figs are directly responsible for the assassination of Archduke Franz Ferdinand."
]

const toObject = (fact, index) => {
    return {
        type: "text",
        content: fact,
        number: index + 1
    }
}

const factObjects = facts.map(toObject);

export default factObjects;