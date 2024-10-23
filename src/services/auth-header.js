export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      return { 

        'accept': '*/*',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }