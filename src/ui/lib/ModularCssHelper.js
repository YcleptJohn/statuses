export default class ModularCssHelper {
  constructor(styleObject) {
    this.styleObject = styleObject
  }

  // Named for amusement when imported as 'c' and calling c.ss(), not for affiliation with Schutzstaffel
  ss(classString) {
    let converted = ''
    try {
      converted = classString.split(' ').map(x => this.styleObject[x])
    } catch (e) {
      console.warn('Failed to convert CSS to modular classes')
    }
	  return converted.join(' ')
  }
}