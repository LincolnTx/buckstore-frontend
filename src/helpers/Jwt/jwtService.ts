import jwtDecode from 'jwt-decode';

interface JwtTokenData {
    email: string;
    Role: string;
    id: string;
    iss: string;
    exp: string;
}
function tokenDecode(token:string): JwtTokenData {
    return jwtDecode<JwtTokenData>(token);
}

function getTokenProperty(property: keyof JwtTokenData, token: string) : string{
    const decode = tokenDecode(token);

    return decode[property];
}

 export { tokenDecode, getTokenProperty }