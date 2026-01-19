// Logic to decode base64-encoded JWT tokens using HS256 algorithm
export function jwtDecode(token: string): any {
  const payload = token.split('.')[1];
  const decodedPayload = atob(payload);
  return JSON.parse(decodedPayload);
}
