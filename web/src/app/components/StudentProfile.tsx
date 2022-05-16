import { FC, useState } from 'react'
import { StudentData, StudentEducationalMomentsData } from '../../types/types';
import { useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { getStudentMoments } from '../apis/StudentApi';

/**
 * Creates a button that makes the user go back one step in their browser history history.
 * @author Renato Roos Radevski
*/
function NavigateBack() {
  const navigate = useNavigate();
  return (
      <button onClick={() => navigate(-1)}>Back</button>
  );
}
/**
 * Handles the submitted data and updates the status of finished educational moments.
 * @author Renato Roos Radevski
*/
function submitInfo(){
  console.log("This function will then manage the sent data and update accordingly.");
}


/**
 * iterates a list of strings and booleans to create individual list items in an unorderedlist with a checkbox inside the item box. 
 * @author Renato Roos Radevski
 * @param educationalMoments
 * @param completedMoments
 * 
 */
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

/**
 * Creates a studentProfile view following the data structure of StudentEducationalMomentsData. The view includes:
 * -navigate back button
 * -Student name and email
 * -list of educational moments both completed and uncompleted
 * 
 ta enbart in namn och email sedan kan man fetcha resten här. Map funktion ex.
 * @author Renato Roos Radevski
 * @param data 
 * @returns 
 */
const StudentProfile : FC<StudentEducationalMomentsData> = data =>{
  /*
  const {data:sdata} = useQuery<StudentEducationalMomentsData[]>('moments', () => getStudentMoments(data.email), {staleTime:600000})
  const sdata = 
  */
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
