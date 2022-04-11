import { SessionData } from '../types/types'

const sessions: SessionData[] = [
  {
    "id": 1,
    "title": "Title",
    "location": "Vid vattnet",
    "from": new Date("2022-04-04T17:00:00+00:00"),
    "to": new Date("2022-04-04T18:00:00+00:00"),
    "instructors": ["Bengt Bengtsson", "Erik Eriksson"],
    "participants": ["Alice Albertsson", "Carl Carlsson", "Daniel Danielsson"]
  },
  {
    "id": 2,
    "title": "Title 2",
    "location": "Vid vattnet",
    "from": new Date("2022-04-05T17:00:00+00:00"),
    "to": new Date("2022-04-05T18:00:00+00:00"),
    "instructors": ["Bengt Bengtsson", "Erik Eriksson"],
    "participants": ["Alice Albertsson", "Carl Carlsson", "Daniel Danielsson"]
  }
]

export default sessions


