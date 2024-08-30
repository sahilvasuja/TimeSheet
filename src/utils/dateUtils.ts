
export function daysAgo(timestamp: number): string {
    const postDate = new Date(timestamp * 1000); 
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - postDate.getTime(); 
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); 
  
    return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
  }
  