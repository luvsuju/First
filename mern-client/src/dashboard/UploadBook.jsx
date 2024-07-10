import React, { useState } from 'react'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Textarea } from 'flowbite-react';

const UploadBook = () => {
    const bookCategories=[
        'Fiction', 'History','Mystery&Thriller', 'Sci-Fi',
         'Biography', 'Non-Fiction', 'Programming', 'Fantasy',
         'Horror', 'Self-Help', 'Memoir', 'Buisness', 'Children Books',
         'Travel', 'Religion', 'Art and Design'
    ]
    const [selectedBookCategory, setselectedBookCategory]= useState(bookCategories[0])
    const handleChangeSelectedValue= (event) =>{
     console.log(event.target.value);
     setselectedBookCategory(event.target.value) ;  
    }

    //const handle submit
    const handleBookSubmit =(event) =>{
        event.preventDefault();
        const form=event.target;
        const bookTitle=form.bookTitle.value; 
        const authorName=form.authorName.value; 
        const imageURL=form.imageURL.value;
        const category=form.categoryName.value;
        const bookDescription=form.bookDescription.value;
        const bookPDFURL=form.bookPDFURL.value;

        const bookObj={
          bookTitle,
          authorName,
          imageURL,
          category,
          bookDescription,
          bookPDFURL
        }
        console.log(bookObj)

        //send data to db
        fetch("http://localhost:3000/upload-book", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(bookObj),
        })
          .then(res => res.json())
          .then(data => {
            alert("Book uploaded successfully");
          })
          .catch(error => {
            console.error("Error uploading book:", error);
          });
        


    }
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>


<form onSubmit={handleBookSubmit} className="flex lg:w-[1000px] flex-col flex-wrap gap-4">
        {/* first row */}
      <div className='flex gap-8'>

      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="bookTitle" name="bookTitle" value="Book Title" />
        </div>
        <TextInput id="bookTitle" type="text" placeholder="Book Name" required />
      </div>
 
      {/*author */}
      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="authorName" name="authorName" value="Author Name" />
        </div>
        <TextInput id="authorName" type="text" placeholder="Author Name" required />
      </div>



      </div>

      {/* second row */}

      
      <div className='flex gap-8'>

      <div className='lg:w-1/2'>
        <div className="mb-2 block">
          <Label htmlFor="imageURL" name="imageURL" value="Book Image URL" />
        </div>
        <TextInput id="imageURL" type="text" placeholder="Book Image URL" required />
      </div>
     
 
      {/*Category */}
      <div className='lg:w-1/2'>
      <div className="mb-2 block">
          <Label htmlFor="categoryName" value="Book Category" />
        </div>
        <select
    name="categoryName"
    id="categoryName"
    className='w-full rounded'
    value={selectedBookCategory}
    onChange={handleChangeSelectedValue}
>
    {bookCategories.map((option) => <option key={option} value={option}>{option}</option>)}
</select>

    
      </div>



      </div>

      {/* BookDescription */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="bookDescription" name="bookDescription" value="Description" />
        </div>
        <Textarea  id="bookDescription" placeholder="Description" required rows={4} className='w-full'/>
        
      </div>

      {/* book pdf link */}

      <div >
        <div className="mb-2 block">
          <Label htmlFor="bookPDFURL" name="bookPDFURL" value="Book PDF URL" />
        </div>
        <TextInput id="bookPDFURL" name="bookPDFURL" type="text" placeholder="Book PDF URL" required />
      </div>
      
      <Button type="submit">Upload Book</Button>
    </form>
    </div>
  )
}

export default UploadBook
