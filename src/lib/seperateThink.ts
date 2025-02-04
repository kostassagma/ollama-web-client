export default function seperateThink(message: string): {
  think: string;
  answer: string;
} {
  const indexOfClosing = message.indexOf("</think>");

  console.log(indexOfClosing);

  return {
    think: message.substring(7, indexOfClosing),
    answer: message.substring(indexOfClosing + 8, message.length),
  };
}
