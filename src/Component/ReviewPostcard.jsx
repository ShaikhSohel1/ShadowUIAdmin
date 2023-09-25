"use client"
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Button from './Button'
import { TrashIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, deleteDoc, doc, getDoc, increment, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ReviewPostCard({element, DropDownElement}) {
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
      <head>
      ${element.Tailwind ? '<script src="https://cdn.tailwindcss.com"></script>': ''}
      </head>
      ${element.HtmlCode}`);
  }, [htmlCode, cssCode,element]);

const AcceptPost = async () => {
    const docRef = await addDoc(collection(db, "Posts"),{
        UserEmail: element.UserEmail,
        UserImage:element.UserImage,
        userName: element.userName,
        HtmlCode: element.HtmlCode,
        CssCode: element.CssCode,
        Element_Type: element.Element_Type,
        PostTitle: element.PostTitle,
        Tailwind: element.Tailwind,
        timestamp: serverTimestamp()
      }).then(data => console.log("success..."));
      await deleteDoc(
        doc(db, "Review", element.id)
      );

      const userDocumentRef = doc(db, "Users", element.UserEmail);
      const userDocumentSnapshot = await getDoc(userDocumentRef);
      if (userDocumentSnapshot.exists()) {

        const docRef1 = await updateDoc(doc(db, "Users", element.UserEmail), {
            NoOfPosts: increment(1),
            timestamp: serverTimestamp(),
          });

        const docRef2 = await addDoc(
            collection(db, "Users", element.UserEmail, "Notifications"),
            {
              notiification: `🥳 Your Post ${element.PostTitle} has been Accepted by Admin`,
              timestamp: serverTimestamp(),
            }
          );
    
      }else{

        const docRef2 = await setDoc(doc(db, "Users", element.UserEmail),{
            UserEmail: element.UserEmail,
            UserImage:element.UserImage,
            UserName: element.userName,
            NoOfPosts: 1,
            timestamp: serverTimestamp()
          }).then(data => console.log("success..."));
          console.log("Document does not exist.");

        const docRef1 = await addDoc(
            collection(db, "Users", element.UserEmail, "Notifications"),
            {
              notiification: `🥳 Your Post ${element.PostTitle} has been Accepted by Admin`,
              timestamp: serverTimestamp(),
            }
          );
    
      }

}

const onDeletePost = async () => {
  await deleteDoc(
    doc(db, "Review", element.id)
  );
  const docRef2 = await addDoc(
    collection(db, "Users", element.UserEmail, "Notifications"),
    {
      notiification: `😡 Your Post ${element.PostTitle} has been Rejected by Admin`,
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
      <div
      ></div>
      
      <Button 
       AcceptPost={AcceptPost}
      />
    </div>
</div>

  )
}
