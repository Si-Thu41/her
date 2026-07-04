
const date= new Date();
const anniversaryDate = new Date('2026-06-06T00:00:00');

function calculateDaysTogether(startDate: Date, endDate: Date): { years: number; months: number; days: number } {
    let days= endDate.getDate() - startDate.getDate();
    let months= endDate.getMonth() - startDate.getMonth();
    let years= endDate.getFullYear() - startDate.getFullYear();

    if(days<0){
        months--;
        const lastMonth= new Date(endDate.getFullYear(), endDate.getMonth(), 0);
        days+= lastMonth.getDate();    
    }
    if(months<0){
        years--;
        months+=12;
    }
    return {years, months, days};
}
function Profile() {
    const diff= calculateDaysTogether(anniversaryDate, date);
    console.log(diff);
  return (
    <div>
    <div className="lg:w-60 lg:h-60 md:w-50 md:h-50 w-45 h-45 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto lg:mt-5 mt-30 ">
      <img src="profile2.JPG" alt="Profile"  className=" object-fit scale-133 lg:-translate-y-23 -translate-y-16 md:-translate-y-18" id="profile-img"/>
    
    </div>
      <p className="font-cursive text-center mt-2 text-4xl font-bold text-red-50" style={{ fontFamily: 'Dancing Script' }}>Si Thu & Susan</p>

      <div className="text-center mt-2  font-serif text-white font-semibold mt-15">
        <p className="md:text-3xl lg:text-4xl text-2xl">We've been together for </p>
        <p className="md:text-xl lg:text-2xl text-lg">{diff.years} {diff.years < 1 ? 'year' : 'years'}, {diff.months} {diff.months < 1 ? 'month' : 'months'}, {diff.days} {diff.days < 1 ? 'day' : 'days'}
      </p>
      </div>
    </div>
  );
}

export default Profile;