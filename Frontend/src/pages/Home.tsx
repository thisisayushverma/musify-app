import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import HomeList from "../components/HomeList";
import { getTopHits,getNewReleases } from "../features/audio.ts";
// import searchIcon from "../assets/search.svg";
// import userIcon from "../assets/user.svg";


function Home() {
  const [topList,setTopList] = useState([]);
  const [newReleases,setNewReleases] = useState([]);
  useEffect(()=>{
    (async ()=>{
      const topListData = await getTopHits();
      if(topListData.data){
        console.log(topListData);
        setTopList(topListData.data);
      }

      const newReleasesData = await getNewReleases();
      if(newReleasesData.data){
        console.log(newReleasesData);
        setNewReleases(newReleasesData.data);
      }
      
    })();
  },[]) 


  const user = useSelector((state: any) => state.user);
  return (
    <div className="text-white p-1 border-2">
      {
        topList.length>0?<HomeList name="Top Hits" list={topList}/>:null
      }
      {
        newReleases.length>0?<HomeList name="New Releases" list={newReleases}/>:null
      }
    </div>
  );
}

export default Home;
