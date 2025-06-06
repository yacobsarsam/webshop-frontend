export default interface User {
  id: number;
  email: string;
  password?: string;
  role: "ADMIN" | "USER";
}
