export default class ContentApi {
    static async fetchChanges() {
        return fetch('https://api.github.com/repos/smykes/Mad-Minute-Music/commits')
            .then(response => response.json())
            .catch(error => error)
    }
}