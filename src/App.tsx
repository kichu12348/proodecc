import { useEffect } from "react";
import "./App.css";
import HeroSection from "./components/Hero/Hero";

const lexImg = "/chars/lex.png";
const sparkImg = "/chars/spark.png";
const syntaxImg = "/chars/syntax.png";
const monitor = "/monitor.png"; 


function App() {
  useEffect(() => {
    //preload images
    const images = [lexImg, sparkImg, syntaxImg, monitor];
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        // Image preloaded successfully
      };
    });
  }, []);
  return (
    <>
      <HeroSection />
    </>
  );
}

export default App;
