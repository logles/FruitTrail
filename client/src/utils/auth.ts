// THIS IS BORROWED FROM MODULE 14 CHALLENGE. HOPING TO USE AS A TEMPLATE

// import { JwtPayload, jwtDecode } from 'jwt-decode';

// class AuthService {
//   getProfile() {
//     // TODO: return the decoded token
//     const token = this.getToken();
//     return token ? jwtDecode<JwtPayload>(token) : null;
//   }

//   loggedIn() {
//     // TODO: return a value that indicates if the user is logged in
//     const token = this.getToken();
//     return !!token;
//   }
  
//   isTokenExpired(token: string) {
//     // TODO: return a value that indicates if the token is expired
//     if (!token) return true;
//     const decoded: JwtPayload = jwtDecode(token);
//     return decoded.exp ? decoded.exp * 1000 < Date.now() : true; 
//   }

//   getToken(): string {
//     // TODO: return the token
//     const loggedUser = localStorage.getItem('id_token') || '';
//     return loggedUser;
//   }

//   login(idToken: string) {
//     // TODO: set the token to localStorage
//     // TODO: redirect to the home page
//     localStorage.setItem('id_token', idToken);
//     window.location.assign('/');
//   }

//   logout() {
//     // TODO: remove the token from localStorage
//     // TODO: redirect to the login page
//     localStorage.removeItem('id_token');
//     window.location.assign('/');
//   }
// }

// export default new AuthService();