export type Room = {
  name: string,
  to: string[],
  key?: string,
  private?: boolean | false
}

export const Rooms: Room[] = [
	{
		name: 'Front Hall',
		to: ['East Hallway', 'West Hallway', 'Grand Stairs'],
	},
	{
		name: 'East Hallway',
		to: ['Front Hall', 'Room 110', 'Room 111', 'Room 112', 'Room 113', 'Kitchen'],
	},
	{
		name: 'West Hallway',
		to: ['Front Hall', 'Room 120', 'Room 121', 'Room 122', 'Room 123', 'Graveyard'],
	},
	{
		name: 'Room 110',
		to: ['East Hallway'],
		private: true,
	},
	{
		name: 'Room 111',
		to: ['East Hallway'],
		private: true,
	},
	{
		name: 'Room 112',
		to: ['East Hallway'],
		private: true,
	},
	{
		name: 'Room 113',
		to: ['East Hallway'],
		private: true,
	},
	{
		name: 'Room 120',
		to: ['West Hallway'],
		private: true,
	},
	{
		name: 'Room 121',
		to: ['West Hallway'],
		private: true,
	},
	{
		name: 'Room 122',
		to: ['West Hallway'],
		private: true,
	},
	{
		name: 'Room 123',
		to: ['West Hallway'],
		private: true,
	},
	{
		name: 'Grand Stairs',
		to: ['Front Hall', 'Upper Level'],
	},
	{
		name: 'Upper Level',
		to: ['Grand Stairs', 'Master\'s Quarters', 'Servant\'s Passageways', 'Library', 'Observatory'],
	},
	{
		name: 'Master\'s Quarters',
		to: ['Upper Level'],
		key: 'Master\'s Key',
	},
	{
		name: 'Servant\'s Passageways',
		to: ['Upper Level', 'Kitchen'],
		key: 'Servant\'s Key',
	},
	{
		name: 'Library',
		to: ['Upper Level'],
		key: 'Library Key',
	},
	{
		name: 'Observatory',
		to: ['Upper Level'],
	},
	{
		name: 'Kitchen',
		to: ['West Hallway', 'Servant\'s Passageways'],
		private: true,
	},
	{
		name: 'Graveyard',
		to: ['East Hallway'],
		private: true,
	},
]