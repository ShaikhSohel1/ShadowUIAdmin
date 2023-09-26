import AllPost from '@/Component/AllPost'
import DropDown from '@/Component/DropDown'
import Navbar from '@/Component/Navbar'
import PostCard from '@/Component/PostCard'
import Sidebar from '@/Component/Sidebar'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Home() {
  return (
    <div>  
  <AllPost />
  </div>
  )
}
