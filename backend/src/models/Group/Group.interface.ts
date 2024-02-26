export interface GroupMembersInterface {
  idUser: number;
  idGroup?: number;
  level: number;
}

export interface GroupInterface {
  id?: number;
  name: string;
  createDate: Date;
  isPersonal: boolean;
  description: string | null;
  groupMembers?: Array<GroupMembersInterface>;
}
