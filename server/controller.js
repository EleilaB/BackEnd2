const houses = require(`./db.json`)
let globalID = houses.length + 1

module.exports = {
    getHouses: (req, res) => res.status(200).send(houses),
    deleteHouse: (req, res) => {
        let index = houses.findIndex(e => e.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        let {address, price, imageURL} = req.body
        const newHouse = {
            "id": globalID,
            address,
            price,
            imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)
        globalID++
        console.log(`The next house ID will be: ` + globalID)
    },
    updateHouse: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        let index = houses.findIndex(e => e.id === +id)

        if(houses[index].price <= 10000 && type === `minus`){
            houses[index].price = 0
            res.status(200).send(houses)
        }else if(type === `minus`){
            houses[index].price -= 10000
            res.status(200).send(houses)
        }else if(type === `plus`){
            houses[index].price += 10000
            res.status(200).send(houses)
        }else{res.sendStatus(400)}
    }
}