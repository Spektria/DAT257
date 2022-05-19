import { FC, useEffect, useState } from 'react'
import { Student, StudentEducationalMomentData } from '../../types/types';
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from 'react-query';
import { getStudentMoments } from '../apis/StudentApi';
import { ServerURL } from '../apis/URIs';
import { map } from 'ramda'
import { useLocation } from 'react-router';



/**
 * Creates a studentProfile view following the data structure of StudentEducationalMomentsData. The view includes:
 * -navigate back button
 * -Student name and email
 * -list of educational moments both completed and uncompleted with functionality to check and uncheck the boxes and use the submit info button.
 * -A submit info button that posts the updated checkboxes' data to the server in order to update the student's profile.
 * @author Renato Roos Radevski
 * @param data 
 * @returns a student profile view with data from @param data
 */
const StudentProfile: FC<Student> = data => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { isLoading, data: queryData } = useQuery<StudentEducationalMomentData[]>('moments', () => getStudentMoments(data.id), { staleTime: 600000 })
  const [moments, setMoments] = useState<StudentEducationalMomentData[]>(queryData ? queryData : [])

  useEffect(() => {
    if (queryData)
      setMoments(queryData)
  },
    [queryData]
  )

  if (isLoading) return <p className='text-center p-10'>Loading...</p>
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
              <ol className='subtitle-content pt-3'>{map(ListMoment, moments)}</ol>
              <form onSubmit={() => submitInfo(data.id, moments)}>

                <div className='relative sm:flex-row-reverse flex-col mt-10 mb-10 '>
                  <button type="submit" className="button-solid sm:mt-6 mt-20 sm:mr-3">Spara</button>
                  <button type="button" className={'button-outline sm:mt-0 sm:w-auto sm:text-sm bg-transparent text-base font-medium text-light-primary hover:text-dark-primary'} onClick={() => navigate(location.pathname.replace(data.id,''))}>Tillbaka</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  /**
   * Handles the submitted data and updates the status of educational moments.
   * Added exceptions when an error might occur.
   * @param id, profile
   * @author Renato Roos Radevski
  */
  function submitInfo(id: String, profile: StudentEducationalMomentData[]) {
    fetch(`${ServerURL}/students/${id}/updatemoments`,
      {
        method: 'POST'
        , headers:
          { 'Content-Type': "application/json" }
        , body: JSON.stringify(profile)
      })
      .then(response => {
        if (response.status === 200) {
          console.log('success')
        }
        else { alert("Something went wrong! Your student profile was not saved.") }
      })
      .catch(error => console.log(error));
    queryClient.invalidateQueries();
  }

  /**
   * Creates a list item that includes the educational moment. 
   * The checkbox is checked depending on the status on the moment fetched from the server.
   * 
   * @param m 
   * @returns list item with checked status depending on moment completion.
   */
  function ListMoment(m: StudentEducationalMomentData) {
    return (
      <li
        key={m.name}
        className="mb-0.5 text-inherit"
      >
        <input
          type="checkbox"
          checked={m.complete}
          onChange={() => setMoments(toggleMoment(moments, m))}
          className="mr-0.5"
        />
        {m.name}
      </li>
    )

  }
}

/**
 * Updates the list of educational moments whenever a checkbox have been checked or unchecked.
 * @param prevMoments 
 * @param moment 
 * @returns New list of educational moments with up-to-date completion status.
 */
function toggleMoment(prevMoments: StudentEducationalMomentData[], moment: StudentEducationalMomentData): StudentEducationalMomentData[] {
  return map(
    m => m === moment
      ? { ...m, complete: !m.complete }
      : m, prevMoments)
}


export default StudentProfile;
