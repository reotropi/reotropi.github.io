const FOOTBALL_API_TOKEN = "86793c70865e4093855ce958abead4f4";

export function fetcher (url) {
    return new Promise((resolve, reject) => {

        if ('caches' in window) {
            caches.match(url)
            .then((response) => {
                if(response){
                    if(response.status === 200){
                        return response.json()
                    } else {
                        reject(null);
                    }
                    resolve(response)
                }
            })
            .then((response => {
                document.getElementById('loading').setAttribute('hidden', true);
                if(response){
                    resolve(response)
                }
            }))
        }

        fetch(url, {
            method: "GET",
            headers: {
                "X-Auth-Token": FOOTBALL_API_TOKEN
            }
        })
        .then(response => {
            if(response.status === 200){
                return response.json()
            } else {
                reject(null);
            } 
        })
        .then((response) => {
            console.log(response)
            resolve(response)
        })
        .catch((error) => {
            console.log(error)
            reject(null)
        })
    })
}