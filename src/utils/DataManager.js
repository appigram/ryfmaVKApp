class DataManager {
  static setItem (item, data) {
    sessionStorage.setItem(item, JSON.stringify(data))
  }

  static getItem (item) {
    return sessionStorage.getItem(item)
  }

  static clear () {
    sessionStorage.clear()
  }
}

export default DataManager
