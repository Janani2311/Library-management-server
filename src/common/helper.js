export const randString = (n)=>{
    let charSet = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuioplkjhgfdsazxcvbnm'
  	let string = ''
  	for(let i=0;i<n;i++)
    {
      	string += charSet[(Math.floor(Math.random()*100) % 62)]
    }
  	return string
}

export const createRandomString = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < charactersLength) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
