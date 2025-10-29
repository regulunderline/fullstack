import { useState } from "react";
import type { DiaryEntry, NonSensitiveDiaryEntry, Weather, Visibility } from "../types"
import { createDiary } from "../services/diaryService";
import { isAxiosError } from "axios";

const AddNewEntry = ({ diaries, setDiaries, setNotification }: {
  diaries: DiaryEntry[], 
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>,
  setNotification: React.Dispatch<React.SetStateAction<string>>
}) => {
  const [date, setDate] = useState('2025-10-29');
  const [visibility, setVisibility] = useState<Visibility>('great')
  const [weather, setWeather] = useState<Weather>('sunny')
  const [comment, setComment] = useState('')

  const diaryCreation = (event: React.SyntheticEvent) => {
      event.preventDefault()
      createDiary({ date, weather, visibility, comment })
        .then(data => {
          setDiaries(diaries.concat(data))
          setDate('2025-10-29')
          setVisibility('great')
          setWeather('sunny')
          setComment('')
        })
        .catch(error => {
          if (isAxiosError(error)) {
            setNotification(error.message)
            setTimeout(() => setNotification(''), 5000)
          } else {
            console.error(error);
          }
        })
    };
  return(
    <div>
        <h2>Add New Entry</h2>
        <form onSubmit={diaryCreation}>
          <label>
            date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <div>
            <label>
              visibility:
              <label>
                great
                <input 
                  type="radio" 
                  value="great" 
                  name="visibility" 
                  onChange={(event) => setVisibility(event.target.value as Visibility)} 
                  checked={visibility==='great'} 
                />
              </label>
              <label>
                good
                <input 
                  type="radio" 
                  value="good" 
                  name="visibility" 
                  onChange={(event) => setVisibility(event.target.value as Visibility)} 
                  checked={visibility==='good'} 
                />
              </label>
              <label>
                ok
                <input 
                  type="radio" 
                  value="ok" 
                  name="visibility" 
                  onChange={(event) => setVisibility(event.target.value as Visibility)} 
                  checked={visibility==='ok'} 
                />
              </label>
              <label>
                poor 
                <input 
                  type="radio" 
                  value="poor" 
                  name="visibility" 
                  onChange={(event) => setVisibility(event.target.value as Visibility)} 
                  checked={visibility==='poor'} 
                />
              </label>
            </label>
          </div>
          <div>
            <label>
              weather:
              <label>
                sunny
                <input 
                  type="radio" 
                  value="sunny" 
                  name="weather" 
                  onChange={(event) => setWeather(event.target.value as Weather)} 
                  checked={weather==='sunny'} 
                />
              </label>
              <label>rainy
                <input 
                  type="radio" 
                  value="rainy" 
                  name="weather" 
                  onChange={(event) => setWeather(event.target.value as Weather)} 
                  checked={weather==='rainy'} 
                />
              </label>
              <label>cloudy
                <input 
                  type="radio" 
                  value="cloudy" 
                  name="weather" 
                  onChange={(event) => setWeather(event.target.value as Weather)} 
                  checked={weather==='cloudy'} 
                />
              </label>
              <label>stormy
                <input 
                  type="radio" 
                  value="stormy" 
                  name="weather" 
                  onChange={(event) => setWeather(event.target.value as Weather)} 
                  checked={weather==='stormy'} 
                />
              </label>
              <label>windy
                <input 
                  type="radio" 
                  value="windy" 
                  name="weather" 
                  onChange={(event) => setWeather(event.target.value as Weather)} 
                  checked={weather==='windy'} 
                />
              </label>
            </label>
          </div>
          <div>
            <label>
              comment<input value={comment} onChange={(event) => setComment(event.target.value)} />
            </label>
          </div>
          <button type='submit'>add</button>
       </form>
    </div>
  )
}

export default AddNewEntry