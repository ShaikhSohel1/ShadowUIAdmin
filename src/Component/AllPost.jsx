"use client";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import PostCard from "./PostCard";
import DropDown from "./DropDown";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function AllPost() {
  const [post, setpost] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  const [DropDownElement, setDropDownElement] = useState("All");
  var filteredData = [];
  const getPosts = async () => {
    const docRef = await getDocs(collection(db, "Posts")).then(
      (querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setpost(newData);
        console.log(newData);
      }
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  // filter data according to side bar selection
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
    <div>
      <div className="flex justify-between items-center mx-10">
        <p className="font-bold xl:text-4xl text-2xl underline text-white">
          All Posts
        </p>
        <DropDown className="mt-7" setDropDownElement={setDropDownElement} DropDownElement={DropDownElement}/>
      </div>
      <div
       className={classNames(DropDownElement == "Forms" ? ' md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2':' md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3','grid grid-cols-1 mt-10 gap-6 m-4')}
      >
        {filteredPost.map((element) => (
          <PostCard element={element} DropDownElement={DropDownElement} />
        ))}
      </div>
    </div>
  );
}
