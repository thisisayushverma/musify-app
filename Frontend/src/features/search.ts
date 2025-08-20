import config from "../config/config"

const searchHandler = async (searchQuery: string) => {
    try {
        const response = await fetch(config.backendUrl + '/search/' + searchQuery, {
            method: "GET"
        })
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

const searchSongsHandler = async (searchString: string) => {
    try {
        const response = await fetch(config.backendUrl + "/search", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                search: searchString
            })
        })
        const result = await response.json();
        console.log(result);

        return result;
    } catch (error) {
        console.log("Error while searching song", error);

    }
}

export {
    searchHandler,
    searchSongsHandler
}