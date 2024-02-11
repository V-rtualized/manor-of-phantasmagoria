import { ComparisonOperatorExpression, ReferenceExpression } from 'kysely'

export type GameState = {
  id: number;
  phase: string;
  phase_start: number;
}

export type Player = {
  discord_id: string;
  status: string;
  start_room: string;
  current_location: string;
  inventory: string[];
  character_id: number;
  action: string;
}

export type Location = {
  name: string;
  accessible_locations: string[];
  is_private: boolean;
  requires_key: boolean;
}

export type Character = {
  id: number;
  name: string;
  team: string;
  position: string;
  color: string;
}

export type Database = {
  GameState: GameState;
  Players: Player;
  Locations: Location;
  Characters: Character;
}

export type Tables = 'GameState' | 'Players' | 'Locations' | 'Characters'

export type Criteria = { lhs: ReferenceExpression<Database, Tables>, op: ComparisonOperatorExpression, rhs: any }