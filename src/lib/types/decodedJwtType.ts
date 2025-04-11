interface decodedJwtType {
    phone: string;
    _id: string;
    role: string;
    orgRole: {
        data: [
            {
                organizationId: string;
                role: string;
            }
        ],
        isAdmin: boolean;
    }
    iat: number;
    exp: number
}

export default decodedJwtType 