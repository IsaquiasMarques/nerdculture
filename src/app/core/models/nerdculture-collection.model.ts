import { Partner } from "./partner.model";
import { TeamMember } from "./team-members.model";

export interface NerdCultureCollection{
    partners: Partner[],
    members: TeamMember[]
}