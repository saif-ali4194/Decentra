export function calculateAge(inputDate) {
    const currentDate = new Date();
    const birthDate = new Date(inputDate);
  
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const birthMonth = birthDate.getMonth();
  
    if (birthMonth > currentMonth) {
      age--;
    } else if (birthMonth === currentMonth) {
      const currentDay = currentDate.getDate();
      const birthDay = birthDate.getDate();
      if (birthDay > currentDay) {
        age--;
      }
    }
  
    return age;
  }
  