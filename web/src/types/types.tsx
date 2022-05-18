import { CalendarDate } from 'react-awesome-calendar'

export type SessionData = 
  { id           : number
  , title        : string
  , location     : string
  , from         : Date
  , to           : Date
  , instructors  : Instructor[]
  , participants : Student[]
  };

export type StudentEducationalMomentData = 
  { educationalMoment: string,
    //description      : string,
    completed        : boolean
  };

export type Student =
  { name  : string
  , email : string
  , id    : string
  }

export type Instructor = 
  { name: string 
  , id  : string
  }

export type LocationState = 
  { background : Location 
  , date       : CalendarDate
  }

export type Left<T> = {
  left: T;
  right?: never;
};

export type Right<U> = {
  left?: never;
  right: U;
};

export type Either<T, U> = NonNullable<Left<T> | Right<U>>;
