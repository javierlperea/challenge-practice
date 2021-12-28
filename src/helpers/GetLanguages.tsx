import { useQuery } from "react-query";

export const FetchApi = async() => {
    const response = await fetch('http://challenge.radlena.com/api/v1/languages/')

    if (!response.ok) {
        throw new Error('Error recupendando la lista de lenguajes')
    }
    return response.json();
}

export const GetLanguages = () => {
    const query = useQuery('LANGUAGES', FetchApi)

    if(query.isLoading) {
        return <div>Cargando Lenguajes</div>
    }

    if(query.isError) {
       return <div>Error Cargando Lenguajes: {query.error}</div>
    }
    return query

}
