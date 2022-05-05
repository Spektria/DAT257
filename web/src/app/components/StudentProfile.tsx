import { FC, useState } from 'react'
import { StudentEducationalMomentsData } from '../../types/types';
import { useNavigate } from "react-router-dom";

// Creates a button that makes the user go back one step in their history.
function NavigateBack() {
  const navigate = useNavigate();
  return (
      <button onClick={() => navigate(-1)}>Back</button>
  );
}
//Completed version should submit the finished moments to the database accordingly.
function submitInfo(){}

function submitInfo(){
  console.log("This function will then manage the sent data and update accordingly.");
}


// Converts an array of strings to an HTML list of those strings as well as a check box. 
// Needs to fix checked={} onChange={} functions where if you press Save on 
function listMoments(arr: string[]) {
function listMoments(educationalMoments: string[], completedMoments: boolean[]) {
	return(
    <div>
      <ol>
        {educationalMoments.map(function(moments, key)
        {
          const [checked, setChecked] = useState(completedMoments[key]);
          return(<li key={key} className="mb-0.5"><input type="checkbox" checked={checked} onChange={ () => setChecked(!checked)} value={moments} className="mr-0.5"></input>{moments}</li>)
        })
        }
      </ol>
    </div>
  );
}

const StudentProfile : FC<StudentEducationalMomentsData> = data =>{
  return (
    <div className="flex flex-col">
      <div>{NavigateBack()}</div>
      <div  className="text-center mb-4">
        <h1 className="text-xl font-bold text-4xl my-4">{data.student}</h1>
        <p>{data.email}</p>
      </div>
      <p className="font-bold">Utbildningsmoment:</p>
      <form onSubmit={submitInfo}>
      <ol>{listMoments(data.educationalMoments, data.completed)}</ol>
      <div className="px-24 flex flex-col content-center">
        <button type="submit" value="Submit" className="w-16 h-5 rounded-md text-center bg-cyan-500 hover:bg-cyan-600 ">Save</button>
      </div>
      </form>
    </div>
  )
}


export default StudentProfile;
