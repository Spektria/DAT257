export type SessionData = 
  { id           : number
  , title        : string
  , location     : string
  , from         : Date
  , to           : Date
  , instructors  : string[]
  , participants : string[]
  };

export type StudentEducationalMomentsData = 
  { student      : string,
    email        : string,
    educationalMoments: string[],
    completed    : boolean[]
  };


export type Left<T> = {
  left: T;
  right?: never;
};

export type Right<U> = {
  left?: never;
  right: U;
};

export type Either<T, U> = NonNullable<Left<T> | Right<U>>;
