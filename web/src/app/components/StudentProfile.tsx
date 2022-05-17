import { FC, useState } from 'react'
import { StudentData, StudentEducationalMomentData } from '../../types/types';
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
 * iterates a list of strings and booleans to create individual list items in an unorderedlist with a checkbox inside the item box. 
 * @author Renato Roos Radevski
 * @param educationalMoments
 * @param completedMoments
 * TODO: Det kan vara så att man loopar denna funktionen istället för att det loopas inuti funktionen. På så sätt kan man nog använda sig av enskilda objekten med moment osv.
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
 * 
 ta enbart in namn och email sedan kan man fetcha resten här. Map funktion ex.
 * @author Renato Roos Radevski
 * @param data 
 * @returns 
 */
const StudentProfile : FC<StudentData> = data =>{
  const {data:queryData} = useQuery<StudentEducationalMomentData[]>('moments', () => getStudentMoments(data.email), {staleTime:600000})
  const sdata = queryData!;
  /*
  Calla en funktion här som fixar ihop queryn och email + namn till en och samma som kan användas nedan i return. 
  FC<StudentData> kan passa bra här och det kommer från en query (alternativt om datan redan kanske finns i App från Location så behövs det inte)
  Så det enda som behövs för studentprofile är StudentData props, resten fixas i denna filen.
  Trots att fetchad moment data kommer i en lista med objekt så spelar det ingen roll då alla bör tillhöra samam email och namn så man kan använda sig av 1 objekt för alla.
  */
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
                            <h1 className="title-page">{data.name}</h1>
                            <p className='subtitle-content'>{data.email}</p>
                        </div>
                        <p className="title-content pt-5">Utbildningsmoment:</p>


                        <form onSubmit={submitInfo}>
                        <ol className='subtitle-content pt-3'>{testListMoments()}</ol>
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
