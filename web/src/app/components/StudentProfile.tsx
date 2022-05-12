import { FC, useState } from 'react'
import { StudentEducationalMomentsData } from '../../types/types';
import { useNavigate } from "react-router-dom";

/**
 * Creates a button that makes the user go back one step in their browser history history.
 * @author Renato Roos Radevski
*/
function NavigateBack() {
  const navigate = useNavigate();
  return (
      <button className={'button-outline mt-10'} onClick={() => navigate(-1)}>Tillbaka</button>
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
          return(<li key={key} className="mb-1"><input type="checkbox" checked={checked} onChange={ () => setChecked(!checked)} value={moments} className="mr-2"></input>{moments}</li>)
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
 * @author Renato Roos Radevski
 * @param data 
 * @returns 
 */
const StudentProfile : FC<StudentEducationalMomentsData> = data =>{
  return (
      <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center font-sans h-screen sm:min-h-screen pt-10 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">

            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="flex flex-col card-modal">
                <button className='mt-4 mx-2'>{NavigateBack()}</button>
                <div className="relative px-8 pt-2 ">
                    <div className=" sm:mt-0 text-left w-full">
                        <div className="border-b-2 border-light-secondary border-opacity-20 pb-5 pt-5">
                            <h1 className="title-page">{data.student}</h1>
                            <p className='subtitle-content'>{data.email}</p>
                        </div>
                        <p className="title-content pt-5">Utbildningsmoment:</p>


                        <form onSubmit={submitInfo}>
                        <ol className='subtitle-content pt-3'>{listMoments(data.educationalMoments, data.completed)}</ol>
                        <button type="submit" value="Submit" className="button-solid sm:mt-6 mt-20 mb-10">Spara</button>
                        </form>
                    </div>
                </div>

            </div>
          </div>
      </div>
  )
}


export default StudentProfile;
