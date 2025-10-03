// utils/getBackground.js
import sunny from "../assets/sunny.mp4";
import rainy from "../assets/rainy.mp4";
import cloudy from "../assets/cloudy.mp4";
import snow from "../assets/snow.mp4";

export default function getBackground(condition) {
  if (condition.includes("rain")) return rainy;
  if (condition.includes("cloud")) return cloudy;
  if (condition.includes("snow")) return snow;
  return sunny;
}
