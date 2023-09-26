"use client";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import PostCard from "./PostCard";
import DropDown from "./DropDown";
import ReviewPostCard from "./ReviewPostcard";
import { useSession } from "next-auth/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function ReviewPost() {
  const {data: session, status}= useSession();
  const [post, setpost] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  const [DropDownElement, setDropDownElement] = useState("All");
  var filteredData = [];
  const getPosts = () => {
 
    const PostCollectionRef =  query(collection(db, "Review"));
  
    const unsubscribe = onSnapshot(PostCollectionRef, (querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
  
      setpost(newData);
      console.log(newData)
  
    });
    return unsubscribe;
  };
  
  useEffect(() => {
    const unsubscribe = getPosts();
    return () => {
      unsubscribe();
    };
  }, []); 

  useEffect(() => {
    console.log(DropDownElement)
    switch (DropDownElement) {
      case "All":
        filteredData = post.filter(
          (item) => item.Element_Type != "Cards" && item.Element_Type != "Forms"
        );
        break;
      case "Button":
        filteredData = post.filter((item) => item.Element_Type == "Button");
        break;
      case "CheckBoxes":
        filteredData = post.filter((item) => item.Element_Type == "CheckBoxes");
        break;
      case "ToggleSwitch":
        filteredData = post.filter(
          (item) => item.Element_Type == "ToggleSwitch"
        );
        break;
      case "Cards":
        filteredData = post.filter((item) => item.Element_Type == "Cards");
        break;
      case "Loader":
        filteredData = post.filter((item) => item.Element_Type == "Loader");
        break;
      case "Input":
        filteredData = post.filter((item) => item.Element_Type == "Input");
        break;
      case "RadioButtons":
        filteredData = post.filter(
          (item) => item.Element_Type == "RadioButtons"
        );
        break;
      case "Forms":
        filteredData = post.filter((item) => item.Element_Type == "Forms");
        break;
    }
    setFilteredPost(filteredData);
  }, [post, DropDownElement]);





  return (
    session && (session.user.email == "vivekgunjal619@gmail.com" || session.user.email == "sh1052887120@gmail.com" || session.user.email == "uiverse7@gmail.com") ? (
      <div>
      <div className="flex justify-between items-center mx-10">
        <p className="font-bold xl:text-4xl text-2xl underline text-white">
          Review Posts
        </p>
        <DropDown className="mt-7" setDropDownElement={setDropDownElement} DropDownElement={DropDownElement}/>
      </div>
      <div
       className={classNames(DropDownElement == "Forms" ? ' md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2':' md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3','grid grid-cols-1 mt-10 gap-6 m-4')}
      >
        {filteredPost.map((element) => (
          <ReviewPostCard element={element} DropDownElement={DropDownElement}/>

        ))}
      </div>
    </div>
    ):(
      <div className="flex justify-center items-center text-white font-medium">
      You Are Not Allowed To Authorized this Page
    </div>
    )

  );
}
