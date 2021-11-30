export const BACKEND_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3030' : 'https://buisson-backend.herokuapp.com';
export function asset(path: string) {
    if(path[0] === "/") {
        return BACKEND_URL+path;
    }else{
        return path;
    }
}