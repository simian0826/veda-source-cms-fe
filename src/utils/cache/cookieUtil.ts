// export function getCookie(name: string): string | null {
//   const cookies = document.cookie.split("; ");

//   for (let i = 0; i < cookies.length; i++) {
//     const cookiePair = cookies[i].split("=");

//     // Decode the cookie name and compare it with the given name
//     const decodedName = decodeURIComponent(cookiePair[0].trim());
//     if (decodedName === name) {
//       // Decode the cookie value and return it
//       return decodeURIComponent(cookiePair[1]);
//     }
//   }

//   // If no cookie with the given name is found, return null
//   return null;
// }
// export function setCookie(name: string, value: string, days: number): void {
//   let expires = "";

//   if (days) {
//     const date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     expires = "; expires=" + date.toUTCString();
//   }

//   const path = "; ";
//   const domain = "; "; // 替换为你的域名

//   document.cookie = name + "=" + (value || "") + expires + path + domain;
// }

// export function clearCookie(name?: string): void {
//   if (name) {
//     setCookie(name, "", -1);
//   } else {
//     const cookies = document.cookie.split("; ");

//     for (let i = 0; i < cookies.length; i++) {
//       const cookieName = cookies[i].split("=")[0];
//       setCookie(cookieName, "", -1);
//     }
//   }
// }
