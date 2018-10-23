import {IAppData} from "./app/IAppData"
import {ITagsData} from "./app/ITagsData"

export async function getAppData(): Promise<IAppData> {
    return await getJsonData("http://localhost:8090/appData.json") as IAppData
}

export async function getTags(): Promise<ITagsData> {
    return await getJsonData("http://localhost:8090/tagsData.json") as ITagsData
}

export function getJsonData(url: string) {
    return new Promise((resolve, reject) => {

        //@todo remove time connection simulation
        setTimeout(() => { // time connection simulation

            const request = new XMLHttpRequest()

            request.open("GET", url, true)

            request.addEventListener("load", function(e) {
                if (this.readyState === 4) {
                    if(this.status === 200) {
                        resolve( JSON.parse(this.responseText))
                    } else {
                        reject(`XMLHttpRequest error on ${url}`)
                    }
                }
            })

            request.send(null)

        }, 1000) // time connection simulation
    })
}