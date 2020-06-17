/**
 * @param {Object} req The current request object.
 * @param {Object} res The current response object.
 * @param {func} callback 
 * @summary X-Clacks-Overhead header middleware.
 * @description Adds to a given response body the 'X-Clacks-Overhead' header and one randomly selected 
 *     name from internal list. Commemorates the dead. See: https://xclacksoverhead.org/home/about
 */
const setXClacksOverheadHeader = (req, res, next) => {
    const listOfPeopleToHonor = ["Terry Pratchett", "John Conway", "Holger Czukay", "George Floyd"]
    let randomName = "GNU " + listOfPeopleToHonor[Math.floor(Math.random() * listOfPeopleToHonor.length)]
    res.setHeader("X-Clacks-Overhead", randomName );
    next()
}

module.exports = setXClacksOverheadHeader