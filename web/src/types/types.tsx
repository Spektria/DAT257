export type SessionData = 
  { id           : number
  , title        : string
  , location     : string
  , from         : Date
  , to           : Date
  , instructors  : string[]
  , participants : string[]
  }

export type StudentData =
  { name  : string
  , email : string
  }

export type InstructorData = 
  { name    : string
  , email   : string
    // TODO potentially hash for password? Maybe only server side.
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
