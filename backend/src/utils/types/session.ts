import User from "@/models/User/User";

export type Session = {
  instance: User;
  sessionStartDate: Date;
};
