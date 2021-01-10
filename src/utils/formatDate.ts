const formatDate = (date: string): string => {
  const dateFormatted = new Date(date);

  const day = dateFormatted.getDate();
  const month = dateFormatted.getMonth() + 1;
  const year = dateFormatted.getFullYear();

  const dayFormatted = day > 9 ? day : `0${day}`;
  const monthFormatted = month > 9 ? month : `0${month}`;

  return `${dayFormatted}/${monthFormatted}/${year}`;
};

export default formatDate;
