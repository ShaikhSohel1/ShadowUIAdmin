"use client"
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Button from './Button'
import { TrashIcon } from '@heroicons/react/24/solid'
import { db } from '../../firebase/firebase'
import { addDoc, collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PostCard({element, DropDownElement}) {
  console.log(element)
  const [htmlCode, setHtmlCode] = useState(element.HtmlCode);
  const [cssCode, setCssCode] = useState(element.CssCode);
  const [previewCode, setPreviewCode] = useState('');
  const active = DropDownElement == 'Cards';
  const activefroms = DropDownElement == 'Forms';

  useEffect(() => {
    // Combine HTML and CSS for live preview
  setPreviewCode(`
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        ${element.CssCode}
      </style>
      ${element.HtmlCode}`);
  }, [htmlCode, cssCode,element]);

  const onDeletePost = async () => {
    await deleteDoc(
      doc(db, "Posts", element.id)
    );
    const docRef2 = await addDoc(
      collection(db, "Users", element.UserEmail, "Notifications"),
      {
        notiification: `😡 Your Post ${element.PostTitle} has been Deleted by Admin`,
        timestamp: serverTimestamp(),
      }
    );
  }

  return (
    

<div class="w-full overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 h-fit">

    <iframe
    title="Live Preview"
    srcDoc={previewCode}
    width="100%"
    height="100%"
    className={classNames(active ? 'min-h-[25rem] max-h-[50rem]' : activefroms ? 'min-h-[45rem] max-h-[50rem]' : 'min-h-[17rem] max-h-[17rem]', '')}
    // className='min-h-[25rem] max-h-[50rem]'
  ></iframe>


    <div class="py-5 text-center justify-between flex mx-3 items-center cursor-pointer">
      <div className='flex items-center justify-center gap-3 '>
      <img src={element.UserImage}
      className='rounded-full h-8 w-8'
      />
      <p className='text-white font-semibold'>{element.userName}</p>
      </div>
      <div>
<TrashIcon className='text-white h-6 w-6 transform hover:fill-red-500 hover:scale-125 transition duration-150'
onClick={onDeletePost}
/>
      </div>
    </div>
    <div className='flex justify-between items-center mx-6 my-3'>
      <div></div>
      

    </div>
</div>

  )
}
