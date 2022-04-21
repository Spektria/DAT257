import { FC } from 'react';
import { StudentData } from '../../types/types'

const StudentProfile: FC<StudentData> = sData => {
  return <div>
    <h1>{sData.student}</h1>
  </div>
}

export default StudentProfile
