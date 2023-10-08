const prod = {
    url: {
        API_URL: "https://projects.developerjones.dk/space-laravel",
        APP_URL: "https://projects.developerjones.dk/space-next",
    }
}
const dev = {
    url: {
        API_URL: "http://localhost:8000",
        APP_URL: "http://localhost:3000"
    }
}
export const env = process.env.NODE_ENV === 'development' ? dev : prod

export const paths = {
    API_ROUTE: "/api/"
}