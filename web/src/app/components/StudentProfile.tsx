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
  /*
  Calla en funktion här som fixar ihop queryn och email + namn till en och samma som kan användas nedan i return. 
  FC<StudentData> kan passa bra här och det kommer från en query (alternativt om datan redan kanske finns i App från Location så behövs det inte)
  Så det enda som behövs för studentprofile är StudentData props, resten fixas i denna filen.
  Trots att fetchad moment data kommer i en lista med objekt så spelar det ingen roll då alla bör tillhöra samam email och namn så man kan använda sig av 1 objekt för alla.
  */
  return (
    <div className="flex flex-col">
      <div>{NavigateBack()}</div>
      <div  className="text-center mb-4">
        <h1 className="text-xl font-bold text-4xl my-4">{data.name}</h1>
        <p>{data.email}</p>
      </div>
      <p className="font-bold">Utbildningsmoment:</p>
      <form onSubmit={submitInfo}>
      {queryData && <ol>{listMoments(queryData)}</ol>}
      <div className="px-24 flex flex-col content-center">
        <button type="submit" value="Submit" className="w-16 h-5 rounded-md text-center bg-cyan-500 hover:bg-cyan-600 ">Save</button>
      </div>
      </form>
    </div>
  )
}


export default StudentProfile;
