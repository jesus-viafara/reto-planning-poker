export interface Room {
  id: string;
  name: string;
  state: string;
  adminName: string;
  cardSet: string[];
  voteMode: string;
}
