let API_URL = "https://fierce-caverns-34006.herokuapp.com";

export function getAPI(){
    return fetch(`${API_URL}/api/products`)
    .then(res => res.json());
}
export function postAPI(data){
    console.log(data, JSON.stringify(data))
    return fetch(`${API_URL}/api/products`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => res );
}
export function deleteAPI(id){
    return fetch(`${API_URL}/api/products/${id}`,
    {
        method: 'DELETE',
        headers: {
        'Content-type': 'application/json'
        }
    })
}
export function putAPI(endpoint, data){
}