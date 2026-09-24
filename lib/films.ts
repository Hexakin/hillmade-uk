import type { Film } from "@/components/Film";

// Short films of passages from the book. Made in the Novel repo
// (WRO/film, clip 01-homecoming); only the web encodes and posters live here.
// The on-screen words are the author's approved film text, which condenses
// the chapter for the screen (it is not the typeset chapter text).
export const homecoming: Film = {
  label: "Chapter One, on film",
  title: "The homecoming",
  lede: "A one-minute film of the last paragraphs of Chapter One: Adam comes home, and the house is expecting him.",
  making:
    "The paintings were made with an image generator. The camera, the light, the type and the sound are written in code.",
  readHref: "/chapters/chapter-01",
  readLabel: "Read Chapter One",
  base: "/film/homecoming",
  ariaLabel:
    "The homecoming: a one-minute painted film of the end of Chapter One, with the text on screen and ambient sound, no dialogue.",
  lines: [
    "The facade was pristine, as perfect as the day it was printed.",
    "There wasn't a crack, nor a stain.",
    "The Meadows didn't tolerate imperfection.",
    "Adam hesitated at the threshold.",
    "His fingertips were sore. He'd been rubbing the seam of his shorts pocket the entire walk home.",
    "He looked up at the door camera.",
    "He sensed its subtle pivot, tracking him.",
    "He reached for the door handle.",
    "The lock disengaged the moment his fingers touched it.",
    "Seamless.",
    "CILLA was always seamless.",
  ],
};
