

const moment = require('moment')

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  filters.getNextSixMonths = function (startMonth) {
    const COUNT = 6
    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const NAME_TOTAL = MONTH_NAMES.length

    startMonth = parseInt(startMonth) < 12 ? parseInt(startMonth) : 0

    let nextSixMonths = []
    for (let i = 0 + startMonth; i < COUNT + startMonth; i++) {
      const ROW = Math.floor(i / NAME_TOTAL)
      const ROW_COUNT = ROW * NAME_TOTAL
      const STEP = i - ROW_COUNT

      nextSixMonths.push({
        value: `${MONTH_NAMES[STEP].toLowerCase()}`,
        text: MONTH_NAMES[STEP]
      })
    }

    return nextSixMonths
  }

  // Manipulate dates using moment.js
  filters.moment = function (date, method, amount, unit) {
    let newDate = new Date()

    if (typeof date !== 'undefined') {
      const rightNow = moment(new Date(date))

      if (typeof method !== 'undefined' &&
        typeof amount !== 'undefined' &&
        typeof unit !== 'undefined') {

        const configObj = {
          method: method === 'add' ? 'add' : 'subtract',
          amount: parseInt(amount),
          unit: unit === 'days' ||
                unit === 'weeks' ||
                unit === 'months' ||
                unit === 'years' ? unit : ''
        }

        if (typeof configObj !== 'undefined' && configObj.unit.length) {
          newDate = rightNow[configObj.method](configObj.amount, configObj.unit)
        }
      }

      newDate = rightNow.format('DD MM YYYY')
    } else {
      const month = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth()
      const date = newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()
      newDate = `${date} ${month} ${newDate.getFullYear()}`
    }

    return newDate
  }

  //Separate input from presentation - 01 to January use | toMonth and  1 to $1 use | toMoney
  filters.toMonth = function(x){ 
    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];   
    if (x > 0){ return months[x - 1]; // returns date as per month      
    } else {
            return x ;      
    }}     
    filters.toMoney = function(x){  return("£" + x );
    //TO ADD - case to handle nothing being there 
    }

    //Format date to date format like 01/02/2024
    filters.formatDate = function (date) {
      return moment(date).format("DD/MM/YYYY")
    }
  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
