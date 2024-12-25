export const getUser = () => {
    // if there is no token, return null
    const token = localStorage.getItem('token');
    if (!token) return null;

    // Decode token payload and return user data
    const user = JSON.parse(atob(token.split('.')[1]));
    return user;
};

export type User = {
    userId: number;
    sub: string;
    iat: number;
    exp: number;
};


