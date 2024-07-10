import React from 'react'
import { useLoaderData } from 'react-router-dom'



const SingleBook = () => {
  const { _id, bookTitle, imageURL, authorName, category, bookDescription, bookPDFURL } = useLoaderData();

  const handleDownload = () => {
    window.location.href = bookPDFURL;
  };
  return (
    
    <div className='px-4 lg:px-35 py-12 bg-teal-100 flex items-center'>
    <div className='mt-28 px-4 lg:px-24'>
      <div className='flex flex-col md:flex-row justify-between items-cemter gap-2' >
        <div className='flex justify-center items-center '>
          <img src={imageURL} alt="" className='h-96' />
        </div>


        <div className='lg:w-2/3 md:w-1/2  space-y-8 h-full   '>
          <h1 className='text-5xl font-bold leading-snug text-black '>{bookTitle} </h1>
          <h4 className='text-2xl font-bold leading-snug text-black'> A {category} by <span className='text-blue-700'> {authorName}</span></h4>
          <br />
          {bookDescription}
          <div>
            <button className='bg-blue-700 font-semibold text-white py-2 px-6 rounded'
              onClick={handleDownload} >Download Now!</button>
          </div>


        </div>


      </div>

    </div>
    </div>
  )
}

export default SingleBook
