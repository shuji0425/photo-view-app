/** Goのdtoと対応 */
export type UserResponse = {
  id: number;
  email: string;
  username: string;
  role: "user" | "admin";
  created_at: string;
  updated_at: string;
};
