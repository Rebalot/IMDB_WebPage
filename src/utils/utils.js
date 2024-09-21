export function convertDate(dateString) {
    //dateString example 2000-08-30
    if(dateString){
        const [year, month, day] = dateString.split('-');
  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    return `${monthNames[Number(month) - 1]} ${Number(day)}, ${year}`;
    }
    return 'N/A';
}