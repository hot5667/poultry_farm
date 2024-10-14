import MyCalendar from "../components/calendar/page"



const DetailPage = () => {
  const date = new Date();
  const initialYear = date.getFullYear();
  const initialMonth = date.getMonth();
  return (
    
    <>
    <MyCalendar />
    </>
  )
}

export default DetailPage