import jwt_decode from 'jwt-decode';

const decodeJwt = (token: string) => {
  try {
    if (token) {
      const decoded: { userId: string } = jwt_decode(token);
      return decoded.userId;
    }
  } catch (e) {
    console.log(e);
  }
  return '';
};

export default decodeJwt;
