import { useQuery } from "react-query";

export const FetchApi = async() => {
    const response = await fetch('http://challenge.radlena.com/api/v1/professionals')

    if (!response.ok) {
        throw new Error('Error recupendando la lista de profesionales')
    }
    return response.json();
}

export const CreateProfessional = () => {
    const query = useQuery('PROFESSIONALS', FetchApi)

    if(query.isLoading) {
        return <div>Cargando Profesionales</div>
    }

    if(query.isError) {
       return <div>Error Cargando Profesionales: {query.error}</div>
    }
    return query.data
}