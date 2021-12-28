import { useQuery } from "react-query";
const baseUrl = 'http://challenge.radlena.com/api/v1/professionals'

export const FetchApi = async() => {
    const response = await fetch(baseUrl)

    if (!response.ok) {
        throw new Error('Error recupendando la lista de profesionales')
    }
    return response.json();
}

export const GetProfessionals = () => {
    const query = useQuery('PROFESSIONALS', FetchApi)

    if(query.isLoading) {
        return <div>Cargando Profesionales</div>
    }

    if(query.isError) {
       return <div>Error Cargando Profesionales: {query.error}</div>
    }
    return query.data
}


