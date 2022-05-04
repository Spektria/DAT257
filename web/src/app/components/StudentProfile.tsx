import { zipWith } from 'ramda';
import { FC } from 'react'
import { StudentEducationalMomentsData } from '../../types/types';
import studentProfileData from '../sData';

}


// Converts an array of strings to an HTML list of those strings as well as a check box. 
// Needs to fix checked={} onChange={} functions where if you press Save on 
function listMoments(arr: string[]) {
	return(
    <div>
      <ol>
        {createMoments(arr)}
      </ol>
    </div>
  );
}

function createMoments(arr: string[]) {
  return(
    <>{zipWith((x, k) => <li key={k} className="mb-0.5"><input type="checkbox" value={x} className="mr-0.5"></input>{x}</li>, arr, Array.from(Array(arr.length).keys())) }</>
  );
}

const StudentProfile : FC<StudentEducationalMomentsData> = data =>{
  return (
    <div className="flex flex-col">
      <div  className="text-center mb-4">
        <h1 className="text-xl font-bold text-4xl my-4">{data.student}</h1>
        <p>{data.email}</p>
      </div>
      <ol>{listMoments(data.educationalMoments)}</ol>
      <div className="px-24 flex flex-col content-center">
        <button type="submit" onSubmit={submitInfo} className="rounded-md text-center bg-cyan-500 hover:bg-cyan-600 ">Save</button>
      </div>
    </div>
  )
}


export default StudentProfile;
