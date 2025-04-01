import { UserResponse } from "@/types/dto/user";
import { AuthUser } from "@/types/user";

export const toAuthUser = (user: UserResponse): AuthUser => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
};
