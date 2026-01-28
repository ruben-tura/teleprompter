"use client"
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect, useCallback } from "react";
//BASE

interface LyricsComponentProps {
  lyrics: { time: number, text: string }[]
}

const LyricsComponent = ({ lyrics }: LyricsComponentProps) => {
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)
  const currentIndexRef = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])

  const loop = useCallback(() => {
    if (startTimeRef.current === null) return

    console.log("Eseguo loop...")
    const elapsed = performance.now() - startTimeRef.current
    const nextIndex = lyrics.findLastIndex(
      (line, index) =>
        elapsed >= line.time)

    if (nextIndex !== -1 && nextIndex !== currentIndexRef.current) {
      currentIndexRef.current = nextIndex;
      setCurrentIndex(nextIndex)
      console.log("Current index: ", currentIndexRef.current)
    }

    rafRef.current = requestAnimationFrame(loop)
  }, [lyrics]);

  const startTimer = () => {
    if (startTimeRef.current === null) {
      startTimeRef.current = performance.now();
      console.log("HAI PREMUTO IL TASTO PLAY: ", startTimeRef);
      loop();
    }
  }

  const stopTimer = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      startTimeRef.current = null;
    }
  }

  const moveBackwards = () => {
    if (startTimeRef.current) startTimeRef.current += 5000;
  }

  const moveForwards = () => {
    if (startTimeRef.current) startTimeRef.current -= 5000;
  }

  useEffect(() => {
    //console.log("Ecco i dati che usiamo: ", lyrics)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (startTimeRef.current === null) {
          const el = lineRefs.current[0];
          el?.scrollIntoView({ behavior: "smooth", block: "center", });
          startTimer();
        } else {
          stopTimer();
        }
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        moveBackwards();
      } else if (e.code === "ArrowDown") {
        e.preventDefault();
        moveForwards();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
  }, [loop]);

  useEffect(() => {
    const el = lineRefs.current[currentIndex]
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }

  }, [currentIndex])

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <Button onClick={startTimer} className="cursor-pointer">Play</Button>
        <Button onClick={stopTimer} className="cursor-pointer">Stop</Button>
        <Button onClick={moveBackwards} className="cursor-pointer">Back</Button>
        <Button onClick={moveForwards} className="cursor-pointer">Forward</Button>
      </div>
      <div className="flex items-center justify-center overflow-y-hidden">
        <div className="w-screen bg-black text-center h-screen max-h-full overscroll-auto overflow-y-hidden">
          {lyrics.map((line, index) => (
            <div
              key={index}
              ref={(el) => { lineRefs.current[index] = el }}
              className={`py-4 transition-all duration-300 text-5xl ${index === currentIndexRef.current ? "font-bold text-amber-300 scale-110" : "opacity-90 text-white"}"}`}>
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LyricsComponent;
