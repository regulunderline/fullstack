import { useState, useEffect } from "react";
import type { NonSensitiveDiaryEntry } from "./types";
import { getAllDiaries } from './services/diaryService';
import DiaryEntries from "./components/DiaryEntries";
import AddNewEntry from "./components/AddNewEntry";

const errorStyle = {
  color: 'red'
}

const Notification = ({ notification }: { notification: string }) => 
  <div style={errorStyle}>
    {notification}
  </div>

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notification, setNotification] = useState('')

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, [])

  return (
    <div>
      <Notification notification={notification}/>
      <AddNewEntry setDiaries={setDiaries} diaries={diaries} setNotification={setNotification} />
      <DiaryEntries diaries={diaries}/>
    </div>
  )
}

export default App