export function stringToColor(string) {
  let hash = 0;

  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Calculate hue based on hash (value between 0 and 360)
  const hue = hash % 360;
  // Fixed saturation and lightness values for better contrast
  const saturation = 80;
  const lightness = 50;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0].toUpperCase()}`,
  };
}
