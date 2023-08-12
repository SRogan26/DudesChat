//Logic for avatar styling
function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  //Logic for avatar styling
  export default function stringAvatar(name) {
    const words = name.split(' ').length - 1
    const onlyOneWord = words === 0 ? 1 : 0
    const firstLetter = name.split(' ')[0][0]
    const secondLetter = name.split(' ')[words][onlyOneWord]

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${firstLetter.toUpperCase()}${secondLetter.toUpperCase()}`,
    };
  }