let baseUrl = ''

if (process.env.NODE_ENV == 'production'){
    baseUrl = '/h5/';
} else {
    baseUrl = '/'
}

export {
    baseUrl
}