import { FC, useState } from 'react'
import { StudentData, StudentEducationalMomentData } from '../../types/types';
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from 'react-query';
import { getStudentMoments } from '../apis/StudentApi';
import { ServerURL } from '../apis/URIs';

/**
 * Creates a button that makes the user go back one step in their browser history history.
 * @author Renato Roos Radevski
*/
function NavigateBack() {
  const navigate = useNavigate();
  return (
      <button className={'sm:mt-0 sm:w-auto sm:text-sm bg-transparent text-base font-medium text-light-primary hover:text-dark-primary'} onClick={() => navigate(-1)}>Tillbaka</button>
  );
}

/**
 * A function that works like testListMoments but with uses testdata so that you can use the demo without needing actual data from the server.
 * @returns 
 */
function testListMoments(){
  const sdata = [{educationalMoment:'Start', completed:true}, {educationalMoment:'Parkera', completed:true},{educationalMoment:'Uppkörning', completed:false}]
  return(
    <div>
      <ol>
      {sdata.map(function(moments, key)
        {
        const [checked, setChecked] = useState(moments.completed);
        return(<li key={key} className="mb-0.5"><input type="checkbox" checked={checked} onChange={ () => setChecked(!checked)} value={moments.educationalMoment} className="mr-0.5"></input>{moments.educationalMoment}</li>)
        })
      }
      </ol>
    </div>
  );
}

/**
 * Iterates through sdata that is have data according to the StudentEducationalMomentData type. It creates an unordered list with HTML checkboxes that have a state based on a boolean from sdata.
 * @author Renato Roos Radevski
 * @param sdata
 */
function listMoments(sdata: StudentEducationalMomentData[]) {
	return(
    <div>
      <ol>
      {sdata.map(function(moments, key)
        {
        const [checked, setChecked] = useState(moments.completed);
        return(<li key={key} className="mb-0.5"><input type="checkbox" checked={checked} onChange={ () => setChecked(!checked)} value={moments.educationalMoment} className="mr-0.5"></input>{moments.educationalMoment}</li>)
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
 * -A submit info button that posts the updated checkboxes' data to the server in order to update the student's profile.
 * @author Renato Roos Radevski
 * @param data 
 * @returns a student profile view with data from @param data
 */
const StudentProfile : FC<StudentData> = data =>{
  const queryClient = useQueryClient();
  const {data:queryData} = useQuery<StudentEducationalMomentData[]>('moments', () => getStudentMoments(data.email), {staleTime:600000})
  const sdata = queryData!;
  const navigate = useNavigate();
  return (
      <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center font-sans h-screen sm:min-h-screen pt-10 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">

              <div
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  aria-hidden="true"
                  onClick={() => navigate(-1)}
              />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="flex flex-col card-modal">
                <div className="relative px-8 pt-2 ">
                    <div className=" sm:mt-0 w-full">
                        <div className="border-b-2 border-light-secondary border-opacity-20 pb-5 pt-5">
                            <h1 className="title-page">{data.name}</h1>
                            <p className='subtitle-content'>{data.email}</p>
                        </div>
                        <p className="title-content pt-5">Utbildningsmoment:</p>

                        <form onSubmit={() => submitInfo(data.email, sdata)}>
                            <ol className='subtitle-content pt-3'>{testListMoments()}</ol>
                            <div className='relative sm:flex-row-reverse flex-col mt-10 mb-10 '>
                            <button type="submit" value="Submit" className="button-solid sm:mt-6 mt-20 sm:mr-3">Spara</button>
                            <button className='button-outline'>{NavigateBack()}</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
          </div>
      </div>
  )

/**
 * Handles the submitted data and updates the status of finished educational moments.
 * Added exceptions when an error might occur.
 * @param email, profile
 * @author Renato Roos Radevski
*/
function submitInfo(email:String, profile:StudentEducationalMomentData[]){
  console.log("This function will then manage the sent data and update accordingly.");
  fetch(`${ServerURL}/students/${email}/updatemoments`,
    {
      method: 'POST'
      , headers:
        { 'Content-Type': "application/json" }
      , body: JSON.stringify({ ...profile})
    })
    .then(response => {
      if (response.status === 200) { 
        console.log('success')}
      else { alert("Something went wrong! Your student profile was not saved.") }
    })
    .catch(error => console.log(error));
    queryClient.invalidateQueries();
  }

}

export default StudentProfile;
