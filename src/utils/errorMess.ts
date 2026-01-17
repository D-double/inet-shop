export function errorMess(error:any, type?: string) {
    const response = error.response?.data;
    let text = '';
    for (const key in response) {
        if (key) {
            if (type == 'login') {
                text += response[key]
            } else {                
                text += response[key][0]
            }
        }
    }
    return text
}