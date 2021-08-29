const facts = [
    "This app fig-ures out whether your photo is a fig or not.",
    "Figs cannot speak English, but they would probably just say obcenities if they could.",
    "New Jersey made figs their national fruit in 1965. Fitting.",
    "Contrary to popular belief, figs are actually vegetables.",
    "California grows many varieties of figs, but the two most common are the amber-colored, slightly nutty-flavored Golden and the dark purple, sweet Mission.",
    "Many believe it was figs that were actually the fruit in the Garden of Eden with Adam and Eve, not apples.",
    "All figs possess the same amount of internal seeds. No one has bothered to count them though.",
    "Romania banned the importation of figs into the country from 1993-1998 due to a suspected illness associated with their consumption.",
    "According to a 2013 survey held by students of Charles University of Prague, 34% of Czechs present a strong distaste for figs.",
    "A study held in 1971 found that eating too many figs can increase your chances of developing arthritis by the age of 60 by 43%.",
    "Morocco has the highest consumption per capita of figs in the world. Coincidentally, some consider the country among the worst in the world.",
    "The ingestion of figs on airplanes has been known to increase motion sickness and worsen the effects of jet lag.",
    "In Egypt, there were 13 recorded fig related deaths in 2019.",
    "Figs are known as an omen of disease, decay and destruction in many Polynesian cultures.",
    "The Convolutional Neural Network is the best and most efficient method of fig detection.",
    "The Roman statesman Cato the Elder once persuaded Rome to go on the Third Punic War against Carthage (146 B.C.) over a fig.",
    "Fig Fossils dating back to 16 Million B.C.E. have recently been discovered by archaelogists in New Mexico.",
    "Watermelon > Figs. By Far.",
    "Figs are objectively the worst fruit. All those who disagree are wrong.",
    "Chrysippus of Soli, an Ancient Greek Stoic philosopher, allegedly died of laughter after witnessing a donkey eating figs.",
    "California produces 100% of the nation’s dried figs and 98% of the fresh figs.",
    
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
